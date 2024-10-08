import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateCostBody {

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsNumber()
    value: number

}