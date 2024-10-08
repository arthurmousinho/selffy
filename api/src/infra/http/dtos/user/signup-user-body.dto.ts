import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { PlanType, UserType } from "@prisma/client";

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

    @IsNotEmpty()
    @IsEnum(PlanType, { each: true })
    plan: PlanType

}