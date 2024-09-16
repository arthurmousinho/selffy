import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, Folder, FolderOpen, MoreVertical, Pencil, Plus, RefreshCcw, Trash } from "lucide-react";
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
import { formatCurrency } from "@/utils/format-currency";

export function AdminProjects() {

    const projects = [
        {
            id: "c9b1f650-7a0c-42c3-899b-4850987c4741",
            title: "Project Alpha",
            description: "Developing a new mobile app.",
            revenue: 50000,
            createdAt: "2024-09-12T14:00:00Z",
            updatedAt: "2024-09-12T15:00:00Z",
            tasks: 2,
            status: "inProgress",
            ownerId: "e87e328f-7f4a-4354-aeaa-c7039029ad3e",
            color: "#F3F3F3",
            icon: "💬"
        },
        {
            id: "bb12a860-39fc-487b-a0a9-c7a159568b33",
            title: "Project Beta",
            description: "Redesign of the company website.",
            revenue: 75000,
            createdAt: "2024-09-11T10:30:00Z",
            updatedAt: "2024-09-12T11:45:00Z",
            tasks: 3,
            status: "inProgress",
            ownerId: "e6b0383c-77cb-4f8b-8824-4ad3de77e1d5",
            color: "#F3F3F3",
            icon: "💬"
        },
        {
            id: "6b5a47b8-d59b-4c9a-bf83-4f644431f8e7",
            title: "Project Gamma",
            description: "Implementing a CRM system.",
            revenue: 100000,
            createdAt: "2024-09-10T08:00:00Z",
            updatedAt: "2024-09-12T10:00:00Z",
            tasks: 5,
            status: "inProgress",
            ownerId: "685d98b3-dbee-43de-be8a-b71377ce4124",
            color: "#F3F3F3",
            icon: "💬"
        },
        {
            id: "db3c6b78-9df4-4f27-a8e4-b3a83b7d6c92",
            title: "Project Delta",
            description: "Launch new e-commerce platform.",
            revenue: 120000,
            createdAt: "2024-09-09T12:15:00Z",
            updatedAt: "2024-09-12T13:30:00Z",
            tasks: 4,
            status: "finished",
            ownerId: "bd9abffa-9285-4313-a579-1b230b910ae5",
            color: "#F3F3F3",
            icon: "💬"
        },
        {
            id: "fd5a1d3e-92f2-48d4-9d6a-73b8c4c6f62f",
            title: "Project Epsilon",
            description: "Create a new marketing strategy.",
            revenue: 90000,
            createdAt: "2024-09-08T09:45:00Z",
            updatedAt: "2024-09-12T14:30:00Z",
            tasks: 6,
            status: "inProgress",
            ownerId: "7017d797-1a3c-4f69-97a3-4ddea36a23fc",
            color: "#F3F3F3",
            icon: "💬"
        }
    ];

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b">
                <div className="flex flex-row items-center gap-2">
                    <div className="w-10 h-10 flex border items-center justify-center rounded-xl">
                        <span className="text-sm">
                            <FolderOpen size={20} />
                        </span>
                    </div>
                    <h2 className="font-semibold text-xl">
                        Projects
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
                        New Project
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-left">Revenue</TableHead>
                            <TableHead className="text-left">Tasks</TableHead>
                            <TableHead className="text-left">Status</TableHead>
                            <TableHead className="text-left">Owner Id</TableHead>
                            <TableHead className="text-right">Options</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>{project.title}</TableCell>
                                    <TableCell>{formatCurrency(project.revenue)}</TableCell>
                                    <TableCell className="text-left">{project.tasks}</TableCell>
                                    <TableCell className="text-left">
                                        {
                                            project.status === 'finished' ?
                                                (
                                                    <Badge variant={'default'}>
                                                        FINISHED
                                                    </Badge>
                                                )
                                                : (
                                                    <Badge variant={'secondary'}>
                                                        IN_PROGRESS
                                                    </Badge>
                                                )
                                        }
                                    </TableCell>
                                    <TableCell>{project.ownerId}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant={'outline'} className="text-muted-foreground">
                                                    <MoreVertical size={20} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem className="cursor-pointer p-2" onSelect={(e) => e.preventDefault()}>
                                                    <DetailsDialog data={project}>
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
    );
}
