import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class UpdateCostBody {

    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsNumber()
    value: number

    @IsNotEmpty()
    @IsUUID()
    projectId: string;

}