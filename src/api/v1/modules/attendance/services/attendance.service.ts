import { IAttendanceService } from "@/api/v1/modules/attendance/services/attendance.service.interface";
import { IAttendanceRepository } from "@/api/v1/modules/attendance/repositories/attendance.repository.interface";
import { IEmployeeRepository } from "@/api/v1/modules/employees/repositories/employee.repository.interface";
import { IAttendanceEntity } from "@/api/v1/modules/attendance/models/attendance.entity";
import { ICreateAttendance, IUpdateAttendance } from "@/api/v1/modules/attendance/models/attendance.dto";
import { IQueryParams } from "@/api/v1/modules/common/models/common.dto";
import { ApiError } from "@/api/v1/modules/common/utils/apiError";

export class AttendanceService implements IAttendanceService {
    constructor(
        private readonly attendanceRepository: IAttendanceRepository,
        private readonly employeeRepository: IEmployeeRepository
    ) { }

    async markAttendance(data: ICreateAttendance): Promise<IAttendanceEntity> {
        // Translate employeeId (EMP001 -> ObjectId)
        const employee = await this.employeeRepository.getById(data.employeeId);
        if (!employee) throw new ApiError("Employee not found", 404);

        const mongoId = employee.id; // Internal MongoDB ID

        // Enforce uniqueness
        const existing = await this.attendanceRepository.getByEmployeeAndDate(mongoId, data.date);
        if (existing) throw new ApiError("Already marked for this date", 409);

        const attendanceData = { ...data, employeeId: mongoId };
        return this.attendanceRepository.create(attendanceData as any);
    }

    async updateAttendance(id: string, data: IUpdateAttendance): Promise<IAttendanceEntity> {
        return this.attendanceRepository.update(id, data);
    }

    async getAttendanceById(id: string): Promise<IAttendanceEntity> {
        const doc = await this.attendanceRepository.getById(id);
        if (!doc) throw new ApiError("Attendance record not found", 404);
        return doc;
    }

    async getAllAttendance(query: IQueryParams): Promise<{ data: IAttendanceEntity[]; total: number; page: number; limit: number }> {
        const filter = { ...query };
        if (query.employeeId) {
            const employee = await this.employeeRepository.getById(query.employeeId);
            if (!employee) return { data: [], total: 0, page: query.page || 1, limit: query.limit || 10 };
            filter.employeeId = employee.id;
        }

        return this.attendanceRepository.getAll(filter);
    }

    async getEmployeeAttendance(employeeId: string, query: IQueryParams): Promise<{ data: IAttendanceEntity[]; total: number }> {
        const result = await this.getAllAttendance({ ...query, employeeId });
        return { data: result.data, total: result.total };
    }
}
