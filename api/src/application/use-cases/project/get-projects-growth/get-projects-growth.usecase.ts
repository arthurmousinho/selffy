import { ProjectRepository } from "@domain/repositories/project.repository";
import { Injectable } from "@nestjs/common";
import { subDays, subWeeks, subMonths } from 'date-fns';


@Injectable()
export class GetProjectsGrowthUseCase {

    constructor(
        private projectRepository: ProjectRepository
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

       const projectsCreatedInPeriod = await this.projectRepository.countProjectsCreatedAfter(dateFrom);
       return projectsCreatedInPeriod;
    }

}