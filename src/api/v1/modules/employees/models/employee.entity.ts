
/**
 * Pure domain model — DB agnostic
 */
export interface IEmployeeEntity {
    id: string;          // MongoDB internal ID
    employeeId: string;  // Custom EMP001 style ID
    name: string;
    email: string;
    department: string;
    joinDate: string;
    createdAt: Date;
    updatedAt: Date;
}
