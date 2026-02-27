"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function BillingSuccessPage() {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Redirect to chat app after 3 seconds
    const redirectTimer = setTimeout(() => {
      window.location.href = "https://app.etrl.chat";
    }, 3000);

    // Update countdown
    const intervalTimer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-zinc-950 p-4 text-zinc-50 selection:bg-emerald-500/30 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-center z-20">
        <Link className="flex items-center justify-center gap-2 group" href="/">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
            <img src="/logo.svg" alt="ETRL Logo" className="h-5 w-5" />
          </div>
          <span className="font-semibold text-xl tracking-tight text-zinc-100">ETRL Chat</span>
        </Link>
      </div>

      <Card className="w-full max-w-md bg-zinc-900/50 border-emerald-500/30 backdrop-blur-xl shadow-[0_0_40px_-15px_rgba(16,185,129,0.4)] text-center relative z-10">
        <CardHeader className="pt-8 pb-4">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 relative">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-75" />
            <CheckCircle2 className="h-10 w-10 text-emerald-400 relative z-10" />
          </div>
          <CardTitle className="text-3xl text-zinc-100">Оплата успешна!</CardTitle>
          <CardDescription className="text-base mt-3 text-zinc-400">
            Ваша подписка PRO успешно активирована.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <p className="mb-8 text-zinc-300">
            Спасибо за покупку. Теперь вам доступны все премиум-функции платформы ETRL Chat без ограничений.
          </p>
          <div className="flex items-center justify-center gap-3 text-sm font-medium bg-zinc-950/50 py-4 px-6 rounded-xl border border-white/5">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
            <span className="text-zinc-300">Возвращаем в чат через {countdown}...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
