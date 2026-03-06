"use server";

import { redirect } from "next/navigation";

import { clearSessionCookie, setSessionCookie } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type PartnerRow = {
  secretKey: string;
  referrerCode: string;
  commissionRate: number | string;
};

export type LoginFormState = {
  error?: string;
};

export async function loginAction(
  _previousState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const secretKey = formData.get("secretKey");

  if (typeof secretKey !== "string" || !secretKey.trim()) {
    return {
      error: "Введите секретный ключ.",
    };
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("Partner")
    .select("secretKey, referrerCode, commissionRate")
    .eq("secretKey", secretKey.trim())
    .single();

  if (error || !data) {
    return {
      error: "Ключ не найден. Проверьте корректность и попробуйте снова.",
    };
  }

  const partner = data as PartnerRow;
  const commissionRate = Number(partner.commissionRate);

  await setSessionCookie({
    referrerCode: partner.referrerCode,
    commissionRate: Number.isFinite(commissionRate) ? commissionRate : 0.15,
  });

  redirect("/dashboard");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/login");
}
