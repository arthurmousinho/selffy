import { IsNotEmpty, IsString } from "class-validator";

export class GenerateTaskDescriptionBody {

    @IsNotEmpty()
    @IsString()
    taskTitle: string;

    @IsNotEmpty()
    @IsString()
    projectDescription: string;

}