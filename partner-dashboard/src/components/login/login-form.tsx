"use client";

import { useActionState } from "react";
import { KeyRound } from "lucide-react";

import { loginAction, type LoginFormState } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: LoginFormState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-xl">
      <CardHeader className="space-y-3">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
          <KeyRound className="size-5" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl">Вход для партнера</CardTitle>
          <CardDescription>
            Введите выданный секретный ключ, чтобы открыть персональную статистику.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="secretKey">Секретный ключ</Label>
            <Input
              id="secretKey"
              name="secretKey"
              placeholder="Например: partner_live_..."
              autoComplete="off"
              required
            />
          </div>

          {state.error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {state.error}
            </div>
          ) : null}

          <Button className="w-full" size="lg" type="submit" disabled={isPending}>
            {isPending ? "Проверяем ключ..." : "Войти"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
