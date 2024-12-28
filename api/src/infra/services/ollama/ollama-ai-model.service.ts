import { 
    AIModelDefaultReponse, 
    AIModelService, 
    GenerateDescriptionRequest, 
    GenerateTaskGuideRequest 
} from '@domain/services/ai-model.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { OLLAMA_MODEL_API_KEY, OLLAMA_MODEL_API_URL } from './ollama-client';


@Injectable()
export class OllamaAIModelService implements AIModelService {
    
    constructor(private httpService: HttpService) { }

    public generateDescription(request: GenerateDescriptionRequest):Observable<AxiosResponse<AIModelDefaultReponse>> {
        return this.httpService.post(
            `${OLLAMA_MODEL_API_URL}/generate-task-description`, 
            { ...request },
            {
                headers: {
                    'x-api-key': OLLAMA_MODEL_API_KEY
                }
            }
        );
    }

    public generateTaskGuide(request: GenerateTaskGuideRequest):Observable<AxiosResponse<AIModelDefaultReponse>> {
        return this.httpService.post(
            `${OLLAMA_MODEL_API_URL}/generate-task-guide`,
            { ...request },
            {
                headers: {
                    'x-api-key': OLLAMA_MODEL_API_KEY
                }
            }
        );
    }

}