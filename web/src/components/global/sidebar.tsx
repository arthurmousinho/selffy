import { Card, CardContent } from "../ui/card";
import {
    Bell,
    Folder,
    Home,
    LogOut,
    Settings,
    Star,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { NavLink } from "react-router-dom";
import { ProjectPin } from "../projects/project-pin";

const sidebarLinks = [
    { to: '/app/dashboard', label: 'Dashboard', icon: <Home size={20} className="text-black" /> },
    { to: '/app/projects', label: 'Projects', icon: <Folder size={20} className="text-black" /> },
    { to: '/app/priorities', label: 'Priorities', icon: <Star size={20} className="text-black" /> },
    { to: '/app/notifications', label: 'Notifications', icon: <Bell size={20} className="text-black" /> },
    { to: '/app/settings', label: 'Settings', icon: <Settings size={20} className="text-black" /> },
    { to: '/auth/signin', label: 'Exit', icon: <LogOut size={20} className="text-black" /> },
];

const pinnedProjects = [
    { title: 'MyChaty', icon: '💬', color: '#86efac' },
    { title: 'ExamChecker', icon: '💊', color: '#f9a8d4' },
    { title: 'DevBooks', icon: '📚', color: '#60a5fa' },
    { title: 'Boleto Facil', icon: '🤑', color: '#c084fc' },
]

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
                {
                    pinnedProjects.map((project, index) => (
                        <ProjectPin
                            key={index}
                            id={project.title.toLowerCase().replace(' ', '-')}
                            title={project.title}
                            icon={project.icon}
                            color={project.color}
                        />
                    ))
                }
            </CardContent>
        </Card>
    )
}