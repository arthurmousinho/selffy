import { UserType } from "@prisma/client";
import { ArrayNotEmpty, IsEmail, IsEnum, IsNotEmpty } from "class-validator";

export class SignUpUserBody {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEnum(UserType, { each: true })
    type: UserType;

}