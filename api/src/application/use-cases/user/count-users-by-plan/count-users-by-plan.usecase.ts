import { PlanType } from "@application/entities/user/user.entity";
import { UserRepository } from "@application/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CountUsersByPlanUseCase {

    constructor(
        private userRepository: UserRepository
    ){}

    public async execute(plan: PlanType) {
        return this.userRepository.countByPlan(plan)
    }

}