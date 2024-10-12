import { TaskPriority, TaskStatus } from "@prisma/client";
import { IsDateString, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateTaskBody {

    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;

    @IsDateString()
    dueDate: Date;

    @IsNotEmpty()
    @IsEnum(TaskPriority)
    priority: TaskPriority;

    @IsNotEmpty()
    @IsUUID()
    projectId: string;

}