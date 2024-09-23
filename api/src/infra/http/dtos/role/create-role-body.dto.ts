import { UserType } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateRoleBody {

    @IsNotEmpty()
    key: string;

    @IsNotEmpty()
    @IsEnum(UserType, { each: true })
    userTypes: UserType[];

}