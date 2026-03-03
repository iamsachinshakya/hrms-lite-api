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
        const { id, ...data } = req.body;
        const employee = await this.employeeService.createEmployee({ ...data, employeeId: id });
        const { employeeId, id: mongoId, ...rest } = employee;
        return ApiResponse.success(res, "Employee created", { id: employeeId, ...rest }, 201);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const employee = await this.employeeService.updateEmployee(req.params.id, req.body);
        const { employeeId, id, ...rest } = employee;
        return ApiResponse.success(res, "Employee updated", { id: employeeId, ...rest });
    }

    async delete(req: Request, res: Response): Promise<Response> {
        await this.employeeService.deleteEmployee(req.params.id);
        return ApiResponse.success(res, `Employee ${req.params.id} deleted`);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const employee = await this.employeeService.getEmployeeById(req.params.id);
        const { employeeId, id, ...rest } = employee;
        return ApiResponse.success(res, "Employee found", { id: employeeId, ...rest });
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const query: IQueryParams = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || PAGINATION_PAGE_LIMIT,
            search: req.query.search as string,
            sortBy: req.query.sortBy as string,
            sortOrder: req.query.sortOrder as "asc" | "desc",
        };

        const result = await this.employeeService.getAllEmployees(query);
        const mappedData = result.data.map(({ employeeId, id, ...rest }) => ({ id: employeeId, ...rest }));

        return ApiResponse.success(res, "Employees retrieved", mappedData, 200, {
            total: result.total,
            page: result.page,
            limit: result.limit,
        });
    }
}
