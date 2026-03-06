import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ChartPoint, DashboardData, DashboardMetrics } from "@/lib/types";

function formatDate(input: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(input));
}

function normalizeAmount(value: number | string | null) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function buildDailyCountMap(items: { createdAt: string }[]) {
  const counts = new Map<string, number>();

  for (const item of items) {
    const key = item.createdAt.slice(0, 10);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return counts;
}

function buildDailyCommissionMap(
  items: { createdAt: string; amount: number | string | null }[],
  commissionRate: number,
) {
  const values = new Map<string, number>();

  for (const item of items) {
    const key = item.createdAt.slice(0, 10);
    const amount = normalizeAmount(item.amount) * commissionRate;
    values.set(key, (values.get(key) ?? 0) + amount);
  }

  return values;
}

function mapToChartPoints(values: Map<string, number>): ChartPoint[] {
  return [...values.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([date, value]) => ({
      date: formatDate(date),
      value: Number(value.toFixed(2)),
    }));
}

type ReferralRow = {
  userId: string;
  createdAt: string;
};

type TransactionRow = {
  amount: number | string | null;
  createdAt: string;
  status: string;
  userId: string;
};

export async function getDashboardData(referrerCode: string, commissionRate: number): Promise<DashboardData> {
  const supabase = createSupabaseServerClient();

  const { data: referralRows, error: referralsError } = await supabase
    .from("Referral")
    .select("userId, createdAt")
    .eq("referrerCode", referrerCode)
    .order("createdAt", { ascending: true });

  if (referralsError) {
    throw new Error(`Failed to load referrals: ${referralsError.message}`);
  }

  const referrals = (referralRows ?? []) as ReferralRow[];
  const uniqueUserIds = [...new Set(referrals.map((item) => item.userId))];

  if (uniqueUserIds.length === 0) {
    const emptyMetrics: DashboardMetrics = {
      totalReferrals: 0,
      successfulPayments: 0,
      totalRevenue: 0,
      totalCommission: 0,
    };

    return {
      metrics: emptyMetrics,
      referralsChart: [],
      earningsChart: [],
    };
  }

  const { data: transactionRows, error: transactionsError } = await supabase
    .from("Transaction")
    .select("userId, amount, status, createdAt")
    .in("userId", uniqueUserIds)
    .eq("status", "succeeded")
    .order("createdAt", { ascending: true });

  if (transactionsError) {
    throw new Error(`Failed to load transactions: ${transactionsError.message}`);
  }

  const successfulTransactions = (transactionRows ?? []) as TransactionRow[];
  const totalRevenue = successfulTransactions.reduce((sum, transaction) => {
    return sum + normalizeAmount(transaction.amount);
  }, 0);

  const metrics: DashboardMetrics = {
    totalReferrals: uniqueUserIds.length,
    successfulPayments: successfulTransactions.length,
    totalRevenue: Number(totalRevenue.toFixed(2)),
    totalCommission: Number((totalRevenue * commissionRate).toFixed(2)),
  };

  return {
    metrics,
    referralsChart: mapToChartPoints(buildDailyCountMap(referrals)),
    earningsChart: mapToChartPoints(
      buildDailyCommissionMap(successfulTransactions, commissionRate),
    ),
  };
}
