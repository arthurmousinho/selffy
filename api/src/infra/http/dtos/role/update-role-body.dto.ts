import { UserType } from "@prisma/client";
import { ArrayNotEmpty, IsEnum, IsNotEmpty, IsUUID } from "class-validator";

export class UpdateRoleBody {

    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    key: string;
    
    @IsNotEmpty()
    @ArrayNotEmpty()
    @IsEnum(UserType, { each: true })
    userTypes: UserType[];

}