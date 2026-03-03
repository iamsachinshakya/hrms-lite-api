import { Router } from "express";
import { StatsController } from "@/api/v1/modules/stats/controllers/stats.controller";
import { StatsService } from "@/api/v1/modules/stats/services/stats.service";
import { asyncHandler } from "@/api/v1/modules/common/utils/asyncHandler";

const router = Router();
const statsService = new StatsService();
const statsController = new StatsController(statsService);

router.get("/summary", asyncHandler(statsController.getSummary.bind(statsController)));
router.get("/present-days", asyncHandler(statsController.getPresentDays.bind(statsController)));

export { router as statsRouter };
