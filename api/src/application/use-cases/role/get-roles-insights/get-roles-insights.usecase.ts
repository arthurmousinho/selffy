import { Injectable } from "@nestjs/common";
import { CountRolesByUserTypeUseCase } from "../count-roles-by-user-type/count-roles-by-user-type.usecase";
import { CountRolesUseCase } from "../count-roles/count-roles.usecase";

export interface RolesInsights {
    total: number;
    admin: number
    default: number;
}

@Injectable()
export class GetRolesInsightsUseCase {

    constructor(
        private countRolesUseCase: CountRolesUseCase,
        private countRolesByUserTypeUseCase: CountRolesByUserTypeUseCase,
    ) { }

    public async execute(): Promise<RolesInsights> {
        const [
            rolesCount,
            adminRolesCount,
            defaultRolesCount,
        ] = await Promise.all([
            this.countRolesUseCase.execute(),
            this.countRolesByUserTypeUseCase.execute('ADMIN'),
            this.countRolesByUserTypeUseCase.execute('DEFAULT'),
        ]);

        return {
            total: rolesCount,
            admin: adminRolesCount,
            default: defaultRolesCount,
        }
    }

}