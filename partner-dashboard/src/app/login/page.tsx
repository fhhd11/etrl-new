import { LoginForm } from "@/components/login/login-form";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/18 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section className="space-y-6 text-white">
            <span className="inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 backdrop-blur-sm">
              ETRL Partner Dashboard
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl bg-gradient-to-br from-white via-zinc-100 to-zinc-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                Аналитика партнёров ETRL с рефералами, оплатами и доходом в одной панели.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                Безопасный вход по секретному ключу, ежедневная аналитика по вашему `referrerCode` и тёмный интерфейс в стиле основного продукта ETRL.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {[
                "Регистрации",
                "Успешные оплаты",
                "Заработок",
                "Динамика по дням",
              ].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-300 backdrop-blur-sm">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
