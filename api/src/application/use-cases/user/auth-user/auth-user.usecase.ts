import { InvalidUserCredentialsError } from "@application/errors/user/invalid-user-credentials.error";
import { UserNotFoundError } from "@application/errors/user/user-not-found.error";
import { UserRepository } from "@domain/repositories/user.repository";
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from "@nestjs/common";

interface AuthUserUseCaseRequest {
    email: string;
    password: string;
}

@Injectable()
export class AuthUserUseCase {

    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    public async execute(request: AuthUserUseCaseRequest): Promise<string> {
        const { email, password } = request;

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new UserNotFoundError();
        }

        const passwordMatched = await bcrypt.compare(password, user.getPassword());
        if (!passwordMatched) {
            throw new InvalidUserCredentialsError();
        }

        const token = this.jwtService.sign(
            {
                sub: user.getId(),
                email: user.getEmail(),
                name: user.getName(),
                role: user.getRole(),
                avatarUrl: user.getAvatarUrl()
            },
            {
                secret: process.env.JWT_SECRET,
                expiresIn: '1d'
            }
        );

        return token;
    }

}