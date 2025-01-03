import { LogOut, Settings, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation } from "react-router-dom";
import { Logo } from "./logo";
import { QuickSearchDialog } from "./quick-search-dialog";
import { decodeToken } from "@/hooks/use-token";
import { BackButton } from "./back-button";

export function Header() {

    const location = useLocation();
    const tokenData = decodeToken();

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

    return (
        <Card className="w-full rounded-none flex flex-row items-center justify-start h-[72px] py-0">
            <CardHeader className="flex items-start border-r min-w-[20%] px-4">
                <Logo />
            </CardHeader>
            <CardContent className="w-full flex flex-row items-center justify-between p-0 px-6">
                <div className="flex items-center gap-4">
                    <BackButton />
                    <h1 className="text-xl font-bold">
                        {getTitle()}
                    </h1>
                </div>
                <div className="flex flex-row items-center gap-6">
                    <QuickSearchDialog />
                    <Separator orientation="vertical" className="h-10" />
                    <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-full">
                            <Avatar>
                                <AvatarFallback>
                                    {tokenData?.name?.split(' ')[0].charAt(0)}
                                    {tokenData?.name?.split(' ')[1]?.charAt(0) || ''}
                                </AvatarFallback>
                                <AvatarImage 
                                    src={tokenData?.avatarUrl || ''}
                                    className="object-cover"
                                />
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