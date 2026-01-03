"use server";

import { connectToDatabase } from "@/database/mongoose";
import { Watchlist } from "@/database/models/watchlist.model";

export async function getWatchlistSymbolsByEmail(
  email: string
): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB connection not found");

    // Better Auth stores users in the "user" collection
    const user = await db
      .collection("user")
      .findOne<{ _id?: unknown; id?: string; email: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || "");
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error("getWatchlistSymbolsByEmail error:", err);
    return [];
  }
}

export async function saveAndRemoveWatchList({
  userId,
  symbol,
  company,
}: {
  userId: string;
  symbol: string;
  company: string;
}): Promise<{ success: boolean; data?: object; error?: unknown }> {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Mongoose connection not found");

    const findData = await findWatchListBySymbol({ symbol, userId });
    if (findData.data) {
      await Watchlist.deleteOne({
        symbol,
        userId,
      });
      return { success: true };
    }
    const createData = await Watchlist.create({
      userId,
      symbol,
      company,
    });

    const response = await createData.save();

    return { success: true, data: JSON.parse(JSON.stringify(response)) };
  } catch (error) {
    console.error("Error to save watchlist data", error);
    return { success: false, error };
  }
}

export async function findWatchListBySymbol({
  symbol,
  userId,
}: {
  symbol: string;
  userId: string;
}): Promise<{ success: boolean; data?: object | null; error?: unknown }> {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Mongoose connection not found");

    const response = await Watchlist.findOne<{
      symbol: string;
      userId: string;
    }>({ symbol, userId });

    return { success: true, data: JSON.parse(JSON.stringify(response)) };
  } catch (error) {
    console.log("Error to find watchlist by name", error);
    return { success: false, error };
  }
}
