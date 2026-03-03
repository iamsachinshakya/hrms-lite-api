import { Router } from "express";
import { AttendanceController } from "@/api/v1/modules/attendance/controllers/attendance.controller";
import { AttendanceService } from "@/api/v1/modules/attendance/services/attendance.service";
import { AttendanceRepository } from "@/api/v1/modules/attendance/repositories/attendance.repository";
import { asyncHandler } from "@/api/v1/modules/common/utils/asyncHandler";

const router = Router();

const attendanceRepository = new AttendanceRepository();
const attendanceService = new AttendanceService(attendanceRepository);
const attendanceController = new AttendanceController(attendanceService);

router.post("/", asyncHandler(attendanceController.mark.bind(attendanceController)));
router.get("/:id", asyncHandler(attendanceController.getById.bind(attendanceController)));
router.patch("/:id", asyncHandler(attendanceController.update.bind(attendanceController)));
router.get("/employee/:employeeId", asyncHandler(attendanceController.getEmployeeAttendance.bind(attendanceController)));

export { router as attendanceRouter };
