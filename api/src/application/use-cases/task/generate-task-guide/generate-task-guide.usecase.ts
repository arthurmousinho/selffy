import { AIModelService, GenerateTaskGuideRequest } from "@domain/services/ai-model.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GenerateTaskGuideUseCase {
    
    constructor(
        private aiModelService: AIModelService
    ) { }

    public async execute(request: GenerateTaskGuideRequest): Promise<string> {
        return new Promise((resolve) => {
            this.aiModelService
                .generateTaskGuide(request)
                .subscribe((res) => {
                    resolve(res.data.response);
                });
        });
    }

}