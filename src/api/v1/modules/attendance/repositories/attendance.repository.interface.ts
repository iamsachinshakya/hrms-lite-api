import { IAttendanceEntity } from "@/api/v1/modules/attendance/models/attendance.entity";
import { ICreateAttendance, IUpdateAttendance } from "@/api/v1/modules/attendance/models/attendance.dto";
import { IQueryParams } from "@/api/v1/modules/common/models/common.dto";

export interface IAttendanceRepository {
    create(data: ICreateAttendance): Promise<IAttendanceEntity>;
    update(id: string, data: IUpdateAttendance): Promise<IAttendanceEntity>;
    getById(id: string): Promise<IAttendanceEntity | null>;
    getByEmployeeAndDate(employeeId: string, date: string): Promise<IAttendanceEntity | null>;
    deleteByEmployeeId(employeeId: string): Promise<void>;
    getAll(query: IQueryParams): Promise<{ data: IAttendanceEntity[]; total: number; page: number; limit: number }>;
}
