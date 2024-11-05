import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {
    Check,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Filter,
    Folder,
    MoreVertical,
    Pencil,
    Plus,
    Trash
} from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { getMockTasks } from "@/mocks/get-tasks";
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TaskBadge } from "@/components/tasks/task-badge";


export function ProjectTasks() {
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
                        Project Tasks
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
                            getMockTasks().map(item => (
                                <TableRow key={item.id}>
                                    <TableCell className="flex items-center gap-2 text-sm">
                                        <TaskBadge priority={item.priority as any} />
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
            <CardFooter className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                    Showing 5 of 1200 items
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
    )
}