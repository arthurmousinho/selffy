import { deleteTask, getTasksByProjectId } from "@/hooks/use-task";
import { useParams } from "react-router-dom";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Folder, Pencil, Plus, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TaskBadge } from "@/components/tasks/task-badge";
import { Badge } from "@/components/ui/badge";
import { formatDueDate } from "@/utils/format-due-date";
import { NewTaskDialog } from "@/components/admin/task/new-task-dialog";
import { EditTaskDialog } from "@/components/admin/task/edit-task-dialog";
import { DeleteAlertDialog } from "@/components/global/delete-alert-dialog";
import { getProjectById } from "@/hooks/use-project";
import { TaskDetailsDialog } from "@/components/tasks/task-details-dialog";


export function ProjectTasks() {

    const projectIdFromRoute = useParams().id;

    const { data: tasksData } = getTasksByProjectId(projectIdFromRoute || '');
    const { mutate: deleteTaskFn } = deleteTask();
    const { data: projectData } = getProjectById(projectIdFromRoute || '');

    return (
        <main className="space-y-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <header className="flex items-center gap-2">
                        <div
                            className="w-14 h-14 flex items-center justify-center rounded-xl"
                            style={{ backgroundColor: projectData?.project.color }}
                        >
                            <span className="text-2xl">{projectData?.project.icon}</span>
                        </div>
                        <div className="space-y-2">
                            <h2 className="font-semibold">
                                {projectData?.project.title}' tasks
                            </h2>
                            <span className="text-sm text-muted-foreground font-semibold">
                                {projectData?.project.tasks} tasks
                            </span>
                        </div>
                    </header>
                    <nav>
                        <NewTaskDialog
                            projectId={projectData?.project.id}
                            adminMode={false}
                        >
                            <Button className="flex items-center gap-2">
                                <Plus />
                                New Task
                            </Button>
                        </NewTaskDialog>
                    </nav>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                                <TableHead className="text-right">Due date</TableHead>
                                <TableHead className="text-right">Details</TableHead>
                                <TableHead className="text-right">Edit</TableHead>
                                <TableHead className="text-right">Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tasksData?.tasks.map(task => (
                                <TableRow>
                                    <TableCell className="flex items-center gap-2">
                                        <TaskBadge priority={task.priority} />
                                        <h2>{task.title}</h2>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {
                                            task.status === 'PENDING' ? (
                                                <Badge variant={'outline'} className=" bg-slate-50 text-slate-400">
                                                    Pending
                                                </Badge>
                                            ) : (
                                                <Badge variant={'secondary'} className=" bg-green-50 text-green-700 border border-green-500">
                                                    Completed
                                                </Badge>
                                            )
                                        }
                                    </TableCell>
                                    <TableCell className="text-right flex items-center gap-2 justify-end text-base text-muted-foreground">
                                        <Calendar size={15} />
                                        <span>
                                            {formatDueDate(task.dueDate)}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <TaskDetailsDialog data={task}>
                                            <Button className="text-muted-foreground" variant={'outline'}>
                                                <Folder size={20} />
                                            </Button>
                                        </TaskDetailsDialog>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <EditTaskDialog data={task} adminMode={false}>
                                            <Button className="text-muted-foreground" variant={'outline'}>
                                                <Pencil size={20} />
                                            </Button>
                                        </EditTaskDialog>
                                    </TableCell>
                                    <TableCell className="flex justify-end">
                                        <DeleteAlertDialog
                                            onDelete={() => deleteTaskFn(task.id)}
                                        >
                                            <Button className="text-muted-foreground" variant={'outline'}>
                                                <Trash size={20} />
                                            </Button>
                                        </DeleteAlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardHeader>
            </Card>
        </main>
    )
}