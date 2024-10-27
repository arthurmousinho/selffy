import { Injectable } from "@nestjs/common";
import { CountUsersUseCase } from "../count-users/count-users.usecase";
import { GetUserGrowthUseCase } from "../get-user-growth/get-user-growth.usecase";

export interface UsersInsights {
    total: number;
    monthlyGrowth: number;
}

@Injectable()
export class GetUsersInsightsUseCase {

    constructor(
        private countUsersUseCase: CountUsersUseCase,
        private getUserGrowthUseCase: GetUserGrowthUseCase,
    ) { }

    public async execute(): Promise<UsersInsights> {
        const [
            usersCount,
            usersGrowth
        ] = await Promise.all([
            this.countUsersUseCase.execute(),
            this.getUserGrowthUseCase.execute('MONTHLY'),
        ])

        return {
            total: usersCount,
            monthlyGrowth: usersGrowth
        }
    }

}