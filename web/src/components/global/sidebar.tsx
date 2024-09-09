import { Card, CardContent } from "../ui/card";
import {
    Bell,
    Folder,
    Home,
    LogOut,
    Settings,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { NavLink } from "react-router-dom";

const sidebarLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <Home size={20} className="text-black" /> },
    { to: '/projects', label: 'Projects', icon: <Folder size={20} className="text-black" /> },
    { to: '/notifications', label: 'Notifications', icon: <Bell size={20} className="text-black" /> },
    { to: '/settings', label: 'Settings', icon: <Settings size={20} className="text-black" /> },
    { to: '/auth/signin', label: 'Exit', icon: <LogOut size={20} className="text-black" /> },
];

export function Sidebar() {
    return (
        <Card className="h-screen rounded-none min-w-[20%] border-t-0">
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
                <Separator orientation="horizontal" />
                <div className="px-3">
                    <span className="text-sm text-muted-foreground font-medium uppercase">
                        Pinned Projects
                    </span>
                </div>

                <Button className="h-12 px-3 w-full flex items-center justify-start gap-4" variant={'ghost'}>
                    <div className="w-10 h-10 bg-green-300 flex items-center justify-center rounded-xl">
                        <span className="text-xl">💬</span>
                    </div>
                    <h2>
                        MyChaty
                    </h2>
                </Button>
                <Button className="h-12 px-3 w-full flex items-center justify-start gap-4" variant={'ghost'}>
                    <div className="w-10 h-10 bg-pink-300 flex items-center justify-center rounded-xl">
                        <span className="text-xl">💊</span>
                    </div>
                    <h2>
                        ExamChecker
                    </h2>
                </Button>
                <Button className="h-12 px-3 w-full flex items-center justify-start gap-4" variant={'ghost'}>
                    <div className="w-10 h-10 bg-blue-300 flex items-center justify-center rounded-xl">
                        <span className="text-xl">📚</span>
                    </div>
                    <h2>
                        DevBooks
                    </h2>
                </Button>
                <Button className="h-12 px-3 w-full flex items-center justify-start gap-4" variant={'ghost'}>
                    <div className="w-10 h-10 bg-rose-300 flex items-center justify-center rounded-xl">
                        <span className="text-xl">🤑</span>
                    </div>
                    <h2>
                        Boleto Fácil
                    </h2>
                </Button>
            </CardContent>
        </Card>
    )
}