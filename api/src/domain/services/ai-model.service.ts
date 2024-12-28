import { AxiosResponse } from "axios";
import { Observable } from "rxjs";

export interface AIModelDefaultReponse {
    response: string;
}

export interface GenerateDescriptionRequest {
    taskTitle: string;
    projectDescription: string;
}

export interface GenerateTaskGuideRequest {
    taskTitle: string;
    taskDescription: string;
    projectDescription: string;
}

export abstract class AIModelService {
    abstract generateDescription(request: GenerateDescriptionRequest):Observable<AxiosResponse<AIModelDefaultReponse>>;
    abstract generateTaskGuide(request: GenerateTaskGuideRequest):Observable<AxiosResponse<AIModelDefaultReponse>>;
}