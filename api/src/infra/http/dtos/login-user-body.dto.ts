import { IsEmail, IsNotEmpty, IsUUID, Length } from "class-validator";

export class LoginUserBody {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

}