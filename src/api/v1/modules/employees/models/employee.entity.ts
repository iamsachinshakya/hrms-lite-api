
/**
 * Pure domain model — DB agnostic
 */
export interface IEmployeeEntity {
    id: string;
    name: string;
    email: string;
    department: string;
    joinDate: string;
    createdAt: Date;
    updatedAt: Date;
}
