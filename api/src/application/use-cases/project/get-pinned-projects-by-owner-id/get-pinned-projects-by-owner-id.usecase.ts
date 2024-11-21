import { Injectable } from "@nestjs/common";
import { FindProjectsByOwnerIdUseCase } from "../find-projects-by-owner-id/find-projects-by-owner-id.usecase";

interface GetPinnedProjectsByOwnerIdUseCaseProps {
    ownerId: string;
    requestUserId: string;
}

@Injectable()
export class GetPinnedProjectsByOwnerIdUseCase {

    constructor(
        private findProjectsByOwnerIdUseCase: FindProjectsByOwnerIdUseCase
    ) { }

    public async execute(request: GetPinnedProjectsByOwnerIdUseCaseProps) {
        const projects = await this.findProjectsByOwnerIdUseCase.execute(request);
        return projects.filter(project => project.getIsPinned() === true);
    }

}