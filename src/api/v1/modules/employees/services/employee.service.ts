import { IEmployeeService } from "./employee.service.interface";
import { IEmployeeRepository } from "../repositories/employee.repository.interface";
import { IEmployeeEntity } from "../models/employee.entity";
import { ICreateEmployee, IUpdateEmployee } from "../models/employee.dto";
import { IQueryParams } from "../../common/models/common.dto";
import { ApiError } from "../../common/utils/apiError";

export class EmployeeService implements IEmployeeService {
    constructor(private readonly employeeRepository: IEmployeeRepository) { }

    async createEmployee(data: ICreateEmployee): Promise<IEmployeeEntity> {
        return this.employeeRepository.create(data);
    }

    async updateEmployee(id: string, data: IUpdateEmployee): Promise<IEmployeeEntity> {
        return this.employeeRepository.update(id, data);
    }

    async deleteEmployee(id: string): Promise<void> {
        await this.employeeRepository.delete(id);
    }

    async getEmployeeById(id: string): Promise<IEmployeeEntity> {
        const employee = await this.employeeRepository.getById(id);
        if (!employee) throw new ApiError("Employee not found", 404);
        return employee;
    }

    async getAllEmployees(query: IQueryParams): Promise<{ data: IEmployeeEntity[]; total: number; page: number; limit: number }> {
        return this.employeeRepository.getAll(query);
    }
}
