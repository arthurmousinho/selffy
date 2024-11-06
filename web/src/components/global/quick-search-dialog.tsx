import { useEffect, useState } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { getUserProjects } from "@/hooks/use-project";
import { Bell, Folder, Home, Settings, Star, UserRound } from "lucide-react";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";

export function QuickSearchDialog() {

    const [open, setOpen] = useState(false)

    const quickLinks = [
        { title: 'Dashboard', href: '/app/dashboard', icon: <Home /> },
        { title: 'Projects', href: '/app/projects', icon: <Folder /> },
        { title: 'Notifications', href: '/app/notifications', icon: <Bell /> },
        { title: 'Profile', href: '/app/profile', icon: <UserRound /> },
        { title: 'Settings', href: '/app/settings', icon: <Settings /> },
        { title: 'Priorities', href: '/app/priorities', icon: <Star /> },
    ]

    const getUserProjectsQuery = getUserProjects(1, 10);

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
        <div>
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
                                    <CommandItem className="cursor-pointer">
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
                    <CommandGroup heading="Projects">
                        {
                            getUserProjectsQuery?.data?.projects.map((link: any) => (
                                <Link
                                    to={`/app/projects/${link.id}`}
                                    key={link.title}
                                    onClick={() => setOpen(false)}
                                >
                                    <CommandItem className="cursor-pointer">
                                        <div
                                            className="w-10 h-10 flex border items-center justify-center rounded-xl"
                                            style={{
                                                backgroundColor: link.color
                                            }}
                                        >
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
        </div>
    )

}