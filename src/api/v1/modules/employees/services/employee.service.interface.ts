import { IEmployeeEntity } from "@/api/v1/modules/employees/models/employee.entity";
import { ICreateEmployee, IUpdateEmployee } from "@/api/v1/modules/employees/models/employee.dto";
import { IQueryParams } from "@/api/v1/modules/common/models/common.dto";

export interface IEmployeeService {
    createEmployee(data: ICreateEmployee): Promise<IEmployeeEntity>;
    updateEmployee(id: string, data: IUpdateEmployee): Promise<IEmployeeEntity>;
    deleteEmployee(id: string): Promise<void>;
    getEmployeeById(id: string): Promise<IEmployeeEntity>;
    getAllEmployees(query: IQueryParams): Promise<{ data: IEmployeeEntity[]; total: number; page: number; limit: number }>;
}
