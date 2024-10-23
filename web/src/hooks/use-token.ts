import Cookies from 'js-cookie';
import { UserType } from './use-user';
import { jwtDecode } from 'jwt-decode';

export interface TokenProps {
    sub: string;
    email: string;
    type: UserType;
    roles: string[];
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

export function hasRoleKey(roleKey: string) {
    const decodedToken = decodeToken();
    const roles = decodedToken?.roles || [];
    return roles.some(key => key === roleKey);
}

export function hasTokenExpired() {
    const decodedToken = decodeToken();
    if (!decodedToken) return true;
    const expirationDate = new Date(decodedToken.exp * 1000);
    return expirationDate < new Date();
}