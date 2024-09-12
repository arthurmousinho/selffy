import { Lock } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";

import logo from "../../assets/brand/logo.svg"
import { Link, useLocation } from "react-router-dom";

export function AdminHeader() {

    const location = useLocation();

    function getTitle() {
        const pathname = location.pathname;
        const firstRoute = pathname.split('/');
        const mainRoute = `/${firstRoute[1]}`;

        const titles: { [key: string]: string } = {
            '/admin/users': 'Users',
            '/admin/projects': 'Projects',
            '/admin/notifications': 'Notifications',
            '/admin/tasks': 'Tasks',
            '/admin/priorities': 'Priorities',
        };

        return titles[pathname] || titles[mainRoute];
    }

    return (
        <Card className="w-full rounded-none flex flex-row items-center justify-start h-[72px] py-0">
            <CardHeader className="flex items-center border-r min-w-[20%]">
                <Link to="/">
                    <img
                        src={logo}
                        className="w-[150px]"
                    />
                </Link>
            </CardHeader>
            <CardContent className="w-full flex flex-row items-center justify-between p-0 px-4">
                <h1 className="text-xl font-bold">
                    {getTitle()}
                </h1>
                <Avatar>
                    <AvatarFallback>
                        <Lock size={20} />
                    </AvatarFallback>
                </Avatar>
            </CardContent>
        </Card >
    )
}