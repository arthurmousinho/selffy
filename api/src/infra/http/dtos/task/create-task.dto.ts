import { TaskPriority } from "@prisma/client";
import { IsDateString, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateTaskBody {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsDateString()
    dueDate: Date;

    @IsNotEmpty()
    @IsEnum(TaskPriority)
    priority: TaskPriority;

    @IsNotEmpty()
    @IsUUID()
    projectId: string;

}