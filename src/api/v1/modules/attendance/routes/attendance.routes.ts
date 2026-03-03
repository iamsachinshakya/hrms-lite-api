import { Router } from "express";
import { AttendanceController } from "../controllers/attendance.controller";
import { AttendanceService } from "../services/attendance.service";
import { AttendanceRepository } from "../repositories/attendance.repository";
import { asyncHandler } from "../../common/utils/asyncHandler";

const router = Router();

const attendanceRepository = new AttendanceRepository();
const attendanceService = new AttendanceService(attendanceRepository);
const attendanceController = new AttendanceController(attendanceService);

router.post("/", asyncHandler(attendanceController.mark.bind(attendanceController)));
router.get("/:id", asyncHandler(attendanceController.getById.bind(attendanceController)));
router.patch("/:id", asyncHandler(attendanceController.update.bind(attendanceController)));
router.get("/employee/:employeeId", asyncHandler(attendanceController.getEmployeeAttendance.bind(attendanceController)));

export { router as attendanceRouter };
