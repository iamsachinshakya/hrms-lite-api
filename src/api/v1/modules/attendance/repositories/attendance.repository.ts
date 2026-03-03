import { IAttendanceRepository } from "@/api/v1/modules/attendance/repositories/attendance.repository.interface";
import Attendance, { IAttendance } from "@/api/v1/modules/attendance/models/attendance.model";
import { IAttendanceEntity } from "@/api/v1/modules/attendance/models/attendance.entity";
import { ICreateAttendance, IUpdateAttendance } from "@/api/v1/modules/attendance/models/attendance.dto";
import { IQueryParams } from "@/api/v1/modules/common/models/common.dto";
import { ApiError } from "@/api/v1/modules/common/utils/apiError";

export class AttendanceRepository implements IAttendanceRepository {
    private toEntity(doc: IAttendance): IAttendanceEntity {
        return {
            id: doc._id as string,
            employeeId: doc.employeeId.toString(),
            date: doc.date,
            status: doc.status,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }

    async create(data: ICreateAttendance): Promise<IAttendanceEntity> {
        const attendance = await Attendance.create(data);
        return this.toEntity(attendance);
    }

    async update(id: string, data: IUpdateAttendance): Promise<IAttendanceEntity> {
        const updated = await Attendance.findByIdAndUpdate(id, data, { new: true });
        if (!updated) throw new ApiError("Attendance record not found", 404);
        return this.toEntity(updated);
    }

    async getById(id: string): Promise<IAttendanceEntity | null> {
        const doc = await Attendance.findById(id);
        return doc ? this.toEntity(doc) : null;
    }

    async getByEmployeeAndDate(employeeId: string, date: string): Promise<IAttendanceEntity | null> {
        const doc = await Attendance.findOne({ employeeId, date });
        return doc ? this.toEntity(doc) : null;
    }

    async getAll(query: IQueryParams): Promise<{ data: IAttendanceEntity[]; total: number; page: number; limit: number }> {
        const { page = 1, limit = 10, sortBy = "date", sortOrder = "desc" } = query;

        const total = await Attendance.countDocuments({});
        const docs = await Attendance.find({})
            .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return {
            data: docs.map(this.toEntity),
            total,
            page,
            limit,
        };
    }
}
