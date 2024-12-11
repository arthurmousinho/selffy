import { StorageService } from "@domain/services/storage.service";

export class InMemoryStorageService implements StorageService {

    public async uploadFile(file: Express.Multer.File, userEmail: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public async getFileURL(path: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public async deleteFile(path: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}