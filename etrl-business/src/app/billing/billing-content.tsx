"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Check, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-destructive">Ошибка доступа</CardTitle>
            <CardDescription>
              Отсутствуют необходимые параметры для оплаты
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Пожалуйста, перейдите на эту страницу из интерфейса чата, чтобы мы могли идентифицировать ваш аккаунт.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="https://app.etrl.chat">
              <Button>
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Оформление подписки</h1>
        <p className="mt-2 text-muted-foreground">
          Выберите тариф для аккаунта <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <Card className="w-full max-w-md border-primary/20 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
          ПОПУЛЯРНЫЙ
        </div>
        <CardHeader className="text-center pb-8 pt-6">
          <CardTitle className="text-2xl">PRO (Безлимит)</CardTitle>
          <CardDescription className="pt-2">
            Полный доступ ко всем функциям ETRL Chat на 30 дней
          </CardDescription>
          <div className="mt-4 flex items-baseline justify-center gap-x-2">
            <span className="text-5xl font-extrabold tracking-tight">500</span>
            <span className="text-xl font-semibold text-muted-foreground">₽</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            {[
              "Безлимитные запросы к ИИ",
              "Доступ ко всем передовым моделям",
              "Быстрое время ответа (приоритет в очереди)",
              "Генерация изображений",
              "Анализ документов",
              "Отсутствие рекламы",
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-x-3">
                <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          {error && (
            <div className="mt-6 p-3 bg-destructive/10 text-destructive text-sm rounded-md text-center">
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter className="pb-8">
          <Button 
            className="w-full h-12 text-lg font-semibold" 
            onClick={handlePayment} 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Создание платежа...
              </>
            ) : (
              "Оплатить PRO"
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <p className="mt-8 text-xs text-muted-foreground max-w-md text-center">
        Нажимая «Оплатить PRO», вы соглашаетесь с условиями использования сервиса. 
        Платеж обрабатывается безопасно через ЮKassa.
      </p>
    </div>
  );
}
