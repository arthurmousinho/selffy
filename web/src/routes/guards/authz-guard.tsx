import { decodeToken, hasToken, hasTokenExpired } from "@/hooks/use-token";
import { UserType } from "@/hooks/use-user";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthzGuardProps {
    userType: UserType;
    children: ReactNode;
}

export function AuthzGuard(props: AuthzGuardProps) {
    if (
        hasToken() && 
        !hasTokenExpired() && 
        decodeToken()?.type === props.userType
    ) {
        return props.children;
    } else {
        return <Navigate to={'/forbidden'} replace={true} />;
    }
}