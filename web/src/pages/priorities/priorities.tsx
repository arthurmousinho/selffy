import { getUserTasksByUserIdGroupedByPriorities } from "@/hooks/use-task";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Flame,
    Calendar,
    TriangleAlert,
    Snail
} from "lucide-react"
import { formatDueDate } from "@/utils/format-due-date";
import { TaskBadge } from "@/components/tasks/task-badge";


export function Priorities() {

    const { data } = getUserTasksByUserIdGroupedByPriorities();

    if (!data) {
        return (
            <div className="flex items-center justify-center h-full">
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <main className="space-y-4">
            <Card>
                <CardHeader className="w-full h-auto flex flex-row items-center justify-between border-b">
                    <header className="flex items-center gap-2">
                        <div
                            className="w-12 h-12 flex items-center justify-center rounded-xl text-xl bg-red-200 text-red-500"
                        >
                            <Flame />
                        </div>
                        <h2 className="font-semibold">
                            High Priority
                        </h2>
                    </header>
                </CardHeader>
                <CardContent className="pt-4">
                    <Table>
                        <TableHeader className="hidden">
                            <TableHead>
                                Title
                            </TableHead>
                            <TableHead className="text-right">
                                Due Date
                            </TableHead>
                        </TableHeader>
                        <TableBody>
                            {data.tasks.high.map(task => (
                                <TableRow>
                                    <TableCell className="flex items-center gap-2 text-sm">
                                        <TaskBadge priority="HIGH" />
                                        <span>
                                            {task.title}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-muted-foreground">
                                        <div className="flex flex-row items-center justify-end w-full gap-2">
                                            <Calendar size={20} />
                                            {formatDueDate(new Date(task.dueDate))}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="w-full h-auto flex flex-row items-center justify-between border-b">
                    <header className="flex items-center gap-2">
                        <div
                            className="w-12 h-12 flex items-center justify-center rounded-xl text-xl bg-amber-100 text-amber-500"
                        >
                            <TriangleAlert />
                        </div>
                        <h2 className="font-semibold">
                            Medium Priority
                        </h2>
                    </header>
                </CardHeader>
                <CardContent className="pt-4">
                    <Table>
                        <TableHeader className="hidden">
                            <TableHead>
                                Title
                            </TableHead>
                            <TableHead className="text-right">
                                Due Date
                            </TableHead>
                        </TableHeader>
                        <TableBody>
                            {data.tasks.medium.map(task => (
                                <TableRow>
                                    <TableCell className="flex items-center gap-2 text-sm">
                                        <TaskBadge priority="MEDIUM" />
                                        <span>
                                            {task.title}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-muted-foreground">
                                        <div className="flex flex-row items-center justify-end w-full gap-2">
                                            <Calendar size={20} />
                                            {formatDueDate(new Date(task.dueDate))}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="w-full h-auto flex flex-row items-center justify-between border-b">
                    <header className="flex items-center gap-2">
                        <div
                            className="w-12 h-12 flex items-center justify-center rounded-xl text-xl bg-sky-200 text-sky-500"
                        >
                            <Snail />
                        </div>
                        <h2 className="font-semibold">
                            Low Priority
                        </h2>
                    </header>
                </CardHeader>
                <CardContent className="pt-4">
                    <Table>
                        <TableHeader className="hidden">
                            <TableHead>
                                Title
                            </TableHead>
                            <TableHead className="text-right">
                                Due Date
                            </TableHead>
                        </TableHeader>
                        <TableBody>
                            {data.tasks.low.map(task => (
                                <TableRow>
                                    <TableCell className="flex items-center gap-2 text-sm">
                                        <TaskBadge priority="LOW" />
                                        <span>
                                            {task.title}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-muted-foreground">
                                        <div className="flex flex-row items-center justify-end w-full gap-2">
                                            <Calendar size={20} />
                                            {formatDueDate(new Date(task.dueDate))}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
    )
}