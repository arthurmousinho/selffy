import { AIModelService } from '@domain/services/ai-model.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { OLLMA_MODEL_API_URL } from './ollama-client';

interface GenerateDescriptionRequest {
    taskTitle: string;
    projectDescription: string;
}

interface GenerateDescriptionResponse {
    response: string;
}

@Injectable()
export class OllamaAIModelService implements AIModelService {
    
    constructor(private httpService: HttpService) { }

    public generateDescription(request: GenerateDescriptionRequest): 
    Observable<AxiosResponse<GenerateDescriptionResponse>> {
        return this.httpService.post(
            `${OLLMA_MODEL_API_URL}/generate-task-description`, 
            { ...request }
        );
    }

}