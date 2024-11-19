import { CheckCheck, FolderOpen, HandCoins, Home, LayoutGrid, LogOut, Settings, UsersRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Card, CardContent } from "../ui/card";

const sidebarLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: <Home size={20} className="text-black" /> },
    { to: '/app/dashboard', label: 'Application', icon: <LayoutGrid size={20} className="text-black" /> },
    { to: '/admin/users', label: 'Users', icon: <UsersRound size={20} className="text-black" /> },
    { to: '/admin/projects', label: 'Projects', icon: <FolderOpen size={20} className="text-black" /> },
    { to: '/admin/costs', label: 'Costs', icon: <HandCoins size={20} className="text-black" /> },
    { to: '/admin/tasks', label: 'Tasks', icon: <CheckCheck size={20} className="text-black" /> },
    { to: '/admin/settings', label: 'Settings', icon: <Settings size={20} className="text-black" /> },
    { to: '/auth/signin', label: 'Exit', icon: <LogOut size={20} className="text-black" /> },
];

interface AdminSidebarProps {
    isSidebarOpen: boolean;
}

export function AdminSidebar(props: AdminSidebarProps) {
    return (
        <Card className={`
            h-screen rounded-none min-w-[20%] border-t-0
            ${props.isSidebarOpen && 'hidden'}
        `}>
            <CardContent className="pt-4 px-2 flex flex-col gap-2">
                {
                    sidebarLinks.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.to}
                            className={({ isActive }) =>
                                `h-12 px-3 w-full flex items-center justify-start gap-4 rounded-xl 
                                ${isActive ? 'bg-slate-100' : 'hover:bg-slate-100'}`
                            }
                        >
                            <div className="w-10 h-10 flex border items-center justify-center rounded-xl">
                                <span className="text-sm">
                                    {link.icon}
                                </span>
                            </div>
                            <h2>{link.label}</h2>
                        </NavLink>
                    ))
                }
            </CardContent>
        </Card>
    )
}