import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Verify this is a succeeded payment
    if (payload.event !== "payment.succeeded") {
      return NextResponse.json({ status: "ignored", reason: "not a success event" }, { status: 200 });
    }

    const paymentId = payload.object.id;
    const amount = parseFloat(payload.object.amount.value);
    const { user_id, email } = payload.object.metadata;

    if (!user_id || !email) {
      console.error("Missing metadata in YooKassa webhook:", payload.object.metadata);
      return NextResponse.json({ error: "Missing user_id or email in metadata" }, { status: 400 });
    }

    // 1. Process in PostgreSQL via Prisma
    
    // Upsert User
    await prisma.user.upsert({
      where: { id: user_id },
      update: { email }, // Update email if it changed
      create: { 
        id: user_id,
        email
      }
    });

    // Check if transaction already processed (idempotency)
    const existingTransaction = await prisma.transaction.findUnique({
      where: { yookassaPaymentId: paymentId }
    });

    if (existingTransaction) {
      return NextResponse.json({ status: "ignored", reason: "already processed" }, { status: 200 });
    }

    // Create Transaction
    await prisma.transaction.create({
      data: {
        userId: user_id,
        yookassaPaymentId: paymentId,
        amount: amount,
        status: "succeeded"
      }
    });

    // Upsert Subscription
    // 30 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Find existing active subscription
    const existingSub = await prisma.subscription.findFirst({
      where: { userId: user_id }
    });

    if (existingSub) {
      await prisma.subscription.update({
        where: { id: existingSub.id },
        data: {
          status: "active",
          expiresAt
        }
      });
    } else {
      await prisma.subscription.create({
        data: {
          userId: user_id,
          status: "active",
          expiresAt
        }
      });
    }

    // 2. Process in MongoDB (LibreChat injection)
    try {
      const mongoClient = await clientPromise;
      const db = mongoClient.db();
      
      // Inject tokenCredits (large number for unlimited)
      // LibreChat uses ObjectId for the user reference in the balances collection
      let userObjectId;
      try {
        userObjectId = new ObjectId(user_id);
      } catch (e) {
        // If it's not a valid ObjectId, fallback to string (just in case)
        userObjectId = user_id;
      }

      await db.collection('balances').updateOne(
        { user: userObjectId },
        { 
          $set: { 
            tokenCredits: 1000000000,
            autoRefillEnabled: false 
          } 
        },
        { upsert: true }
      );
      
      console.log(`Successfully processed payment and injected balance for user ${user_id}`);
    } catch (mongoError) {
      // We log the error but still return 200 so YooKassa doesn't retry
      console.error("MongoDB injection failed, but Postgres updated successfully:", mongoError);
    }

    return NextResponse.json({ status: "success" }, { status: 200 });
    
  } catch (error) {
    console.error("Error processing YooKassa webhook:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
