import Employee from "@/api/v1/modules/employees/models/employee.model";
import Attendance from "@/api/v1/modules/attendance/models/attendance.model";

export class StatsService {
    async getSummary() {
        const today = new Date().toISOString().split("T")[0];

        const [
            totalEmployees,
            departments,
            todayPresent,
            todayAbsent,
            allTimePresent,
            allTimeAbsent
        ] = await Promise.all([
            Employee.countDocuments(),
            Employee.distinct("department"),
            Attendance.countDocuments({ date: today, status: "Present" }),
            Attendance.countDocuments({ date: today, status: "Absent" }),
            Attendance.countDocuments({ status: "Present" }),
            Attendance.countDocuments({ status: "Absent" })
        ]);

        return {
            totalEmployees,
            totalDepartments: departments.length,
            todayPresent,
            todayAbsent,
            allTimePresent,
            allTimeAbsent
        };
    }

    async getPresentDays() {
        const stats = await Attendance.aggregate([
            {
                $group: {
                    _id: "$employeeId",
                    presentDays: {
                        $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] }
                    },
                    totalRecords: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "employees",
                    localField: "_id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            { $unwind: "$employee" },
            {
                $project: {
                    _id: 0,
                    employeeId: "$employee.employeeId",
                    presentDays: 1,
                    totalRecords: 1,
                    rate: {
                        $round: [{ $multiply: [{ $divide: ["$presentDays", "$totalRecords"] }, 100] }, 0]
                    }
                }
            }
        ]);

        return stats;
    }
}
