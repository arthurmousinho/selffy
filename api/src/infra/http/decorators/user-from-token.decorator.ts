import { UnauthorizedUserError } from '@application/errors/user/unauthorized-user.error';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface UserFromToken {
    id: string;
    role: string;
}

export const UserFromToken = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization'];

        if (!authorizationHeader) {
            throw new UnauthorizedUserError();
        }

        const token = authorizationHeader.split(' ')[1];
        const jwtService = new JwtService();

        const decodedToken = jwtService.decode(token) as any;

        if (!decodedToken) {
            throw new UnauthorizedUserError();
        }

        return {
            id: decodedToken.sub,
            role: decodedToken.role,
        };
    },
);