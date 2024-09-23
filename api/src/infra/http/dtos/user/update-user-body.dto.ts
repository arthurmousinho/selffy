import { IsEmail, IsNotEmpty, IsUUID } from "class-validator";

export class UpdateUserBody {

    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

}