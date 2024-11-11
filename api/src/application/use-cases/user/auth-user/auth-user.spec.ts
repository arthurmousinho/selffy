import { UserRepository } from '@domain/repositories/user.repository';
import { AuthUserUseCase } from './auth-user.usecase';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserNotFoundError } from '@application/errors/user/user-not-found.error';
import { makeUser } from '@test/factories/user.factory';
import { InvalidUserCredentialsError } from '@application/errors/user/invalid-user-credentials.error';

describe('AuthUserUseCase', () => {

    let authUserUseCase: AuthUserUseCase;
    let userRepository: UserRepository;
    let jwtService: JwtService;

    beforeEach(() => {
        userRepository = {
            findByEmail: jest.fn(),
        } as any; 

        jwtService = {
            sign: jest.fn(),
        } as any;

        authUserUseCase = new AuthUserUseCase(userRepository, jwtService);
    });

    it('should throw an error if the user is not found', async () => {
        (userRepository.findByEmail as jest.Mock).mockResolvedValueOnce(null);

        await expect(
            authUserUseCase.execute({ email: 'test@example.com', password: 'password' })
        ).rejects.toThrow(UserNotFoundError);
    });

    it('should throw an error if the password does not match', async () => {
        const user = makeUser(); 
        (userRepository.findByEmail as jest.Mock).mockResolvedValueOnce(user);
        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false); 

        await expect(
            authUserUseCase.execute({ email: user.getEmail(), password: 'wrongPassword' })
        ).rejects.toThrow(InvalidUserCredentialsError);
    });

    it('should return a token if the email and password are correct', async () => {
        const user = makeUser(); 
        (userRepository.findByEmail as jest.Mock).mockResolvedValueOnce(user);
        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true); 
        (jwtService.sign as jest.Mock).mockReturnValue('valid-token');

        const token = await authUserUseCase.execute({
            email: user.getEmail(),
            password: user.getPassword(),
        });

        expect(token).toBe('valid-token');
        expect(jwtService.sign).toHaveBeenCalledWith(
            { 
                sub: user.getId(), 
                email: user.getEmail(), 
                role: user.getRole()
            },
            { 
                secret: process.env.JWT_SECRET, 
                expiresIn: '1d' 
            },
        );
    });

});