import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedUserError } from '@application/errors/user/unauthorized-user.error';
import { Role } from 'src/domain/entities/user/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
    private role: Role;

    constructor(
        role: Role
    ) {
        this.role = role;
    }

    public canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedUserError();
        }

        const decoded = this.decodeToken(token);
        if (!decoded || decoded.role !== this.role) {
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