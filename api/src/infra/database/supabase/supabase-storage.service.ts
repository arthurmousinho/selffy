import { Injectable } from '@nestjs/common';
import { supabase } from '../supabase/supabase-client';
import { StorageService } from '@domain/services/storage.service';
import { UploadFileError } from '@application/errors/storage/upload-file.error';
import { DeleteFileError } from '@application/errors/storage/delete-file.error';

@Injectable()
export class SupabaseStorageService implements StorageService {

    private BUCKET = 'selffy-bucket';

    public async uploadFile(file: Express.Multer.File, userEmail: string) {
        const filePath = `${userEmail}`;

        const { data, error } = await supabase.storage
            .from(this.BUCKET)
            .upload(
                filePath,
                file.buffer,
                { upsert: true }
            );

        if (error) {
            throw new UploadFileError();
        }

        return data.path;
    }

    public async getFileURL(path: string) {
        const { data } = supabase.storage.from(this.BUCKET).getPublicUrl(path);
        return data.publicUrl;
    }

    public async deleteFile(path: string) {
        const { error } = await supabase.storage.from(this.BUCKET).remove([path]);

        if (error) {
            throw new DeleteFileError();
        }
    }

}