import { IsEmail, IsNotEmpty, IsUUID, IsEnum } from "class-validator";
import { PlanType, UserType } from "@prisma/client";

export class UpdateUserBody {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsEnum(UserType, { each: true })
    type: UserType;

    @IsNotEmpty()
    @IsEnum(PlanType, { each: true })
    plan: PlanType

}