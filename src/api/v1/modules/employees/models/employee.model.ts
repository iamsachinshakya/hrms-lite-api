import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
    employeeId: string;
    name: string;
    email: string;
    department: string;
    joinDate: string;
    createdAt: Date;
    updatedAt: Date;
}

const EmployeeSchema = new Schema<IEmployee>(
    {
        employeeId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        department: {
            type: String,
            required: true,
        },
        joinDate: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

EmployeeSchema.index({ name: 1 });
EmployeeSchema.index({ email: 1 }, { unique: true });
EmployeeSchema.index({ department: 1 });

const Employee = mongoose.model<IEmployee>("Employee", EmployeeSchema);

export default Employee;
