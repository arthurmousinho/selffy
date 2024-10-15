import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Filter,
    Folder,
    Pencil,
    Plus,
    RefreshCcw,
    Shield,
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
import { DetailsDialog } from "@/components/global/details-dialog";
import { DeleteAlertDialog } from "@/components/global/delete-alert-dialog";
import { Badge } from "@/components/ui/badge";
import { deleteRole, getAllRoles, RoleProps, SearchRoleByKeyResponse, searchRolesByKey } from "@/hooks/use-role";
import { UserType } from "@/hooks/use-user";
import { NewRoleDialog } from "@/components/admin/role/new-role-dialog";
import { EditRoleDialog } from "@/components/admin/role/edit-role-dialog";
import { useEffect, useState } from "react";
import { Paginator } from "@/components/global/paginator";


export function AdminRoles() {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [data, setData] = useState<SearchRoleByKeyResponse>();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { data: fetchRolesData, refetch: refetchRoles } = getAllRoles(page, limit);
    const { data: searchRolesByNameData } = searchRolesByKey({
        key: searchTerm,
        page: page,
        limit: limit
    });
    const { mutate: deleteRoleFn } = deleteRole();

    useEffect(() => {
        if (!searchTerm && fetchRolesData) {
            setData(fetchRolesData);
        }
        if (searchRolesByNameData) {
            setData(searchRolesByNameData);
        }
    }, [fetchRolesData, searchRolesByNameData, searchTerm]);


    async function handleRefresh() {
        await refetchRoles();
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b">
                <div className="flex flex-row items-center gap-2">
                    <div className="w-10 h-10 flex border items-center justify-center rounded-xl">
                        <span className="text-sm">
                            <Shield size={20} />
                        </span>
                    </div>
                    <h2 className="font-semibold text-xl">
                        Roles
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search by key..."
                        className="w-[250px]"
                        onChange={event => setSearchTerm(event.target.value)}
                        type="search"
                    />
                    <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                        <Filter size={20} />
                        Filter
                    </Button>
                    <Button
                        onClick={handleRefresh}
                        variant={'outline'}
                        className="flex items-center gap-2 text-muted-foreground"
                    >
                        <RefreshCcw size={20} />
                        Refresh
                    </Button>
                    <NewRoleDialog>
                        <Button className="flex items-center gap-2">
                            <Plus size={20} />
                            New Role
                        </Button>
                    </NewRoleDialog>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">Key</TableHead>
                            <TableHead className="text-left">User Types</TableHead>
                            <TableHead className="text-right">Details</TableHead>
                            <TableHead className="text-right">Edit</TableHead>
                            <TableHead className="text-right">Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.roles.map((role: RoleProps) => (
                                <TableRow key={role.id}>
                                    <TableCell>{role.key}</TableCell>
                                    <TableCell className="flex flex-row items-center gap-2">
                                        {
                                            role.userTypes.map((userType: UserType) => (
                                                <Badge variant={userType === 'ADMIN' ? 'default' : 'secondary'}>
                                                    {userType.toLowerCase()}
                                                </Badge>
                                            ))
                                        }
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DetailsDialog data={role}>
                                            <Button className="text-muted-foreground" variant={'outline'}>
                                                <Folder size={20} />
                                            </Button>
                                        </DetailsDialog>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <EditRoleDialog data={role}>
                                            <Button className="text-muted-foreground" variant={'outline'}>
                                                <Pencil size={20} />
                                            </Button>
                                        </EditRoleDialog>
                                    </TableCell>
                                    <TableCell className="flex justify-end">
                                        <DeleteAlertDialog onDelete={() => deleteRoleFn(role.id)}>
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
                    showing={data?.roles.length || 0}
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
