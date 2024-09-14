import { OrbitingIconsBackground } from "@/components/magicui/orbiting-circles";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <OrbitingIconsBackground>
            <Outlet />
        </OrbitingIconsBackground>
    );
}