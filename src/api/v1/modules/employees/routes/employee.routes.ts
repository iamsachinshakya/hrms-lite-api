import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";
import { EmployeeService } from "../services/employee.service";
import { EmployeeRepository } from "../repositories/employee.repository";
import { asyncHandler } from "../../common/utils/asyncHandler";

const router = Router();

const employeeRepository = new EmployeeRepository();
const employeeService = new EmployeeService(employeeRepository);
const employeeController = new EmployeeController(employeeService);

router.post("/", asyncHandler(employeeController.create.bind(employeeController)));
router.get("/", asyncHandler(employeeController.getAll.bind(employeeController)));
router.get("/:id", asyncHandler(employeeController.getById.bind(employeeController)));
router.patch("/:id", asyncHandler(employeeController.update.bind(employeeController)));
router.delete("/:id", asyncHandler(employeeController.delete.bind(employeeController)));

export { router as employeeRouter };
