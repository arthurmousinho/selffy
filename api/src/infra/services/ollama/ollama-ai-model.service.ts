import { AIModelService } from '@domain/services/ai-model.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

interface GenerateDescriptionRequest {
    taskTitle: string;
    projectDescription: string;
}

interface GenerateDescriptionResponse {
    response: string;
}

@Injectable()
export class OllamaAIModelService implements AIModelService {

    private AI_MODEL_API_URL = process.env.AI_MODEL_API_URL || '';

    constructor(private httpService: HttpService) { }

    public generateDescription(request: GenerateDescriptionRequest): 
    Observable<AxiosResponse<GenerateDescriptionResponse>> {
        return this.httpService.post(
            `${this.AI_MODEL_API_URL}/generate-task-description`, 
            { ...request }
        );
    }

}