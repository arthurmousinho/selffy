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

        const path = await this.storageService.uploadFile(request.file, user.getEmail());
        const avatarUrl = await this.storageService.getFileURL(path || '');

        user.setAvatarUrl(avatarUrl);
        user.update()

        await this.userRepository.update(user);

        return avatarUrl;
    }

}