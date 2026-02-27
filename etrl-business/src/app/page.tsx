import Link from "next/link";
import { ArrowRight, Bot, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Bot className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold text-xl tracking-tight">ETRL Chat</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Преимущества
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="https://app.etrl.chat">
            Войти
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Ваш персональный ИИ-ассистент
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Безлимитный доступ к передовым нейросетям в едином удобном интерфейсе. Повысьте свою продуктивность с ETRL Chat.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="https://app.etrl.chat">
                  <Button size="lg" className="h-11 px-8">
                    Перейти в чат
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Почему выбирают нас</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Мы предоставляем лучший опыт взаимодействия с искусственным интеллектом
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 text-center items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Быстро и без лимитов</h3>
                <p className="text-muted-foreground">
                  Мгновенные ответы и отсутствие жестких ограничений в PRO версии.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Единый интерфейс</h3>
                <p className="text-muted-foreground">
                  Все лучшие модели в одном окне. Нет нужды прыгать между разными сервисами.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4 text-center items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Безопасность</h3>
                <p className="text-muted-foreground">
                  Ваши данные защищены. Мы не используем ваши переписки для обучения моделей.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          {new Date().getFullYear()} ETRL Chat. Все права защищены.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Условия использования
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Политика конфиденциальности
          </Link>
        </nav>
      </footer>
    </div>
  );
}
