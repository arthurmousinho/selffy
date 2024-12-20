export abstract class StorageService {
   abstract uploadFile(file: Express.Multer.File, userId: string): Promise<string>;
   abstract getPublicUrl(path: string): Promise<string>;
   abstract getSignedUrl(path: string): Promise<string>;
   abstract deleteFile(path: string): Promise<void>;
}