import { StorageService } from '@domain/services/storage.service';
import { FindUserByIdUseCase } from '../find-user-by-id/find-user-by-id.usecase';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@domain/repositories/user.repository';

interface Request {
    file: Express.Multer.File;
    userId: string;
    requestUserId: string;
}

@Injectable()
export class UploadUserAvatarUseCase {

    constructor(
        private storageService: StorageService,
        private findUserIdUseCase: FindUserByIdUseCase,
        private userRepository: UserRepository
    ) { }

    public async execute(request: Request): Promise<string | null> {
        const [user] = await Promise.all([
            this.findUserIdUseCase.execute({
                userId: request.userId,
                requestUserId: request.requestUserId
            }),
            this.findUserIdUseCase.execute({
                userId: request.requestUserId,
                requestUserId: request.requestUserId
            }),
        ]);

        const userAvatar = user.getAvatarUrl();
        const publicId = userAvatar && this.extractPublicIdFromUrl(userAvatar);

        if (publicId) {
            await this.storageService.deleteFile(publicId);
        }

        const path = await this.storageService.uploadFile(request.file, user.getId());
        const avatarUrl = await this.storageService.getPublicUrl(path || '');

        user.setAvatarUrl(avatarUrl);
        user.update()

        await this.userRepository.update(user);

        return avatarUrl;
    }

    private extractPublicIdFromUrl(url: string): string | null {
        try {
            const parts = url.split('/');
            const fileNameWithExtension = parts[parts.length - 1];
            const [publicId] = fileNameWithExtension.split('.');
            return publicId || null;
        } catch {
            return null;
        }
    }

}