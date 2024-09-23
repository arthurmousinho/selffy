import { UserType } from "@prisma/client";
import { ArrayNotEmpty, IsEnum, IsNotEmpty } from "class-validator";

export class CreateRoleBody {

    @IsNotEmpty()
    key: string;

    @IsNotEmpty()
    @ArrayNotEmpty()
    @IsEnum(UserType, { each: true })
    userTypes: UserType[];

}