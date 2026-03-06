import { ReceiptText, UserRoundPlus, Wallet } from "lucide-react";
import Image from "next/image";

import { LineChartCard } from "@/components/dashboard/line-chart-card";
import { LogoutButton } from "@/components/dashboard/logout-button";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Card, CardContent } from "@/components/ui/card";
import { getSessionFromCookies } from "@/lib/auth/session";
import { getDashboardData } from "@/lib/dashboard/queries";

const currencyFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 2,
});

function formatPercent(value: number) {
  return `${(value * 100).toFixed(0)}%`;
}

export default async function DashboardPage() {
  const session = await getSessionFromCookies();

  if (!session) {
    return null;
  }

  const dashboardData = await getDashboardData(session.referrerCode, 0.15);

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-500/16 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-24 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[120px]" />
      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <Card className="border-white/10 bg-zinc-900/50 text-white shadow-[0_25px_120px_-50px_rgba(16,185,129,0.35)]">
          <CardContent className="flex flex-col gap-6 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="ETRL" width={36} height={36} className="h-9 w-9 rounded-lg" priority />
                <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-emerald-300">
                  ETRL Partner Dashboard
                </span>
              </div>
              <div className="space-y-2">
                <h1 className="bg-gradient-to-br from-white via-zinc-100 to-zinc-500 bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl lg:text-4xl">
                  Здравствуйте, партнер {session.referrerCode}
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                  Здесь отображаются только ваши рефералы, успешные оплаты и рассчитанный заработок по ставке {formatPercent(session.commissionRate)}.
                </p>
              </div>
            </div>

            <LogoutButton />
          </CardContent>
        </Card>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Всего рефералов"
            value={dashboardData.metrics.totalReferrals.toString()}
            hint="Количество уникальных пользователей по вашему коду"
          />
          <MetricCard
            title="Успешных оплат"
            value={dashboardData.metrics.successfulPayments.toString()}
            hint="Транзакции со статусом succeeded"
          />
          <MetricCard
            title="Общий оборот"
            value={currencyFormatter.format(dashboardData.metrics.totalRevenue)}
            hint="Сумма всех успешных транзакций"
          />
          <MetricCard
            title="Ваш заработок"
            value={currencyFormatter.format(dashboardData.metrics.totalCommission)}
            hint={`Расчет по ставке ${formatPercent(session.commissionRate)}`}
          />
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <LineChartCard
            title="Динамика регистраций"
            description="Количество новых рефералов по дням"
            color="#0ea5e9"
            data={dashboardData.referralsChart}
          />
          <LineChartCard
            title="Динамика заработка"
            description="Комиссия с успешных транзакций по дням"
            color="#22c55e"
            data={dashboardData.earningsChart}
            formatMode="currency"
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          <Card className="lg:col-span-2 border-white/8 bg-zinc-900/50">
            <CardContent className="flex h-full items-start gap-4 px-6 py-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                <UserRoundPlus className="size-5" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-zinc-100">Регистрации под контролем</h2>
                <p className="text-sm leading-6 text-zinc-400">
                  График показывает ежедневную динамику новых регистраций по вашему `referrerCode`.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/8 bg-zinc-900/50">
            <CardContent className="flex h-full items-start gap-4 px-6 py-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
                <ReceiptText className="size-5" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-zinc-100">Только успешные оплаты</h2>
                <p className="text-sm leading-6 text-zinc-400">
                  В расчет включаются только записи `Transaction` со статусом `succeeded`.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/8 bg-zinc-900/50">
            <CardContent className="flex h-full items-start gap-4 px-6 py-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-zinc-200 ring-1 ring-white/10">
                <Wallet className="size-5" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-zinc-100">Прозрачный расчет</h2>
                <p className="text-sm leading-6 text-zinc-400">
                  Комиссия считается на сервере как сумма `amount * commissionRate`.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </section>
    </main>
  );
}
