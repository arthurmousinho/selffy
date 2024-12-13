import { AIModelService } from "@domain/services/ai-model.service";
import { Injectable } from "@nestjs/common";

interface Request {
    taskTitle: string;
    projectDescription: string;
}

@Injectable()
export class GenerateTaskDescriptionUseCase {

    constructor(
        private aiModelService: AIModelService
    ) { }

    public async execute(request: Request): Promise<string> {
        return new Promise((resolve) => {
            this.aiModelService
                .generateDescription(request)
                .subscribe((res) => {
                    resolve(res.data.response);
                });
        });
    }

}