import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { TaskPriority, TaskStatus } from "@/hooks/use-task";
import { TaskBadge } from "./task-badge";
import { Calendar } from "lucide-react";
import { formatDueDate } from "@/utils/format-due-date";

interface TaskCardProps {
    id: string;
    title: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
}

export function TaskCard(props: TaskCardProps) {
    return (
        <Link to={props.id}>
            <Card className="flex flex-row justify-between items-center">
                <CardHeader className="flex flex-row items-center gap-2">
                    <TaskBadge priority={props.priority} />
                    <h2 className="font-semibold">
                        {props.title}
                    </h2>
                </CardHeader>
                <CardFooter className="flex items-center gap-4 justify-between py-0">
                    {
                        props.status === 'PENDING' ? (
                            <Badge variant={'outline'} className=" bg-slate-50 text-slate-400">
                                Pending
                            </Badge>
                        ) : (
                            <Badge variant={'secondary'} className=" bg-green-50 text-green-400">
                                Completed
                            </Badge>
                        )
                    }
                    <div className="text-sm text-muted-foreground text-medium flex items-center gap-1">
                        <Calendar size={15} />
                        <span>
                            {formatDueDate(props.dueDate)}
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}