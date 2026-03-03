import { IAttendanceEntity } from "./attendance.entity";

export interface ICreateAttendance extends Omit<IAttendanceEntity, "id" | "createdAt" | "updatedAt"> { }
export interface IUpdateAttendance extends Partial<Omit<ICreateAttendance, "employeeId" | "date">> { }

export interface IAttendanceReport {
    data: IAttendanceEntity[];
    total: number;
}
