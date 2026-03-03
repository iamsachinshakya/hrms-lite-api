import { IEmployeeEntity } from "./employee.entity";

export interface ICreateEmployee extends Omit<IEmployeeEntity, "id" | "createdAt" | "updatedAt"> { }
export interface IUpdateEmployee extends Partial<ICreateEmployee> { }

export interface IEmployeeProfile extends IEmployeeEntity { }
