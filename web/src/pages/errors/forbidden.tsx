import { OrbitingIconsBackground } from "@/components/magicui/orbiting-circles";
import logo from "../../assets/brand/logo.svg";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export function Forbidden() {
    return (
        <OrbitingIconsBackground>
            <main className="flex flex-col gap-4 items-start justify-center min-h-screen">
                <img src={logo} alt="Selffy" className="w-[100px]" />
                <h1 className="text-3xl font-bold">
                    Access Denied
                </h1>
                <span className="text-base text-muted-foreground">
                    You do not have permission to view this page.
                </span>
                <footer className="flex justify-start">
                    <Link to={'/'} className="flex items-center gap-2 text-sm text-primary hover:underline underline-offset-2">
                        <ChevronLeft size={20} />
                        Go back home
                    </Link>
                </footer>
            </main>
        </OrbitingIconsBackground>
    );
}