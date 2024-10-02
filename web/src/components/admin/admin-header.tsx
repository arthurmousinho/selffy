import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";

import logo from "../../assets/brand/logo.svg"
import { Link } from "react-router-dom";
import { Button } from "../ui/button";


interface AdminHeaderProps {
    onToggleSidebar: () => void;
    isSidebarOpen: boolean;
}

export function AdminHeader(props: AdminHeaderProps) {
    return (
        <Card className="w-full rounded-none flex flex-row items-center justify-start h-[72px] py-0">
            <CardHeader className={`
                flex items-start border-r min-w-[20%] px-4
                ${props.isSidebarOpen && 'hidden'}
            `}>
                <Link to="/">
                    <img
                        src={logo}
                        className="w-[150px]"
                    />
                </Link>
            </CardHeader>
            <CardContent className="w-full flex flex-row items-center justify-between p-0 px-6">
                <div className="flex items-center gap-4">
                    <Button variant={'outline'} onClick={props.onToggleSidebar}>
                        {
                            props.isSidebarOpen
                            ? <ChevronRight size={20} />
                            : <ChevronLeft size={20} />
                        }
                    </Button>
                    <h1 className="text-xl font-bold">
                        Admin Panel
                    </h1>
                </div>
                <Avatar>
                    <AvatarFallback>
                        <Lock size={20} />
                    </AvatarFallback>
                </Avatar>
            </CardContent>
        </Card >
    )
}