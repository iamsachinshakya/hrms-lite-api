import { IAttendanceEntity } from "@/api/v1/modules/attendance/models/attendance.entity";
import { ICreateAttendance, IUpdateAttendance } from "@/api/v1/modules/attendance/models/attendance.dto";
import { IQueryParams } from "@/api/v1/modules/common/models/common.dto";

export interface IAttendanceService {
    markAttendance(data: ICreateAttendance): Promise<IAttendanceEntity>;
    updateAttendance(id: string, data: IUpdateAttendance): Promise<IAttendanceEntity>;
    getAttendanceById(id: string): Promise<IAttendanceEntity>;
    getEmployeeAttendance(employeeId: string, query: IQueryParams): Promise<{ data: IAttendanceEntity[]; total: number }>;
}
