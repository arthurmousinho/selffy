import { hasToken } from "@/hooks/use-token";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
    children: ReactNode;
}

export function AuthGuard(props: AuthGuardProps) {
    if (!hasToken()) {
        return <Navigate to={'/forbidden'} replace={true} />
    } else {
        return props.children;
    }
}