import { Role } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsEnum } from "class-validator";

export class UpdateUserBody {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsEnum(Role, { each: true })
    role: Role;

}