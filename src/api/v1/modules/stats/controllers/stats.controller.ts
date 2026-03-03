import { Request, Response } from "express";
import { StatsService } from "@/api/v1/modules/stats/services/stats.service";
import { ApiResponse } from "@/api/v1/modules/common/utils/apiResponse";

export class StatsController {
    constructor(private readonly statsService: StatsService) { }

    async getSummary(req: Request, res: Response): Promise<Response> {
        const summary = await this.statsService.getSummary();
        return ApiResponse.success(res, "Stats summary retrieved", summary);
    }

    async getPresentDays(req: Request, res: Response): Promise<Response> {
        const presentDays = await this.statsService.getPresentDays();
        return ApiResponse.success(res, "Present days stats retrieved", presentDays);
    }
}
