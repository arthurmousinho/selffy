import { TasksTable } from "@/components/projects/tasks-table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,  } from "@/components/ui/tooltip";
import { ChartArea, Pen, Pin, Trash } from "lucide-react";

export function ProjectDetails() {
    return (
        <main className="space-y-4">
            <Card>
                <CardHeader className="w-full h-auto flex flex-row items-center justify-between border-b ">
                    <header className="flex items-center gap-2">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-300">
                            💬
                        </div>
                        <h2 className="font-semibold">
                            MyChaty
                        </h2>
                    </header>
                    <div className="space-x-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant={'outline'} className="flex items-center text-muted-foreground">
                                        <ChartArea size={20} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Metrics</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant={'outline'} className="flex items-center text-muted-foreground">
                                        <Pin size={20} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Pin</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant={'outline'} className="flex items-center text-muted-foreground">
                                        <Pen size={20} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Edit</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant={'outline'} className="flex items-center text-muted-foreground">
                                        <Trash size={20} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Delete</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardHeader>
            </Card>
            <TasksTable />
        </main>
    )
}