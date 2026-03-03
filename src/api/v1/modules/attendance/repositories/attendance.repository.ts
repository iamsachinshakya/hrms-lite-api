import mongoose from "mongoose";
import { IAttendanceRepository } from "@/api/v1/modules/attendance/repositories/attendance.repository.interface";
import Attendance, { IAttendance } from "@/api/v1/modules/attendance/models/attendance.model";
import { IAttendanceEntity } from "@/api/v1/modules/attendance/models/attendance.entity";
import { ICreateAttendance, IUpdateAttendance } from "@/api/v1/modules/attendance/models/attendance.dto";
import { IQueryParams } from "@/api/v1/modules/common/models/common.dto";
import { ApiError } from "@/api/v1/modules/common/utils/apiError";

export class AttendanceRepository implements IAttendanceRepository {
    private toEntity(doc: any): IAttendanceEntity {
        return {
            id: doc._id as string,
            employeeId: doc.employeeId?.employeeId || doc.employeeId.toString(),
            date: doc.date,
            status: doc.status,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }

    async create(data: ICreateAttendance): Promise<IAttendanceEntity> {
        const attendance = await (await Attendance.create(data)).populate("employeeId");
        return this.toEntity(attendance);
    }

    async update(id: string, data: IUpdateAttendance): Promise<IAttendanceEntity> {
        const updated = await Attendance.findByIdAndUpdate(id, data, { new: true }).populate("employeeId");
        if (!updated) throw new ApiError("Attendance record not found", 404);
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await Attendance.findByIdAndDelete(id);
    }

    async deleteByEmployeeId(employeeId: string): Promise<void> {
        if (!mongoose.isValidObjectId(employeeId)) return;
        await Attendance.deleteMany({ employeeId });
    }

    async getById(id: string): Promise<IAttendanceEntity | null> {
        const doc = await Attendance.findById(id).populate("employeeId");
        return doc ? this.toEntity(doc) : null;
    }

    async getByEmployeeAndDate(employeeId: string, date: string): Promise<IAttendanceEntity | null> {
        const doc = await Attendance.findOne({ employeeId, date }).populate("employeeId");
        return doc ? this.toEntity(doc) : null;
    }

    async getAll(query: IQueryParams): Promise<{ data: IAttendanceEntity[]; total: number; page: number; limit: number }> {
        const { page = 1, limit = 10, sortBy = "date", sortOrder = "desc", employeeId, status, from, to } = query;

        const filter: any = {};
        if (employeeId) filter.employeeId = employeeId;
        if (status) filter.status = status;
        if (from || to) {
            filter.date = {};
            if (from) filter.date.$gte = from;
            if (to) filter.date.$lte = to;
        }

        const total = await Attendance.countDocuments(filter);
        const docs = await Attendance.find(filter)
            .populate("employeeId")
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
