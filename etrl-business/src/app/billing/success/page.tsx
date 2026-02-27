"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function BillingSuccessPage() {
  const router = useRouter();
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-lg text-center">
        <CardHeader className="pt-8">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500" />
          </div>
          <CardTitle className="text-2xl">Оплата прошла успешно!</CardTitle>
          <CardDescription className="text-base mt-2">
            Ваша подписка PRO активирована.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8 text-muted-foreground">
          <p className="mb-6">
            Спасибо за покупку. Теперь вам доступны все премиум-функции ETRL Chat без ограничений.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span>Возвращаем в чат через {countdown}...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
