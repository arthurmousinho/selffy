import { Header } from "@/components/home/header";
import { Hero } from "../../components/home/hero";
import { Features } from "@/components/home/features";
import { Pricing } from "@/components/home/pricing";


export function Home() {
    return (
        <main className="w-screen h-screen flex items-center flex-col gap-12 justify-start bg-slate-50 overflow-x-hidden pb-20">
            <Header />
            <Hero />
            <Features />
            <Pricing />
        </main>
    )
}