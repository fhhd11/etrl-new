import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

import { env } from "@/lib/env";
import type { PartnerSession } from "@/lib/types";

const SESSION_COOKIE_NAME = "partner_dashboard_session";
const encoder = new TextEncoder();

function getSessionSecret() {
  return encoder.encode(env.SESSION_SECRET);
}

export async function createSessionToken(payload: PartnerSession) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSessionSecret());
}

export async function setSessionCookie(payload: PartnerSession) {
  const cookieStore = await cookies();
  const token = await createSessionToken(payload);

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSessionFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify<PartnerSession>(token, getSessionSecret());

    if (!payload.referrerCode || typeof payload.commissionRate !== "number") {
      return null;
    }

    return {
      referrerCode: payload.referrerCode,
      commissionRate: payload.commissionRate,
    } satisfies PartnerSession;
  } catch {
    return null;
  }
}

export { SESSION_COOKIE_NAME };
