import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";

export class SignUpUserBody {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEnum(Role, { each: true })
    role: Role;

}