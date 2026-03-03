import { IAttendanceEntity } from "../models/attendance.entity";
import { ICreateAttendance, IUpdateAttendance } from "../models/attendance.dto";
import { IQueryParams } from "../../common/models/common.dto";

export interface IAttendanceRepository {
    create(data: ICreateAttendance): Promise<IAttendanceEntity>;
    update(id: string, data: IUpdateAttendance): Promise<IAttendanceEntity>;
    getById(id: string): Promise<IAttendanceEntity | null>;
    getByEmployeeAndDate(employeeId: string, date: string): Promise<IAttendanceEntity | null>;
    getAll(query: IQueryParams): Promise<{ data: IAttendanceEntity[]; total: number; page: number; limit: number }>;
}
