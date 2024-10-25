import { Header } from "@/components/home/header";
import { Hero } from "../../components/home/hero";


export function Home() {
    return (
        <main className="w-screen h-screen flex items-center flex-col gap-10 justify-start bg-slate-50 overflow-x-hidden pb-20">
            <Header />
            <Hero />
        </main>
    )
}