import { UserRepository } from "@domain/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { subDays, subWeeks, subMonths } from 'date-fns';


@Injectable()
export class GetUserGrowthUseCase {

    constructor(
        private userRepository: UserRepository
    ) { }

    public async execute(type: 'MONTHLY' | 'WEEKLY' | 'DAILY'): Promise<number> {
        let dateFrom: Date;

        switch (type) {
            case 'DAILY':
                dateFrom = subDays(new Date(), 1);
                break;
            case 'WEEKLY':
                dateFrom = subWeeks(new Date(), 1);
                break;
            case 'MONTHLY':
                dateFrom = subMonths(new Date(), 1);
                break;
            default:
                throw new Error('Invalid type provided');
        }

       const usersCreatedInPeriod = await this.userRepository.countUsersCreatedAfter(dateFrom);
       return usersCreatedInPeriod;
      
    }

}