import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { UserRole } from './use-user';

export interface TokenProps {
    sub: string;
    email: string;
    role: UserRole;
    iat: number;
    exp: number;
}

const cookieKey = 'selffy_token';

export function getToken() {
    return Cookies.get(cookieKey);
}

export function saveToken(token: string) {
    const decodedToken = jwtDecode<TokenProps>(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    Cookies.set(
        cookieKey,
        token,
        { expires: expirationDate }
    );
}

export function hasToken() {
    return Boolean(Cookies.get(cookieKey));
}

export function decodeToken() {
    const token = Cookies.get(cookieKey);
    if (!token) return null;

    const decodedToken = jwtDecode<TokenProps>(token);
    return decodedToken;
}

export function removeToken() {
    Cookies.remove(cookieKey);
}

export function hasRole(role: UserRole) {
    const decodedToken = decodeToken();
    if (!decodedToken) return false;
    return decodedToken.role === role;
}

export function hasTokenExpired() {
    const decodedToken = decodeToken();
    if (!decodedToken) return true;
    const expirationDate = new Date(decodedToken.exp * 1000);
    return expirationDate < new Date();
}