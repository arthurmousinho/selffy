import { IsEmail, IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateUserBody {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

}