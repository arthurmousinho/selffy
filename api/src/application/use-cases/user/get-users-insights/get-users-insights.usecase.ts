import { Injectable } from "@nestjs/common";
import { CountUsersUseCase } from "../count-users/count-users.usecase";
import { CountUsersByPlanUseCase } from "../count-users-by-plan/count-users-by-plan.usecase";
import { CountUsersByTypeUseCase } from "../count-users-by-type/count-users-by-type.usecase";
import { GetUserGrowthUseCase } from "../get-user-growth/get-user-growth.usecase";

export interface UsersInsights {
    total: number;
    free: number;
    premium: number;
    admin: number;
    default: number;
    monthlyGrowth: number;
}

@Injectable()
export class GetUsersInsightsUseCase {

    constructor(
        private countUsersUseCase: CountUsersUseCase,
        private countUsersByPlanUseCase: CountUsersByPlanUseCase,
        private countUsersByTypeUseCase: CountUsersByTypeUseCase,
        private getUserGrowthUseCase: GetUserGrowthUseCase,
    ) { }

    public async execute(): Promise<UsersInsights> {
        const [
            usersCount,
            freeUsersCount,
            premiumUsersCount,
            adminUsersCount,
            defaultUsersCount,
            usersGrowth
        ] = await Promise.all([
            this.countUsersUseCase.execute(),
            this.countUsersByPlanUseCase.execute('FREE'),
            this.countUsersByPlanUseCase.execute('PREMIUM'),
            this.countUsersByTypeUseCase.execute('ADMIN'),
            this.countUsersByTypeUseCase.execute('DEFAULT'),
            this.getUserGrowthUseCase.execute('MONTHLY'),
        ])

        return {
            total: usersCount,
            free: freeUsersCount,
            premium: premiumUsersCount,
            admin: adminUsersCount,
            default: defaultUsersCount,
            monthlyGrowth: usersGrowth
        }
    }

}