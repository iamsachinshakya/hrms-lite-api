import mongoose from "mongoose";
import { env } from "@/app/config/env";
import logger from "@/app/utils/logger";

/**
 * Global cache to prevent multiple connections
 * (important for serverless environments like Vercel)
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache:
    | {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    }
    | undefined;
}

const globalCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

global.mongooseCache = globalCache;

export const connectDB = async (): Promise<void> => {
  if (globalCache.conn) {
    return;
  }

  const MONGO_URI = `${env.MONGODB_URI}/${env.DB_NAME}`;

  try {
    if (!globalCache.promise) {
      globalCache.promise = mongoose.connect(MONGO_URI, {
        bufferCommands: false,
      });
    }

    globalCache.conn = await globalCache.promise;

    logger.info("✅ MongoDB connected successfully");
    logger.debug(
      `📦 DB: ${mongoose.connection.name} | 🌍 Host: ${mongoose.connection.host}`
    );

    /**
     * Attach listeners only once
     */
    if (mongoose.connection.listenerCount("error") === 0) {
      mongoose.connection.on("error", (err) => {
        logger.error(`💥 MongoDB connection error: ${err.message}`);
      });

      mongoose.connection.on("disconnected", () => {
        logger.warn("⚠️ MongoDB disconnected");
      });

      mongoose.connection.on("reconnected", () => {
        logger.info("🔄 MongoDB reconnected");
      });
    }
  } catch (err: any) {
    logger.error(`❌ MongoDB connection failed: ${err.message}`);
    globalCache.promise = null;
    throw err;
  }
};
