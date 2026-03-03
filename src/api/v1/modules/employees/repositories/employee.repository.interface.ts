import { IEmployeeEntity } from "../models/employee.entity";
import { ICreateEmployee, IUpdateEmployee } from "../models/employee.dto";
import { IQueryParams } from "../../common/models/common.dto";

export interface IEmployeeRepository {
    create(data: ICreateEmployee): Promise<IEmployeeEntity>;
    update(id: string, data: IUpdateEmployee): Promise<IEmployeeEntity>;
    delete(id: string): Promise<void>;
    getById(id: string): Promise<IEmployeeEntity | null>;
    getAll(query: IQueryParams): Promise<{ data: IEmployeeEntity[]; total: number; page: number; limit: number }>;
}
