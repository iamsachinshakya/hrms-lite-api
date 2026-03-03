import { IEmployeeRepository } from "./employee.repository.interface";
import Employee, { IEmployee } from "../models/employee.model";
import { IEmployeeEntity } from "../models/employee.entity";
import { ICreateEmployee, IUpdateEmployee } from "../models/employee.dto";
import { IQueryParams } from "../../common/models/common.dto";
import { ApiError } from "../../common/utils/apiError";

export class EmployeeRepository implements IEmployeeRepository {
    private toEntity(doc: IEmployee): IEmployeeEntity {
        return {
            id: doc._id as string,
            name: doc.name,
            email: doc.email,
            department: doc.department,
            joinDate: doc.joinDate,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }

    async create(data: ICreateEmployee): Promise<IEmployeeEntity> {
        const employee = await Employee.create(data);
        return this.toEntity(employee);
    }

    async update(id: string, data: IUpdateEmployee): Promise<IEmployeeEntity> {
        const updated = await Employee.findByIdAndUpdate(id, data, { new: true });
        if (!updated) throw new ApiError("Employee not found", 404);
        return this.toEntity(updated);
    }

    async delete(id: string): Promise<void> {
        await Employee.findByIdAndDelete(id);
    }

    async getById(id: string): Promise<IEmployeeEntity | null> {
        const doc = await Employee.findById(id);
        return doc ? this.toEntity(doc) : null;
    }

    async getAll(query: IQueryParams): Promise<{ data: IEmployeeEntity[]; total: number; page: number; limit: number }> {
        const { page = 1, limit = 10, search, sortBy = "createdAt", sortOrder = "desc" } = query;
        const filter = search ? { name: { $regex: search, $options: "i" } } : {};

        const total = await Employee.countDocuments(filter);
        const docs = await Employee.find(filter)
            .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return {
            data: docs.map(this.toEntity),
            total,
            page,
            limit,
        };
    }
}
