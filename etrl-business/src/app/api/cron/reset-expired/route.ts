import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    // Basic auth using Bearer token
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret) {
      console.error("CRON_SECRET is not configured");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Find expired active subscriptions in Postgres
    const now = new Date();
    const expiredSubscriptions = await prisma.subscription.findMany({
      where: {
        status: "active",
        expiresAt: {
          lt: now
        }
      }
    });

    if (expiredSubscriptions.length === 0) {
      return NextResponse.json({ 
        message: "No expired subscriptions found",
        updatedCount: 0 
      }, { status: 200 });
    }

    const userIds = expiredSubscriptions.map(sub => sub.userId);
    const subscriptionIds = expiredSubscriptions.map(sub => sub.id);

    // 2. Update status in Postgres
    await prisma.subscription.updateMany({
      where: {
        id: { in: subscriptionIds }
      },
      data: {
        status: "expired"
      }
    });

    // 3. Reset balances in MongoDB
    try {
      const mongoClient = await clientPromise;
      const db = mongoClient.db();
      
      await db.collection('balances').updateMany(
        { user: { $in: userIds } },
        { $set: { tokenCredits: 0 } }
      );
      
      console.log(`Successfully reset balances for ${userIds.length} users`);
    } catch (mongoError) {
      console.error("MongoDB update failed during cron job:", mongoError);
      // Still returning success because Postgres was updated
    }

    return NextResponse.json({ 
      message: "Successfully processed expired subscriptions",
      updatedCount: userIds.length,
      userIds
    }, { status: 200 });

  } catch (error) {
    console.error("Error in reset-expired cron job:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
