import { Cog, LogOut, UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

import logo from "../../assets/brand/logo.svg"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export function Header() {
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
                    Dashboard
                </h1>
                <div className="flex flex-row items-center gap-6">
                    <Input
                        placeholder="Pesquisa rápida..."
                        className="w-[250px]"
                    />
                    <Separator orientation="vertical" className="h-10" />
                    <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-full">
                            <Avatar>
                                <AvatarFallback>AM</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-4">
                            <DropdownMenuLabel>Arthur Mousinho</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <UserRound size={15} />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <Cog size={15} />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-400">
                                <LogOut size={15} />
                                Exit
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    )
}