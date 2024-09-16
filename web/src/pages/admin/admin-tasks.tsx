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

export function AdminTasks() {

    const tasks = [
        {
            id: "a1b2c3d4-e5f6-7g8h-9i0j-klmnopqrst",
            title: "Design Wireframes",
            description: "Create wireframes for the new mobile app.",
            dueDate: "2024-09-20",
            priorityId: "MEDIUM",
            projectId: "c9b1f650-7a0c-42c3-899b-4850987c4741",
            createdAt: "2024-09-12T14:00:00Z",
            updatedAt: "2024-09-12T15:00:00Z"
        },
        {
            id: "u1v2w3x4-y5z6-a7b8-c9d0-e1f2g3h4i5j6",
            title: "Develop Homepage",
            description: "Redesign homepage for the company website.",
            dueDate: "2024-09-18",
            priority: "LOW",
            projectId: "bb12a860-39fc-487b-a0a9-c7a159568b33",
            createdAt: "2024-09-11T10:30:00Z",
            updatedAt: "2024-09-12T11:45:00Z"
        },
        {
            id: "k1l2m3n4-o5p6-q7r8-s9t0-u1v2w3x4y5z6",
            title: "Implement Authentication",
            description: "Add OAuth and social login options to CRM.",
            dueDate: "2024-09-25",
            priority: "MEDIUM",
            projectId: "6b5a47b8-d59b-4c9a-bf83-4f644431f8e7",
            createdAt: "2024-09-10T08:00:00Z",
            updatedAt: "2024-09-12T10:00:00Z"
        },
        {
            id: "p1q2r3s4-t5u6-v7w8-x9y0-z1a2b3c4d5e6",
            title: "Launch Marketing Campaign",
            description: "Plan and execute the campaign for e-commerce platform launch.",
            dueDate: "2024-09-30",
            priority: "HIGH",
            projectId: "db3c6b78-9df4-4f27-a8e4-b3a83b7d6c92",
            createdAt: "2024-09-09T12:15:00Z",
            updatedAt: "2024-09-12T13:30:00Z"
        },
        {
            id: "f1g2h3i4-j5k6-l7m8-n9o0-p1q2r3s4t5u6",
            title: "Create Social Media Content",
            description: "Develop content for the new marketing strategy.",
            dueDate: "2024-09-22",
            priority: "LOW",
            createdAt: "2024-09-08T09:45:00Z",
            updatedAt: "2024-09-12T14:30:00Z",
            projectId: "db3c6b78-9df4-4f27-a8e4-b3a83b7d6c92",
        }
    ];

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
                    <Button className="flex items-center gap-2">
                        <Plus size={20} />
                        New Task
                    </Button>
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
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>{task.title}</TableCell>
                                <TableCell className="max-w-[100px] truncate">{task.dueDate}</TableCell>
                                <TableCell>
                                    {
                                        task.priority === 'HIGH' ? (
                                            <Badge>
                                                high
                                            </Badge>
                                        ) : task.priorityId === 'MEDIUM' ? (
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
                        ))}
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