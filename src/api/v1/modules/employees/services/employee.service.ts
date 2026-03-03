import { IEmployeeService } from "@/api/v1/modules/employees/services/employee.service.interface";
import { IEmployeeRepository } from "@/api/v1/modules/employees/repositories/employee.repository.interface";
import { IAttendanceRepository } from "@/api/v1/modules/attendance/repositories/attendance.repository.interface";
import { IEmployeeEntity } from "@/api/v1/modules/employees/models/employee.entity";
import { ICreateEmployee, IUpdateEmployee } from "@/api/v1/modules/employees/models/employee.dto";
import { IQueryParams } from "@/api/v1/modules/common/models/common.dto";
import { ApiError } from "@/api/v1/modules/common/utils/apiError";

export class EmployeeService implements IEmployeeService {
    constructor(
        private readonly employeeRepository: IEmployeeRepository,
        private readonly attendanceRepository: IAttendanceRepository
    ) { }

    async createEmployee(data: ICreateEmployee): Promise<IEmployeeEntity> {
        if (!data.joinDate) {
            data.joinDate = new Date().toISOString().split("T")[0];
        }
        return this.employeeRepository.create(data);
    }

    async updateEmployee(id: string, data: IUpdateEmployee): Promise<IEmployeeEntity> {
        return this.employeeRepository.update(id, data);
    }

    async deleteEmployee(id: string): Promise<void> {
        const employee = await this.employeeRepository.getById(id);
        if (!employee) throw new ApiError("Employee not found", 404);

        // Cascade delete attendance records
        await this.attendanceRepository.deleteByEmployeeId(employee.id);

        return this.employeeRepository.delete(id);
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
