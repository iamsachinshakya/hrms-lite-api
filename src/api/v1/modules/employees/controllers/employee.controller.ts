import { Request, Response } from "express";
import { IEmployeeService } from "@/api/v1/modules/employees/services/employee.service.interface";
import { ApiResponse } from "@/api/v1/modules/common/utils/apiResponse";
import { PAGINATION_PAGE_LIMIT } from "@/api/v1/modules/common/constants/constants";
import { ICreateEmployee, IUpdateEmployee } from "@/api/v1/modules/employees/models/employee.dto";
import { IQueryParams } from "@/api/v1/modules/common/models/common.dto";

export interface IEmployeeController {
    create(req: Request, res: Response): Promise<Response>;
    update(req: Request, res: Response): Promise<Response>;
    delete(req: Request, res: Response): Promise<Response>;
    getById(req: Request, res: Response): Promise<Response>;
    getAll(req: Request, res: Response): Promise<Response>;
}

export class EmployeeController implements IEmployeeController {
    constructor(private readonly employeeService: IEmployeeService) { }

    async create(req: Request, res: Response): Promise<Response> {
        const data: ICreateEmployee = req.body;
        const employee = await this.employeeService.createEmployee(data);
        return ApiResponse.success(res, "Employee created successfully", employee, 201);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const data: IUpdateEmployee = req.body;
        const employee = await this.employeeService.updateEmployee(id, data);
        return ApiResponse.success(res, "Employee updated successfully", employee);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        await this.employeeService.deleteEmployee(id);
        return ApiResponse.success(res, "Employee deleted successfully", null, 204);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const employee = await this.employeeService.getEmployeeById(id);
        return ApiResponse.success(res, "Employee fetched successfully", employee);
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const query: IQueryParams = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || PAGINATION_PAGE_LIMIT,
            search: (req.query.search as string) || "",
            sortBy: (req.query.sortBy as string) || "createdAt",
            sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
        };

        const result = await this.employeeService.getAllEmployees(query);
        return ApiResponse.success(res, "Employees fetched successfully", result);
    }
}
