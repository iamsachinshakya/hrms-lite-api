import { z } from "zod";
import { Environment, LogLevel } from "@/app/config/constants";

// Define & validate environment schema
const envSchema = z.object({
    // Server
    NODE_ENV: z.enum(Environment).default(Environment.DEVELOPMENT),
    PORT: z
        .string()
        .regex(/^\d+$/, { message: "PORT must be a number" })
        .default("5000"),
    CORS_ORIGIN: z.string().default("4000"),

    // Database
    MONGODB_URI: z.string(),
    DB_NAME: z.string().optional(),

    // Logging
    LOG_LEVEL: z.enum(LogLevel).default(LogLevel.DEBUG),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("Invalid environment configuration:");
    console.error(parsed.error.format());
    process.exit(1);
}

export const env = parsed.data;

// constants
export const isProduction = env.NODE_ENV === Environment.PRODUCTION;
export const isDevelopment = env.NODE_ENV === Environment.DEVELOPMENT;
export const isTest = env.NODE_ENV === Environment.TEST;

// Log startup configuration summary
console.info(
    `🌍 Environment initialized: ${env.NODE_ENV} | Port: ${env.PORT} | Log level: ${env.LOG_LEVEL}`
);
