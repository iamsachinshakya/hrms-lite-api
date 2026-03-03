import { IEmployeeEntity } from "@/api/v1/modules/employees/models/employee.entity";

declare global {
    namespace Express {
        interface Request {
            user?: IEmployeeEntity;
            file?: Express.Multer.File;   // for avatar / icon uploads
            files?: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[]; // for multiple files
        }
    }
}
