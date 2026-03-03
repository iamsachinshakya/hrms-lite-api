import mongoose, { Schema, Document } from "mongoose";

export interface IAttendance extends Document {
    employeeId: mongoose.Types.ObjectId;
    date: string;
    status: "Present" | "Absent";
    createdAt: Date;
    updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
    {
        employeeId: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Present", "Absent"],
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });
AttendanceSchema.index({ date: 1 });

const Attendance = mongoose.model<IAttendance>("Attendance", AttendanceSchema);

export default Attendance;
