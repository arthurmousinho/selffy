import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { TaskBadge } from "../tasks/task-badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {
    Check,
    Filter,
    Folder,
    MoreVertical,
    Pencil,
    Plus,
    Trash
} from "lucide-react"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader } from "../ui/card";
export interface Task {
    id: string;
    title: string;
    priority: "low" | "medium" | "high";
    dueDate: string;
}

const data: Task[] = [
    {
        id: "1",
        title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
        priority: "high",
        dueDate: "2024-09-20"
    },
    {
        id: "2",
        title: "Generating the alarm won't do anything, we need to generate the mobile IP cap",
        priority: "medium",
        dueDate: "2024-09-18"
    },
    {
        id: "3",
        title: "I'll transmit the wireless JBOD capacitor, that should hard drive the SSD feed!",
        priority: "low",
        dueDate: "2024-09-15"
    },
    {
        id: "4",
        title: "Reboot the system to apply new security patches.",
        priority: "high",
        dueDate: "2024-09-25"
    },
    {
        id: "5",
        title: "Optimize the database queries for faster performance.",
        priority: "medium",
        dueDate: "2024-09-30"
    },
]

export function TasksTable() {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b">
                <div className="flex flex-row items-center gap-2">
                    <div className="w-10 h-10 flex border items-center justify-center rounded-xl">
                        <span className="text-sm">
                            <Check size={20} />
                        </span>
                    </div>
                    <h2 className="font-semibold text-xl">
                        Tasks
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search..."
                        className="w-[250px]"
                    />
                    <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                        <Filter size={20} />
                        Filter
                    </Button>
                    <Button className="flex items-center gap-2">
                        <Plus size={20} />
                        New Task
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <Table>
                    <TableBody>
                        {
                            data.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell className="flex items-center gap-2 text-sm">
                                        <TaskBadge priority={item.priority} />
                                        {item.title}
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-muted-foreground">
                                        {item.dueDate}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant={'outline'} className="text-muted-foreground">
                                                    <MoreVertical size={20} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2">
                                                    <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                                        <span className="text-sm">
                                                            <Folder size={20} className="text-black" />
                                                        </span>
                                                    </div>
                                                    Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2">
                                                    <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                                        <span className="text-sm">
                                                            <Pencil size={20} className="text-black" />
                                                        </span>
                                                    </div>
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2">
                                                    <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                                        <span className="text-sm">
                                                            <Trash size={20} className="text-black" />
                                                        </span>
                                                    </div>
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card >
    )
}