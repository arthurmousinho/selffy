import {
    Injectable,
    CanActivate,
    ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedUserError } from '@application/errors/user/unauthorized-user.error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {

    constructor(private jwtService: JwtService) {
        super();
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedUserError();
        }

        try {
            this.jwtService.verify(
                token,
                {
                    secret: process.env.JWT_SECRET,
                }
            );  
            return true; 
        } catch (error) {
            throw new UnauthorizedUserError(); 
        }
    }

    private extractTokenFromHeader(request: any): string | null {
        const token = request.headers.authorization;
        return token && token.startsWith('Bearer ') ? token.split(' ')[1] : null;
    }

}
