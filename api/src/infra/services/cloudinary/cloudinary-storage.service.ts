import { Injectable } from '@nestjs/common';
import { StorageService } from '@domain/services/storage.service';
import { cloudinaryClient } from './cloudinary-client';

@Injectable()
export class CloudinaryStorageService implements StorageService {

    public async uploadFile(file: Express.Multer.File, userId: string): Promise<string> {
        return new Promise((resolve, reject) => {
            cloudinaryClient.uploader.upload_stream(
                { 
                    folder: '',
                    filename_override: `${userId}`,
                    unique_filename: true
                },
                (error, result) => {
                    if (error || !result) {
                        console.log(error);
                        return reject(`Erro ao fazer upload`);
                    }
                    resolve(result.secure_url); 
                },
            ).end(file.buffer); 
        });
    }

    public async getPublicUrl(path: string): Promise<string> {
        return cloudinaryClient.url(path, { secure: true });
    }

    public async getSignedUrl(path: string): Promise<string> {
        const options = {
            secure: true,
            expires_at: Math.floor(Date.now() / 1000) + 3600, // Expira em 1 hora
        };

        return cloudinaryClient.utils.private_download_url(path, '', options);
    }

    public async deleteFile(path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            cloudinaryClient.uploader.destroy(path, (error, result) => {
                if (error) {
                    return reject(`Erro ao excluir o arquivo: ${error.message}`);
                }
                if (result.result !== 'ok') {
                    return reject(`Erro ao excluir: ${result.result}`);
                }
                resolve();
            });
        });
    }

}