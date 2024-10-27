import { decodeToken, hasToken, hasTokenExpired } from "@/hooks/use-token";
import { UserRole } from "@/hooks/use-user";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthzGuardProps {
    roles: UserRole[];
    children: ReactNode;
    redirectPath?: string;
}

export function AuthzGuard({ roles, children, redirectPath = '/forbidden' }: AuthzGuardProps) {
    const isAuthenticated = hasToken() && !hasTokenExpired();
    const decodedToken = decodeToken();
    const hasPermission = decodedToken && roles.includes(decodedToken.role);

    const canAccess = isAuthenticated && hasPermission;

    if (canAccess) {
        return children;
    }

    return <Navigate to={redirectPath} replace />;
}
