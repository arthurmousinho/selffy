import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    CheckCheck,
    Filter,
    Folder,
    Pencil,
    Plus,
    RefreshCcw,
    Trash
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { DetailsDialog } from "@/components/global/details-dialog";
import { NewTaskDialog } from "@/components/admin/task/new-task-dialog";
import { deleteTask, getAllTasks, GetAllTasksResponse, searchTasksByTitle, TaskProps } from "@/hooks/use-task";
import { DeleteAlertDialog } from "@/components/global/delete-alert-dialog";
import { EditTaskDialog } from "@/components/admin/task/edit-task-dialog";
import { useEffect, useState } from "react";
import { Paginator } from "@/components/global/paginator";

export function AdminTasks() {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [data, setData] = useState<GetAllTasksResponse>();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { mutate: deleteTaskFn } = deleteTask();
    const { data: getAllTasksData, refetch: refetchTasksFn } = getAllTasks(page, limit);
    const { data: searchTasksByTitleData } = searchTasksByTitle({
        title: searchTerm,
        page,
        limit
    });

    useEffect(() => {
        if (!searchTerm && getAllTasksData) {
            setData(getAllTasksData); 
        }
        if (searchTasksByTitleData) {
            setData(searchTasksByTitleData);
        }
    }, [getAllTasksData, searchTasksByTitleData, searchTerm]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b">
                <div className="flex flex-row items-center gap-2">
                    <div className="w-10 h-10 flex border items-center justify-center rounded-xl">
                        <span className="text-sm">
                            <CheckCheck size={20} />
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
                        type="search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                        <Filter size={20} />
                        Filter
                    </Button>
                    <Button
                        variant={'outline'}
                        className="flex items-center gap-2 text-muted-foreground"
                        onClick={() => refetchTasksFn()}
                    >
                        <RefreshCcw size={20} />
                        Refresh
                    </Button>
                    <NewTaskDialog adminMode={true}>
                        <Button className="flex items-center gap-2">
                            <Plus size={20} />
                            New Task
                        </Button>
                    </NewTaskDialog>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-left">Priority</TableHead>
                            <TableHead className="text-left">Status</TableHead>
                            <TableHead className="text-left">Project Id</TableHead>
                            <TableHead className="text-right">Details</TableHead>
                            <TableHead className="text-right">Edit</TableHead>
                            <TableHead className="text-right">Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.tasks.map((task: TaskProps) => (
                                <TableRow key={task.id}>
                                    <TableCell className="truncate max-w-[200px]">{task.title}</TableCell>
                                    <TableCell>
                                        {
                                            task.priority === 'HIGH' ? (
                                                <Badge>
                                                    HIGH
                                                </Badge>
                                            ) : task.priority === 'MEDIUM' ? (
                                                <Badge variant={'secondary'}>
                                                    MEDIUM
                                                </Badge>
                                            ) : (
                                                <Badge variant={'outline'}>
                                                    LOW
                                                </Badge>
                                            )
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            task.status === 'PENDING' ? (
                                                <Badge variant={'secondary'}>
                                                    PENDING
                                                </Badge>
                                            ) : (
                                                <Badge>
                                                    COMPLETED
                                                </Badge>
                                            )
                                        }
                                    </TableCell>
                                    <TableCell>{task.projectId}</TableCell>
                                    <TableCell className="text-right">
                                        <DetailsDialog data={task}>
                                            <Button className="text-muted-foreground" variant={'outline'}>
                                                <Folder size={20} />
                                            </Button>
                                        </DetailsDialog>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <EditTaskDialog data={task} adminMode={true}>
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
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <Paginator
                    showing={data?.tasks.length || 0}
                    total={data?.meta.total || 0}
                    currentPage={page}
                    currentLimit={limit}
                    totalPages={data?.meta.totalPages || 0}
                    onPageChange={page => setPage(page)}
                    onLimitChange={limit => setLimit(limit)}
                />
            </CardFooter>
        </Card>
    );
}