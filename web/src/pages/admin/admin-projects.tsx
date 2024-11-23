import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
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
import { DetailsDialog } from "@/components/global/details-dialog";
import { formatCurrency } from "@/utils/format-currency";
import { deleteProject, getAllProjects, GetAllProjectsResponse, searchProjectsByTitle } from "@/hooks/use-project";
import { DeleteAlertDialog } from "@/components/global/delete-alert-dialog";
import { useEffect, useState } from "react";
import { Paginator } from "@/components/global/paginator";
import { Link } from "react-router-dom";

export function AdminProjects() {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [data, setData] = useState<GetAllProjectsResponse>();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { data: getAllProjectsData, refetch } = getAllProjects(page, limit);
    const { mutate: deleteProjectFn } = deleteProject();
    const { data: searchProjectsByTitleData } = searchProjectsByTitle({
        title: searchTerm,
        page,
        limit
    });

    useEffect(() => {
        if (!searchTerm && getAllProjectsData) {
            setData(getAllProjectsData);
        }
        if (searchProjectsByTitleData) {
            setData(searchProjectsByTitleData);
        }
    }, [getAllProjectsData, searchProjectsByTitleData, searchTerm]);


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
                        onChange={event => setSearchTerm(event.target.value)}
                        type="search"
                    />
                    <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                        <Filter size={20} />
                        Filter
                    </Button>
                    <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground" onClick={() => refetch()}>
                        <RefreshCcw size={20} />
                        Refresh
                    </Button>
                    <Link to={'new'}>
                        <Button className="flex items-center gap-2">
                            <Plus size={20} />
                            New Project
                        </Button>
                    </Link>
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
                            data?.projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>{project.title}</TableCell>
                                    <TableCell>{formatCurrency(project.revenue)}</TableCell>
                                    <TableCell className="text-left">{project.tasks} tasks</TableCell>
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
                                        <Link to={`${project.id}/edit`}>
                                            <Button className="text-muted-foreground" variant={'outline'}>
                                                <Pencil size={20} />
                                            </Button>
                                        </Link>
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
            <CardFooter>
                <Paginator
                    showing={data?.projects.length || 0}
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