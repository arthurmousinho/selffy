import { ProjectStatus } from "@prisma/client";
import { ArrayNotEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class UpdateProjectBody {

    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    revenue: number

    @IsNotEmpty()
    @IsString()
    icon: string

    @IsNotEmpty()
    @IsString()
    color: string

    @IsNotEmpty()
    @IsUUID()
    ownerId: string;

    @IsNotEmpty()
    @IsEnum(ProjectStatus, { each: true })
    status: ProjectStatus;

}