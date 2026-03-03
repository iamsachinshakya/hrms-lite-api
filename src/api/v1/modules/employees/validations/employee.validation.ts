import { z } from "zod";

export const createEmployeeSchema = z.object({
    employeeId: z.string().min(1, "Employee ID is required"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    department: z.string().min(1, "Department is required"),
    joinDate: z.string().optional(),
});

export const updateEmployeeSchema = createEmployeeSchema.partial();
