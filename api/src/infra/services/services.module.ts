import { AIModelService } from '@domain/services/ai-model.service';
import { Global, Module } from '@nestjs/common';
import { OllamaAIModelService } from './ollama/ollama-ai-model.service';
import { StorageService } from '@domain/services/storage.service';
import { HttpModule } from '@nestjs/axios';
import { CloudinaryStorageService } from './cloudinary/cloudinary-storage.service';

@Global()
@Module({
    imports: [HttpModule],
    providers: [
        { provide: AIModelService, useClass: OllamaAIModelService },
        { provide: StorageService, useClass: CloudinaryStorageService }
    ],
    exports: [
        AIModelService,
        StorageService
    ],
})

export class ServicesModule { }