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
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { DetailsDialog } from "@/components/global/details-dialog";
import { NewTaskDialog } from "@/components/admin/task/new-task-dialog";
import { deleteTask, getAllTasks, TaskProps } from "@/hooks/use-task";
import { DeleteAlertDialog } from "@/components/global/delete-alert-dialog";

export function AdminTasks() {

    const { mutate: deleteTaskFn } = deleteTask();
    const { data: getAllTasksData, refetch: refetchTasksFn } = getAllTasks();

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
                    <NewTaskDialog>
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
                            getAllTasksData?.tasks.map((task: TaskProps) => (
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
                                        <Button className="text-muted-foreground" variant={'outline'}>
                                            <Pencil size={20} />
                                        </Button>
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
                <span className="text-sm text-muted-foreground">
                    Showing 5 of 500 items
                </span>
                <footer className="flex flex-row items-center gap-4">
                    <div className="flex flex-row items-center gap-2">
                        <Label htmlFor="rows-per-page-input">
                            Rows per page
                        </Label>
                        <Select defaultValue="5">
                            <SelectTrigger className="w-[100px] h-12" id="rows-per-page-input">
                                <SelectValue placeholder="Rows per page" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="5">5 rows</SelectItem>
                                <SelectItem value="10">10 rows</SelectItem>
                                <SelectItem value="15">15 rows</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-x-2">
                        <Button variant={'outline'}>
                            <ChevronsLeft size={20} />
                        </Button>
                        <Button variant={'outline'}>
                            <ChevronLeft size={20} />
                        </Button>
                        <Button variant={'outline'}>
                            <ChevronRight size={20} />
                        </Button>
                        <Button variant={'outline'}>
                            <ChevronsRight size={20} />
                        </Button>
                    </div>
                </footer>
            </CardFooter>
        </Card>
    );
}