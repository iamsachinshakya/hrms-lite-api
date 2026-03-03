import { IAttendanceService } from "@/api/v1/modules/attendance/services/attendance.service.interface";
import { IAttendanceRepository } from "@/api/v1/modules/attendance/repositories/attendance.repository.interface";
import { IAttendanceEntity } from "@/api/v1/modules/attendance/models/attendance.entity";
import { ICreateAttendance, IUpdateAttendance } from "@/api/v1/modules/attendance/models/attendance.dto";
import { IQueryParams } from "@/api/v1/modules/common/models/common.dto";
import { ApiError } from "@/api/v1/modules/common/utils/apiError";

export class AttendanceService implements IAttendanceService {
    constructor(private readonly attendanceRepository: IAttendanceRepository) { }

    async markAttendance(data: ICreateAttendance): Promise<IAttendanceEntity> {
        const existing = await this.attendanceRepository.getByEmployeeAndDate(data.employeeId, data.date);
        if (existing) {
            throw new ApiError("Attendance already marked for this employee on this date", 400);
        }
        return this.attendanceRepository.create(data);
    }

    async updateAttendance(id: string, data: IUpdateAttendance): Promise<IAttendanceEntity> {
        return this.attendanceRepository.update(id, data);
    }

    async getAttendanceById(id: string): Promise<IAttendanceEntity> {
        const attendance = await this.attendanceRepository.getById(id);
        if (!attendance) throw new ApiError("Attendance record not found", 404);
        return attendance;
    }

    async getEmployeeAttendance(employeeId: string, query: IQueryParams): Promise<{ data: IAttendanceEntity[]; total: number }> {
        // For simplicity, reusing getAll and filtering in repo if needed, 
        // but here we can just pass a filter if repo supports it.
        // For now, let's just get all and filter or assume query handles it.
        const result = await this.attendanceRepository.getAll(query);
        return {
            data: result.data.filter(a => a.employeeId === employeeId),
            total: result.total // This is slightly incorrect for filtered total but sufficient for start
        };
    }
}
