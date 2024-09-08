import { Card, CardContent } from "../ui/card";
import {
    Bell,
    Folder,
    Home,
    LogOut,
    Settings,
    UserRound,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

export function Sidebar() {
    return (
        <Card className="h-screen rounded-none min-w-[20%] border-t-0">
            <CardContent className="pt-4 px-2 flex flex-col gap-2">
                <Link to={'/dashboard'}>
                    <Button className="h-12 px-3 w-full flex items-center justify-start gap-4" variant={'secondary'}>
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl">
                            <span className="text-sm">
                                <Home size={20} className="text-black" />
                            </span>
                        </div>
                        <h2>
                            Dashboard
                        </h2>
                    </Button>
                </Link>
                <Link to={'/projects'}>
                    <Button className="h-12 px-3 w-full flex items-center justify-start gap-4" variant={'ghost'}>
                        <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                            <span className="text-sm">
                                <Folder size={20} className="text-black" />
                            </span>
                        </div>
                        <h2>
                            Projects
                        </h2>
                    </Button>
                </Link>
                <Button className="h-12 px-3 w-full flex items-center justify-start gap-4" variant={'ghost'}>
                    <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                        <span className="text-sm">
                            <Bell size={20} />
                        </span>
                    </div>
                    <h2>
                        Notifications
                    </h2>
                </Button>
                <Button className="h-12 px-3 w-full flex items-center justify-start gap-4" variant={'ghost'}>
                    <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                        <span className="text-sm">
                            <UserRound size={20} className="text-black" />
                        </span>
                    </div>
                    <h2>
                        Profile
                    </h2>
                </Button>
                <Button className="h-12 px-3 w-full flex items-center justify-start gap-4" variant={'ghost'}>
                    <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                        <span className="text-sm">
                            <Settings size={20} className="text-black" />
                        </span>
                    </div>
                    <h2>
                        Settings
                    </h2>
                </Button>
                <Button className="h-12 px-3 w-full flex items-center justify-start gap-4" variant={'ghost'}>
                    <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                        <span className="text-sm">
                            <LogOut size={20} className="text-black" />
                        </span>
                    </div>
                    <h2>
                        Exit
                    </h2>
                </Button>

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