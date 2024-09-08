import { OrbitingIconsBackground } from "@/components/magicui/orbiting-circles";
import logo from "../../assets/brand/logo.svg";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <OrbitingIconsBackground>
            <main className="flex flex-col gap-4">
                <img src={logo} alt="Selffy" className="w-[100px]" />
                <h1 className="text-3xl font-bold">
                    Oops! Page not found.
                </h1>
                <span className="text-base text-muted-foreground">
                    The page you're looking for doesn't exist or has been moved.
                </span>
                <footer className="flex justify-start">
                    <Link to={'/'} className="flex items-center gap-2 pl-0 ml-0 text-sm text-primary hover:underline underline-offset-2">
                        <ChevronLeft size={20} />
                        Go back home
                    </Link>
                </footer>
            </main>
        </OrbitingIconsBackground>
    )
}