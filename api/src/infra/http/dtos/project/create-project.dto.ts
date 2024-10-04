import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateProjectBody {

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

}