import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Outlet } from "react-router-dom";

export function AdminLayout() {
    return (
        <main className="flex flex-col h-screen">
            <AdminHeader />
            <div className="flex flex-row flex-1 overflow-hidden">
                <AdminSidebar />
                <div className="flex-1 overflow-auto p-6 bg-slate-50">
                    <Outlet />
                </div>
            </div>
        </main>
    );
}