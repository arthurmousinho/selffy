import { AIModelService, GenerateDescriptionRequest } from "@domain/services/ai-model.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GenerateTaskDescriptionUseCase {

    constructor(
        private aiModelService: AIModelService
    ) { }

    public async execute(request: GenerateDescriptionRequest): Promise<string> {
        return new Promise((resolve) => {
            this.aiModelService
                .generateDescription(request)
                .subscribe((res) => {
                    resolve(res.data.response);
                });
        });
    }

}