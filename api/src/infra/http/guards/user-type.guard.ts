import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '@application/entities/user/user.entity';
import { UnauthorizedUserError } from '@application/errors/user/unauthorized-user.error';

@Injectable()
export class UserTypeGuard implements CanActivate {
    private type: UserType;

    constructor(
        type: UserType
    ) {
        this.type = type;
    }

    public canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedUserError();
        }

        const decoded = this.decodeToken(token);
        if (!decoded || decoded.type !== this.type) {
            throw new UnauthorizedUserError();
        }

        return true;
    }

    private extractTokenFromHeader(request: any): string | null {
        const token = request.headers.authorization;
        return token && token.startsWith('Bearer ') ? token.split(' ')[1] : null;
    }

    private decodeToken(token: string): any {
        const jwtService = new JwtService();
        return jwtService.decode(token);
    }

}