import { Request, Response } from "express";
import { IAttendanceService } from "@/api/v1/modules/attendance/services/attendance.service.interface";
import { ApiResponse } from "@/api/v1/modules/common/utils/apiResponse";
import { PAGINATION_PAGE_LIMIT } from "@/api/v1/modules/common/constants/constants";
import { ICreateAttendance, IUpdateAttendance } from "@/api/v1/modules/attendance/models/attendance.dto";
import { IQueryParams } from "@/api/v1/modules/common/models/common.dto";

export class AttendanceController {
    constructor(private readonly attendanceService: IAttendanceService) { }

    async mark(req: Request, res: Response): Promise<Response> {
        const data: ICreateAttendance = req.body;
        const attendance = await this.attendanceService.markAttendance(req.body);
        return ApiResponse.success(res, "Attendance marked", attendance, 201);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const attendance = await this.attendanceService.getAttendanceById(req.params.id);
        return ApiResponse.success(res, "Attendance record found", attendance);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const attendance = await this.attendanceService.updateAttendance(req.params.id, req.body);
        return ApiResponse.success(res, "Attendance updated", attendance);
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const result = await this.attendanceService.getAllAttendance(req.query as any);
        return ApiResponse.success(res, "Attendance records retrieved", result.data, 200, {
            total: result.total,
            page: result.page,
            limit: result.limit,
        });
    }

    async getEmployeeAttendance(req: Request, res: Response): Promise<Response> {
        const result = await this.attendanceService.getEmployeeAttendance(req.params.employeeId, req.query as any);
        return ApiResponse.success(res, "Employee attendance retrieved", result.data, 200, { total: result.total });
    }
}
