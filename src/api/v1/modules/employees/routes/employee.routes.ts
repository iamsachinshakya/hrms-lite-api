import { Router } from "express";
import { EmployeeController } from "@/api/v1/modules/employees/controllers/employee.controller";
import { EmployeeService } from "@/api/v1/modules/employees/services/employee.service";
import { EmployeeRepository } from "@/api/v1/modules/employees/repositories/employee.repository";
import { AttendanceRepository } from "@/api/v1/modules/attendance/repositories/attendance.repository";
import { asyncHandler } from "@/api/v1/modules/common/utils/asyncHandler";
import { validateBody } from "@/api/v1/modules/common/middlewares/validate.middleware";
import { createEmployeeSchema, updateEmployeeSchema } from "@/api/v1/modules/employees/validations/employee.validation";

const router = Router();

const employeeRepository = new EmployeeRepository();
const attendanceRepository = new AttendanceRepository();
const employeeService = new EmployeeService(employeeRepository, attendanceRepository);
const employeeController = new EmployeeController(employeeService);

router.post("/", validateBody(createEmployeeSchema), asyncHandler(employeeController.create.bind(employeeController)));
router.get("/", asyncHandler(employeeController.getAll.bind(employeeController)));
router.get("/:id", asyncHandler(employeeController.getById.bind(employeeController)));
router.patch("/:id", validateBody(updateEmployeeSchema), asyncHandler(employeeController.update.bind(employeeController)));
router.delete("/:id", asyncHandler(employeeController.delete.bind(employeeController)));

export { router as employeeRouter };
