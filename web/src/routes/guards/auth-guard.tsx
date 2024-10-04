import { hasToken, hasTokenExpired } from "@/hooks/use-token";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
    children: ReactNode;
}

export function AuthGuard(props: AuthGuardProps) {
    if (
        hasToken() && 
        !hasTokenExpired()
    ) {
        return props.children;
    } else {
        return <Navigate to={'/forbidden'} replace={true} />
    }
}