import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Filter,
    Folder,
    FolderOpen,
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
import { formatCurrency } from "@/utils/format-currency";
import { NewProjectDialog } from "@/components/admin/project/new-project-dialog";
import { deleteProject, getAllProjects } from "@/hooks/use-project";
import { DeleteAlertDialog } from "@/components/global/delete-alert-dialog";
import { EditProjectDialog } from "@/components/admin/project/edit-project.dialog";

export function AdminProjects() {

    const { data: getAllProjectsData, refetch } = getAllProjects()
    const { mutate: deleteProjectFn } = deleteProject()

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
                    <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground" onClick={() => refetch()}>
                        <RefreshCcw size={20} />
                        Refresh
                    </Button>
                    <NewProjectDialog>
                        <Button className="flex items-center gap-2">
                            <Plus size={20} />
                            New Project
                        </Button>
                    </NewProjectDialog>
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
                            <TableHead className="text-right">Details</TableHead>
                            <TableHead className="text-right">Edit</TableHead>
                            <TableHead className="text-right">Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            getAllProjectsData?.projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>{project.title}</TableCell>
                                    <TableCell>{formatCurrency(project.revenue)}</TableCell>
                                    <TableCell className="text-left">{project.tasks.length} tasks</TableCell>
                                    <TableCell className="text-left">
                                        {
                                            project.status === 'FINISHED' ?
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
                                    <TableCell className="text-right">
                                        <DetailsDialog data={project}>
                                            <Button className="text-muted-foreground" variant={'outline'}>
                                                <Folder size={20} />
                                            </Button>
                                        </DetailsDialog>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <EditProjectDialog data={project}>
                                            <Button className="text-muted-foreground" variant={'outline'}>
                                                <Pencil size={20} />
                                            </Button>
                                        </EditProjectDialog>
                                    </TableCell>
                                    <TableCell className="flex justify-end">
                                        <DeleteAlertDialog onDelete={() => deleteProjectFn(project.id)}>
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