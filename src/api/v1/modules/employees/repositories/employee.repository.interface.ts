import { IEmployeeEntity } from "@/api/v1/modules/employees/models/employee.entity";
import { ICreateEmployee, IUpdateEmployee } from "@/api/v1/modules/employees/models/employee.dto";
import { IQueryParams } from "@/api/v1/modules/common/models/common.dto";

export interface IEmployeeRepository {
    create(data: ICreateEmployee): Promise<IEmployeeEntity>;
    update(id: string, data: IUpdateEmployee): Promise<IEmployeeEntity>;
    delete(id: string): Promise<void>;
    getById(id: string): Promise<IEmployeeEntity | null>;
    getAll(query: IQueryParams): Promise<{ data: IEmployeeEntity[]; total: number; page: number; limit: number }>;
    updateEmptyNames(names: string[]): Promise<number>;
}
