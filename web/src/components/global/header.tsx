import { Bell, Folder, Home, LogOut, Settings, Star, UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./logo";
import { useEffect, useState } from "react"; import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

export function Header() {

    const location = useLocation();

    function getTitle() {
        const pathname = location.pathname;
        const firstRoute = pathname.split('/');
        const mainRoute = `/app/${firstRoute[2]}`;

        const titles: { [key: string]: string } = {
            '/app/dashboard': 'Dashboard',
            '/app/projects': 'Projects',
            '/app/notifications': 'Notifications',
            '/app/profile': 'Profile',
            '/app/settings': 'Settings',
            '/app/priorities': 'Priorities',
        };
        return titles[pathname] || titles[mainRoute];
    }

    const [open, setOpen] = useState(false)

    const quickLinks = [
        { title: 'Dashboard', href: '/app/dashboard', icon: <Home /> },
        { title: 'Projects', href: '/app/projects', icon: <Folder /> },
        { title: 'Notifications', href: '/app/notifications', icon: <Bell /> },
        { title: 'Profile', href: '/app/profile', icon: <UserRound /> },
        { title: 'Settings', href: '/app/settings', icon: <Settings /> },
        { title: 'Priorities', href: '/app/priorities', icon: <Star /> },
    ]

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <Card className="w-full rounded-none flex flex-row items-center justify-start h-[72px] py-0">
            <CardHeader className="flex items-start border-r min-w-[20%] px-4">
                <Logo />
            </CardHeader>
            <CardContent className="w-full flex flex-row items-center justify-between p-0 px-6">
                <h1 className="text-xl font-bold">
                    {getTitle()}
                </h1>
                <div className="flex flex-row items-center gap-6">
                    <Input
                        placeholder="Quick Search...⌘ + K"
                        className="w-[250px]"
                        onClick={() => setOpen(true)}
                    />
                    <CommandDialog open={open} onOpenChange={setOpen}>
                        <CommandInput placeholder="Type a command or search..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Suggestions">
                                {
                                    quickLinks.map((link) => (
                                        <Link
                                            to={link.href}
                                            key={link.title}
                                            onClick={() => setOpen(false)}
                                            className="cursor-pointer"
                                        >
                                            <CommandItem>
                                                <div className="w-10 h-10 flex border items-center justify-center rounded-xl">
                                                    <span className="text-sm">
                                                        {link.icon}
                                                    </span>
                                                </div>
                                                {link.title}
                                            </CommandItem>
                                        </Link>
                                    ))
                                }
                            </CommandGroup>
                        </CommandList>
                    </CommandDialog>
                    <Separator orientation="vertical" className="h-10" />
                    <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-full">
                            <Avatar>
                                <AvatarFallback>AM</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-4 w-[150px]">
                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2">
                                <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                    <span className="text-sm">
                                        <UserRound size={20} className="text-black" />
                                    </span>
                                </div>
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2">
                                <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                    <span className="text-sm">
                                        <Settings size={20} className="text-black" />
                                    </span>
                                </div>
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2">
                                <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                    <span className="text-sm">
                                        <LogOut size={20} className="text-black" />
                                    </span>
                                </div>
                                Exit
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    )
}