import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(filePath) {
  const content = readFileSync(filePath, "utf8");

  for (const line of content.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(resolve(process.cwd(), ".env.local"));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing Supabase credentials in .env.local");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function ensurePartner() {
  const partner = {
    secretKey: "partner_test_secret_123",
    referrerCode: "TESTPARTNER",
    commissionRate: 0.15,
  };

  const { error } = await supabase.from("Partner").upsert(partner, {
    onConflict: "referrerCode",
  });

  if (error) {
    throw new Error(`Failed to upsert partner: ${error.message}`);
  }
}

async function seedAnalyticsData() {
  const referrals = [
    {
      id: "8bc4dd8c-83d0-4b87-9050-bbcd7f602c11",
      userId: "test-user-1",
      referrerCode: "TESTPARTNER",
      createdAt: "2026-03-01T10:00:00.000Z",
    },
    {
      id: "43215678-ecf5-4748-9e5d-f45c5df8d822",
      userId: "test-user-2",
      referrerCode: "TESTPARTNER",
      createdAt: "2026-03-02T10:00:00.000Z",
    },
    {
      id: "6dbf1a77-eef2-4e01-b3dc-5bf21c8fb733",
      userId: "test-user-3",
      referrerCode: "TESTPARTNER",
      createdAt: "2026-03-03T10:00:00.000Z",
    },
  ];

  const transactions = [
    {
      id: "ec9f0fdc-c6c4-46c6-8514-195019b41441",
      userId: "test-user-1",
      yookassaPaymentId: "payment-1",
      amount: 1500,
      status: "succeeded",
      createdAt: "2026-03-02T12:00:00.000Z",
    },
    {
      id: "1206a090-399d-4a41-8ded-c9f0f75a1452",
      userId: "test-user-2",
      yookassaPaymentId: "payment-2",
      amount: 3200,
      status: "succeeded",
      createdAt: "2026-03-03T12:00:00.000Z",
    },
    {
      id: "b15fdfb3-bd1d-44ec-b76d-f1bdb7b21663",
      userId: "test-user-3",
      yookassaPaymentId: "payment-3",
      amount: 900,
      status: "pending",
      createdAt: "2026-03-04T12:00:00.000Z",
    },
  ];

  const referralResult = await supabase.from("Referral").upsert(referrals, {
    onConflict: "id",
  });

  if (referralResult.error) {
    throw new Error(`Failed to seed referrals: ${referralResult.error.message}`);
  }

  const transactionResult = await supabase.from("Transaction").upsert(transactions, {
    onConflict: "id",
  });

  if (transactionResult.error) {
    throw new Error(`Failed to seed transactions: ${transactionResult.error.message}`);
  }
}

try {
  await ensurePartner();
  await seedAnalyticsData();

  console.log(JSON.stringify({
    ok: true,
    partner: {
      secretKey: "partner_test_secret_123",
      referrerCode: "TESTPARTNER",
      commissionRate: 0.15,
    },
  }, null, 2));
} catch (error) {
  console.error(error);
  process.exit(1);
}
