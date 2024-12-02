export abstract class StorageService {
   abstract uploadFile(file: Express.Multer.File, userEmail: string): Promise<string>;
   abstract getFileURL(path: string): Promise<string>;
   abstract deleteFile(path: string): Promise<void>;
}