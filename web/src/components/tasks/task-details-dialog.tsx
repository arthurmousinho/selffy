import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TaskProps } from "@/hooks/use-task";
import { ReactNode } from "react";
import { TaskBadge } from "./task-badge";
import { Badge } from "../ui/badge";
import { Calendar } from "lucide-react";
import { formatDueDate } from "@/utils/format-due-date";

interface TaskDetailsDialogProps {
    children: ReactNode;
    data: TaskProps;
}

export function TaskDetailsDialog(props: TaskDetailsDialogProps) {

    return (
        <Dialog>
            <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                {props.children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex flex-row items-center gap-2">
                    <TaskBadge priority={props.data.priority} />
                    <div className="flex flex-col gap-2">
                        <DialogTitle>{props.data.title}</DialogTitle>
                        <div>
                            {
                                props.data.status === 'PENDING' ? (
                                    <Badge variant={'outline'} className=" bg-slate-50 text-slate-400">
                                        pending
                                    </Badge>
                                ) : (
                                    <Badge variant={'secondary'} className=" bg-green-50 text-green-400">
                                        completed
                                    </Badge>
                                )
                            }
                        </div>
                    </div>
                </DialogHeader>
                <DialogDescription>
                    {props.data.description}
                </DialogDescription>
                <DialogFooter>
                    <footer className="flex items-start justify-start w-full">
                        <Badge variant={'outline'} className="text-sm text-muted-foreground font-medium flex flex-row items-center gap-2">
                            <Calendar size={15} />
                            <span>{formatDueDate(props.data.dueDate)}</span>
                        </Badge>
                    </footer>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}