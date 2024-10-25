
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import AnimatedGradientText from "../ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import img from "../../assets/home/screenshot-hero.png"

export function Hero() {
    return (
        <section className="flex items-center justify-center w-[1200px] flex-col gap-10">
            <header className="max-w-[65%] flex items-center justify-center flex-col gap-8">
                <AnimatedGradientText>
                    🚧 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                    <span
                        className={cn(
                            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                        )}
                    >
                        under development
                    </span>
                    <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedGradientText>
                <h1 className="text-6xl font-extrabold text-center">
                    Manage all your freelance projets by yourself
                </h1>
                <p className="text-xl text-muted-foreground text-center w-[90%]">
                    Streamline your workflow, stay organized, and efficiently track your progress, ensuring you never miss a deadline
                </p>
                <footer className="flex items-center w-full justify-center gap-4">
                    <Button className="flex items-center gap-2">
                        Get Started for Free
                    </Button>
                    <Button className="flex items-center gap-2 border-primary text-primary" variant={'outline'}>
                        Repository
                        <GitHubLogoIcon fontSize={20} />
                    </Button>
                </footer>
            </header>
            <img 
                src={img}
            />
        </section>
    )
}