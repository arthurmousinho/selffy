import { ProjectStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class FindProjectsByStatusParams {
    
    @IsNotEmpty()
    @IsEnum(ProjectStatus, { each: true })
    status: ProjectStatus;

}