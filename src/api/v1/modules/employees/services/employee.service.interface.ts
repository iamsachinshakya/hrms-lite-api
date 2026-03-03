import { IEmployeeEntity } from "../models/employee.entity";
import { ICreateEmployee, IUpdateEmployee } from "../models/employee.dto";
import { IQueryParams } from "../../common/models/common.dto";

export interface IEmployeeService {
    createEmployee(data: ICreateEmployee): Promise<IEmployeeEntity>;
    updateEmployee(id: string, data: IUpdateEmployee): Promise<IEmployeeEntity>;
    deleteEmployee(id: string): Promise<void>;
    getEmployeeById(id: string): Promise<IEmployeeEntity>;
    getAllEmployees(query: IQueryParams): Promise<{ data: IEmployeeEntity[]; total: number; page: number; limit: number }>;
}
