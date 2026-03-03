
/**
 * Pure domain model — DB agnostic
 */
export interface IAttendanceEntity {
    id: string;
    employeeId: string;
    date: string;
    status: "Present" | "Absent";
    createdAt: Date;
    updatedAt: Date;
}
