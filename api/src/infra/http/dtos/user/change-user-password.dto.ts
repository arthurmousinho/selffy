import { IsNotEmpty } from "class-validator";

export class ChangeUserPasswordBody {

    @IsNotEmpty()
    currentPassword: string;

    @IsNotEmpty()
    newPassword: string;

}