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
        const attendance = await this.attendanceService.markAttendance(data);
        return ApiResponse.success(res, "Attendance marked successfully", attendance, 201);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const data: IUpdateAttendance = req.body;
        const attendance = await this.attendanceService.updateAttendance(id, data);
        return ApiResponse.success(res, "Attendance updated successfully", attendance);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const attendance = await this.attendanceService.getAttendanceById(id);
        return ApiResponse.success(res, "Attendance record fetched successfully", attendance);
    }

    async getEmployeeAttendance(req: Request, res: Response): Promise<Response> {
        const { employeeId } = req.params;
        const query: IQueryParams = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || PAGINATION_PAGE_LIMIT,
        };

        const result = await this.attendanceService.getEmployeeAttendance(employeeId, query);
        return ApiResponse.success(res, "Employee attendance fetched successfully", result);
    }
}
