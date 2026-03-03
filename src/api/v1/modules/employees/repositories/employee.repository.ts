import mongoose from "mongoose";
import { IEmployeeRepository } from "@/api/v1/modules/employees/repositories/employee.repository.interface";
import Employee, { IEmployee } from "@/api/v1/modules/employees/models/employee.model";
import { IEmployeeEntity } from "@/api/v1/modules/employees/models/employee.entity";
import { ICreateEmployee, IUpdateEmployee } from "@/api/v1/modules/employees/models/employee.dto";
import { IQueryParams } from "@/api/v1/modules/common/models/common.dto";
import { ApiError } from "@/api/v1/modules/common/utils/apiError";

export class EmployeeRepository implements IEmployeeRepository {
    private toEntity(doc: any): IEmployeeEntity {
        return {
            id: doc._id.toString(),
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
        const doc = await Employee.findOne({ $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { employeeId: id }] }).lean();
        return doc ? this.toEntity(doc as any) : null;
    }

    async getAll(query: IQueryParams): Promise<{ data: IEmployeeEntity[]; total: number; page: number; limit: number }> {
        const { page = 1, limit = 10, search, sortBy = "createdAt", sortOrder = "desc" } = query;
        const filter = search ? { name: { $regex: search, $options: "i" } } : {};

        const total = await Employee.countDocuments(filter);
        const docs = await Employee.find(filter)
            .select("-__v")
            .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        return {
            data: docs.map(this.toEntity),
            total,
            page,
            limit,
        };
    }

    async updateEmptyNames(names: string[]): Promise<number> {
        const filter = { $or: [{ name: { $exists: false } }, { name: null }, { name: "" }, { name: "Unnamed Employee" }] };
        const employees = await Employee.find(filter);
        let updatedCount = 0;

        for (const emp of employees) {
            const randomName = names[Math.floor(Math.random() * names.length)];
            await Employee.updateOne({ _id: emp._id }, { $set: { name: randomName } });
            updatedCount++;
        }

        return updatedCount;
    }
}
