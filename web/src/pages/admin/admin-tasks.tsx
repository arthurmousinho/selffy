import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCheck, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, Folder, MoreVertical, Pencil, Plus, RefreshCcw, Trash } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { getMockTasks } from "@/mocks/get-tasks";
import { NewTaskDialog } from "@/components/admin/task/new-task-dialog";

export function AdminTasks() {
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
                    <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
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
                            <TableHead className="text-left">Due Date</TableHead>
                            <TableHead className="text-left">Priority</TableHead>
                            <TableHead className="text-left">Project ID</TableHead>
                            <TableHead className="text-right">Options</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            getMockTasks().map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell className="max-w-[100px] truncate">{task.dueDate}</TableCell>
                                    <TableCell>
                                        {
                                            task.priority === 'HIGH' ? (
                                                <Badge>
                                                    high
                                                </Badge>
                                            ) : task.priority === 'MEDIUM' ? (
                                                <Badge variant={'secondary'}>
                                                    medium
                                                </Badge>
                                            ) : (
                                                <Badge variant={'outline'}>
                                                    low
                                                </Badge>
                                            )
                                        }
                                    </TableCell>
                                    <TableCell>{task.projectId}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant={'outline'} className="text-muted-foreground">
                                                    <MoreVertical size={20} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem className="cursor-pointer p-2" onSelect={(e) => e.preventDefault()}>
                                                    <DetailsDialog data={task}>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                                                <span className="text-sm">
                                                                    <Folder size={20} className="text-black" />
                                                                </span>
                                                            </div>
                                                            Details
                                                        </div>
                                                    </DetailsDialog>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer p-2" >
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                                            <span className="text-sm">
                                                                <Pencil size={20} className="text-black" />
                                                            </span>
                                                        </div>
                                                        Edit
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer p-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                                            <span className="text-sm">
                                                                <Trash size={20} className="text-black" />
                                                            </span>
                                                        </div>
                                                        Delete
                                                    </div>
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