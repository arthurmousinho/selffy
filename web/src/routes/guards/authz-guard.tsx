import { hasRoleKey } from "@/hooks/use-token";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthzGuardProps {
    roleKey: string;
    children: ReactNode;
}

export function AuthzGuard(props: AuthzGuardProps) {
    if (hasRoleKey(props.roleKey)) {
        return props.children;
    } else {
        return <Navigate to={'/forbidden'} replace={true} />;
    }
}