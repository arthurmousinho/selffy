import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export function AdminLayout() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <main className="flex flex-col h-screen">
            <AdminHeader 
                onToggleSidebar={toggleSidebar} 
                isSidebarOpen={isSidebarOpen}
            />
            <div className="flex flex-row flex-1 overflow-hidden">
                <AdminSidebar isSidebarOpen={isSidebarOpen} />
                <div className="flex-1 overflow-auto p-6 bg-slate-50">
                    <Outlet />
                </div>
            </div>
        </main>
    );
}