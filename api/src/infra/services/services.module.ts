import { AIModelService } from '@domain/services/ai-model.service';
import { Global, Module } from '@nestjs/common';
import { OllamaAIModelService } from './ollama/ollama-ai-model.service';
import { StorageService } from '@domain/services/storage.service';
import { SupabaseStorageService } from './supabase/supabase-storage.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
    imports: [HttpModule],
    providers: [
        { provide: AIModelService, useClass: OllamaAIModelService },
        { provide: StorageService, useClass: SupabaseStorageService }
    ],
    exports: [
        AIModelService,
        StorageService
    ],
})

export class ServicesModule { }