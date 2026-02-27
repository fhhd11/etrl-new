"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Check, Loader2, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { createPaymentSession } from "./actions";

export default function BillingPageContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");
  const email = searchParams.get("email");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!userId || !email) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await createPaymentSession(userId, email);
      
      if (result.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      if (result.confirmationUrl) {
        window.location.href = result.confirmationUrl;
      } else {
        setError("Не удалось получить ссылку на оплату");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Произошла ошибка при создании платежа. Пожалуйста, попробуйте позже.");
      setIsLoading(false);
    }
  };

  if (!userId || !email) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-zinc-950 p-4 text-center selection:bg-emerald-500/30 text-zinc-50 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[100px] opacity-50 pointer-events-none" />

        <Card className="w-full max-w-md bg-zinc-900/50 border-white/10 backdrop-blur-xl shadow-2xl relative z-10">
          <CardHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
              <span className="text-red-500 font-bold text-xl">!</span>
            </div>
            <CardTitle className="text-2xl text-zinc-100">Ошибка доступа</CardTitle>
            <CardDescription className="text-zinc-400">
              Отсутствуют необходимые параметры для оплаты
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-300">
              Пожалуйста, перейдите на эту страницу из интерфейса чата, чтобы мы могли идентифицировать ваш аккаунт.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pb-8">
            <Link href="https://app.etrl.chat" className="w-full">
              <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-white/5">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Вернуться в чат
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-zinc-950 p-4 md:p-8 text-zinc-50 selection:bg-emerald-500/30 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-center z-20">
        <Link className="flex items-center justify-center gap-2 group" href="/">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
            <img src="/logo.svg" alt="ETRL Logo" className="h-5 w-5" />
          </div>
          <span className="font-semibold text-xl tracking-tight text-zinc-100">ETRL Chat</span>
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-md mt-16">
        <div className="mb-8 text-center space-y-4 flex flex-col items-center">
          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 py-1.5 px-4 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Оформление подписки
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-zinc-100">
            Переход на PRO
          </h1>
          <p className="mt-2 text-zinc-400">
            Для аккаунта <span className="font-medium text-emerald-400">{email}</span>
          </p>
        </div>

        <Card className="w-full bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 border-emerald-500/30 shadow-[0_0_40px_-15px_rgba(16,185,129,0.3)] backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500 text-xs font-bold text-white rounded-bl-lg shadow-sm">
            PRO ТАРИФ
          </div>
          
          <CardHeader className="text-center pb-6 pt-8 border-b border-white/5">
            <CardTitle className="text-2xl text-zinc-100">Безлимит на 30 дней</CardTitle>
            <CardDescription className="pt-2 text-zinc-400">
              Максимум возможностей для вашей продуктивности
            </CardDescription>
            <div className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-extrabold tracking-tight text-white">490</span>
              <span className="text-xl font-medium text-zinc-400">₽ / мес</span>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <ul className="space-y-4 text-sm">
              {[
                { text: "Безлимитные запросы к ИИ", bold: true },
                { text: "Доступ ко всем передовым моделям", bold: false },
                { text: "Высокий приоритет обработки", bold: false },
                { text: "Генерация изображений", bold: false },
                { text: "Анализ документов и файлов", bold: false },
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-x-3 text-zinc-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-emerald-400" />
                  </div>
                  <span className={feature.bold ? "font-medium text-zinc-100" : ""}>{feature.text}</span>
                </li>
              ))}
            </ul>

            {error && (
              <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center backdrop-blur-sm">
                {error}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="pb-8 pt-2">
            <Button
              className="w-full h-14 text-lg font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] transition-all"
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Создание платежа...
                </>
              ) : (
                "Перейти к оплате"
              )}
            </Button>
          </CardFooter>
        </Card>

        <p className="mt-6 text-xs text-zinc-500 max-w-md text-center mx-auto">
          Нажимая «Перейти к оплате», вы соглашаетесь с условиями использования сервиса. Платеж обрабатывается безопасно через YooKassa.
        </p>
      </div>
    </div>
  );
}
