import { Header } from "@/components/global/header";
import { Sidebar } from "@/components/global/sidebar";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <main className="flex flex-col items-start ">
            <Header />
            <main className="flex flex-row w-full">
                <Sidebar />
                <div className="w-full p-4">
                    <Outlet />
                </div>
            </main>
        </main>
    )
}