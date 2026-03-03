import mongoose from "mongoose";
import { IEmployeeRepository } from "@/api/v1/modules/employees/repositories/employee.repository.interface";
import Employee, { IEmployee } from "@/api/v1/modules/employees/models/employee.model";
import { IEmployeeEntity } from "@/api/v1/modules/employees/models/employee.entity";
import { ICreateEmployee, IUpdateEmployee } from "@/api/v1/modules/employees/models/employee.dto";
import { IQueryParams } from "@/api/v1/modules/common/models/common.dto";
import { ApiError } from "@/api/v1/modules/common/utils/apiError";

export class EmployeeRepository implements IEmployeeRepository {
    private toEntity(doc: IEmployee): IEmployeeEntity {
        return {
            id: doc.id,
            employeeId: doc.employeeId,
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
        // Try id as ObjectId first, then as employeeId
        const doc = await Employee.findOne({ $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { employeeId: id }] });
        if (doc) await Employee.deleteOne({ _id: doc._id });
    }

    async getById(id: string): Promise<IEmployeeEntity | null> {
        const doc = await Employee.findOne({ $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { employeeId: id }] });
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
