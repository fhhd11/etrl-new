"use server";

import { YooCheckout, ICreatePayment } from "@a2seven/yoo-checkout";
import { v4 as uuidv4 } from "uuid";

// Initialize YooKassa client
// Note: We use try/catch to handle missing env vars during build time
let checkout: YooCheckout | null = null;

try {
  if (process.env.YOOKASSA_SHOP_ID && process.env.YOOKASSA_SECRET_KEY) {
    checkout = new YooCheckout({
      shopId: process.env.YOOKASSA_SHOP_ID,
      secretKey: process.env.YOOKASSA_SECRET_KEY,
    });
  } else {
    console.warn("YooKassa credentials not found in environment variables");
  }
} catch (error) {
  console.error("Failed to initialize YooKassa client:", error);
}

export async function createPaymentSession(userId: string, email: string) {
  if (!userId || !email) {
    return { error: "Отсутствуют необходимые параметры" };
  }

  if (!checkout) {
    console.error("YooKassa client not initialized. Check environment variables.");
    return { error: "Сервис оплаты временно недоступен" };
  }

  try {
    const idempotenceKey = uuidv4();
    const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://etrl.chat"}/billing/success`;
    
    const createPayload = {
      amount: {
        value: "490.00",
        currency: "RUB"
      },
      confirmation: {
        type: "redirect",
        return_url: returnUrl
      },
      description: `Оплата тарифа PRO для ${email}`,
      metadata: {
        user_id: userId,
        email: email
      },
      capture: true,
      receipt: {
        customer: {
          email: email
        },
        items: [
          {
            description: "Подписка PRO (1 месяц)",
            quantity: "1.00",
            amount: {
              value: "490.00",
              currency: "RUB"
            },
            vat_code: "1", // Без НДС
            payment_mode: "full_prepayment",
            payment_subject: "service"
          }
        ]
      }
    };

    const payment = await checkout.createPayment(createPayload as unknown as ICreatePayment, idempotenceKey);
    
    if (payment && payment.confirmation && payment.confirmation.confirmation_url) {
      return { confirmationUrl: payment.confirmation.confirmation_url };
    }
    
    return { error: "Не удалось получить ссылку на оплату от платежной системы" };
    
  } catch (error) {
    console.error("Error creating payment:", error);
    return { error: "Произошла ошибка при создании платежа" };
  }
}
