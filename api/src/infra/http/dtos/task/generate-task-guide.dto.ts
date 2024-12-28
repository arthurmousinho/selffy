import { IsNotEmpty, IsString } from "class-validator";

export class GenerateTaskGuideBody {

    @IsNotEmpty()
    @IsString()
    taskTitle: string;

    @IsNotEmpty()
    @IsString()
    taskDescription: string;

    @IsNotEmpty()
    @IsString()
    projectDescription: string;

}