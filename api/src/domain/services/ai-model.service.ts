import { AxiosResponse } from "axios";
import { Observable } from "rxjs";

interface GenerateDescriptionRequest {
    taskTitle: string;
    projectDescription: string;
}

interface GenerateDescriptionResponse {
    response: string;
}

export abstract class AIModelService {
    abstract generateDescription(request: GenerateDescriptionRequest):
        Observable<AxiosResponse<GenerateDescriptionResponse>>;
}