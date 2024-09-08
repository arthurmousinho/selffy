import { Header } from "@/components/global/header";
import { Sidebar } from "@/components/global/sidebar";
import { Outlet } from "react-router-dom";

export function BaseLayout() {
    return (
        <main className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-row flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 overflow-auto p-4">
                    <Outlet />
                </div>
            </div>
        </main>
    );
}