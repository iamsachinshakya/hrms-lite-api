import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { stream } from "@/app/utils/logger";
import { env, isDevelopment } from "@/app/config/env";
import { ApiError } from "@/api/v1/modules/common/utils/apiError";
import { errorMiddleware } from "@/api/v1/modules/common/middlewares/error.middleware";
import { ApiResponse } from "@/api/v1/modules/common/utils/apiResponse";
import { employeeRouter } from "@/api/v1/modules/employees/routes/employee.routes";
import { attendanceRouter } from "@/api/v1/modules/attendance/routes/attendance.routes";

const app = express();

/**
 * Middleware
 */
app.use(
    cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(morgan(isDevelopment ? "dev" : "combined", { stream }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

/**
 * Health check
 */
app.get("/", (_req: Request, res: Response) => {
    ApiResponse.success(res, "🚀 HRMS Express server running!");
});

/**
 * API routes
 */
app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/attendance", attendanceRouter);

/**
 * 404 handler
 */
app.use((req: Request, _res: Response, next: NextFunction) => {
    next(new ApiError(`Route not found: ${req.originalUrl}`, 404));
});

/**
 * Global error handler
 */
app.use(errorMiddleware);

export default app;
