import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { BookmarkCheck } from "lucide-react";
import { Link } from "react-router-dom";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function Notifications() {
    return (
        <main className="space-y-4">
            {/* Agrupamento de notificações de TODAY */}
            <Card>
                <CardHeader className="flex flex-col gap-4">
                    <span className="text-sm text-muted-foreground">TODAY</span>
                    <div className="space-y-4">
                        {/* Notificação 1 */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-green-300 flex items-center justify-center rounded-xl">
                                    💬
                                </div>
                                <h2 className="text-muted-foreground">
                                    Task #02 from <Link to={'/projects'} className="underline underline-offset-2 text-primary">MyChaty</Link> project is coming late
                                </h2>
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                                            <BookmarkCheck size={20} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>Read notification</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        {/* Notificação 2 */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-blue-300 flex items-center justify-center rounded-xl">
                                    📝
                                </div>
                                <h2 className="text-muted-foreground">
                                    New task added to <Link to={'/projects'} className="underline underline-offset-2 text-primary">DevHub</Link> project
                                </h2>
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                                            <BookmarkCheck size={20} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>Read notification</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        {/* Notificação 3 */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-yellow-300 flex items-center justify-center rounded-xl">
                                    🔔
                                </div>
                                <h2 className="text-muted-foreground">
                                    Reminder: Meeting with the <Link to={'/projects'} className="underline underline-offset-2 text-primary">Freelancer Hub</Link> team at 3 PM
                                </h2>
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                                            <BookmarkCheck size={20} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>Read notification</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Agrupamento de notificações de YESTERDAY */}
            <Card>
                <CardHeader className="flex flex-col gap-4">
                    <span className="text-sm text-muted-foreground">YESTERDAY</span>
                    <div className="space-y-4">
                        {/* Notificação 1 */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-red-300 flex items-center justify-center rounded-xl">
                                    🛠️
                                </div>
                                <h2 className="text-muted-foreground">
                                    Issue #47 in <Link to={'/projects'} className="underline underline-offset-2 text-primary">DevTools</Link> has been resolved
                                </h2>
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                                            <BookmarkCheck size={20} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>Read notification</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        {/* Notificação 2 */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-purple-300 flex items-center justify-center rounded-xl">
                                    💼
                                </div>
                                <h2 className="text-muted-foreground">
                                    Your request to join <Link to={'/projects'} className="underline underline-offset-2 text-primary">Marketing Campaign</Link> project has been accepted
                                </h2>
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                                            <BookmarkCheck size={20} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>Read notification</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        {/* Notificação 3 */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-orange-300 flex items-center justify-center rounded-xl">
                                    📧
                                </div>
                                <h2 className="text-muted-foreground">
                                    New comment on task #10 in <Link to={'/projects'} className="underline underline-offset-2 text-primary">MyChaty</Link> project
                                </h2>
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                                            <BookmarkCheck size={20} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>Read notification</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Agrupamento de notificações de TWO DAYS AGO */}
            <Card>
                <CardHeader className="flex flex-col gap-4">
                    <span className="text-sm text-muted-foreground">TWO DAYS AGO</span>
                    <div className="space-y-4">
                        {/* Notificação 1 */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-teal-300 flex items-center justify-center rounded-xl">
                                    📈
                                </div>
                                <h2 className="text-muted-foreground">
                                    Task #05 has been completed in <Link to={'/projects'} className="underline underline-offset-2 text-primary">Analytics</Link> project
                                </h2>
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                                            <BookmarkCheck size={20} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>Read notification</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        {/* Notificação 2 */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-pink-300 flex items-center justify-center rounded-xl">
                                    🎉
                                </div>
                                <h2 className="text-muted-foreground">
                                    You have reached a milestone in <Link to={'/projects'} className="underline underline-offset-2 text-primary">MyChaty</Link> project
                                </h2>
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                                            <BookmarkCheck size={20} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>Read notification</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                        {/* Notificação 3 */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gray-300 flex items-center justify-center rounded-xl">
                                    🛠️
                                </div>
                                <h2 className="text-muted-foreground">
                                    The server has been restarted in <Link to={'/projects'} className="underline underline-offset-2 text-primary">Maple</Link> project
                                </h2>
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                                            <BookmarkCheck size={20} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>Read notification</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </main>
    );
}
