import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    ChevronDown,
    Filter,
    Folder,
    Pencil,
    Plus,
    RefreshCcw,
    Trash,
    UsersRound
} from "lucide-react";
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
import { DetailsDialog } from "@/components/global/details-dialog";
import { deleteUser, getAllUsers, GetAllUsersResponse, searchUsersByName, UserProps } from "@/hooks/use-user";
import { DeleteAlertDialog } from "@/components/global/delete-alert-dialog";
import { useEffect, useState } from "react";
import { NewUserDialog } from "@/components/admin/user/new-user-dialog";
import { EditUserDialog } from "@/components/admin/user/edit-user-dialog";
import { Paginator } from "@/components/global/paginator";

export function AdminUsers() {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [data, setData] = useState<GetAllUsersResponse>();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { data: fetchUsersData, refetch: refetchUsers } = getAllUsers(page, limit);
    const { mutate: deleteUserFn } = deleteUser();
    const { data: searchUsersByNameData } = searchUsersByName({
        name: searchTerm,
        page: page,
        limit: limit
    });

    useEffect(() => {
        if (!searchTerm && fetchUsersData) {
            setData(fetchUsersData);
        }
        if (searchUsersByNameData) {
            setData(searchUsersByNameData);
        }
    }, [fetchUsersData, searchUsersByNameData, searchTerm]);

    async function handleRefresh() {
        await refetchUsers();
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b">
                <div className="flex flex-row items-center gap-2">
                    <div className="w-10 h-10 flex border items-center justify-center rounded-xl">
                        <span className="text-sm">
                            <UsersRound size={20} />
                        </span>
                    </div>
                    <h2 className="font-semibold text-xl">
                        Users
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search..."
                        className="w-[250px]"
                        onChange={event => setSearchTerm(event.target.value)}
                        type="search"
                    />
                    <Button
                        variant={'outline'}
                        className="flex items-center gap-2 text-muted-foreground"
                    >
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
                    <NewUserDialog>
                        <Button className="flex items-center gap-2">
                            <Plus size={20} />
                            New User
                        </Button>
                    </NewUserDialog>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">Name</TableHead>
                            <TableHead className="text-left">E-mail</TableHead>
                            <TableHead className="text-left">Roles</TableHead>
                            <TableHead className="text-left">Type</TableHead>
                            <TableHead className="text-left">Plan</TableHead>
                            <TableHead className="text-right">Details</TableHead>
                            <TableHead className="text-right">Edit</TableHead>
                            <TableHead className="text-right">Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.users.map((user: UserProps) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="flex flex-row items-center gap-2 text-muted-foreground justify-center">
                                                {user.roles.length} Roles <ChevronDown size={20} />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                {
                                                    user.roles.map((role, index) => (
                                                        <DropdownMenuItem key={index}>
                                                            {role}
                                                        </DropdownMenuItem>
                                                    ))
                                                }
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                    <TableCell className="text-left">
                                        {
                                            user.type === 'ADMIN' ?
                                                (
                                                    <Badge variant={'default'}>
                                                        {user.type}
                                                    </Badge>
                                                )
                                                : (
                                                    <Badge variant={'secondary'}>
                                                        {user.type}
                                                    </Badge>
                                                )
                                        }
                                    </TableCell>
                                    <TableCell className="text-left">
                                        {
                                            user.plan === 'PREMIUM' ?
                                                (
                                                    <Badge variant={'default'}>
                                                        {user.plan}
                                                    </Badge>
                                                )
                                                : (
                                                    <Badge variant={'secondary'}>
                                                        {user.plan}
                                                    </Badge>
                                                )
                                        }
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DetailsDialog data={user}>
                                            <Button className="text-muted-foreground" variant={'outline'}>
                                                <Folder size={20} />
                                            </Button>
                                        </DetailsDialog>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <EditUserDialog data={user}>
                                            <Button className="text-muted-foreground" variant={'outline'}>
                                                <Pencil size={20} />
                                            </Button>
                                        </EditUserDialog>
                                    </TableCell>
                                    <TableCell className="flex justify-end">
                                        <DeleteAlertDialog onDelete={() => deleteUserFn(user.id)}>
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
                    showing={data?.users.length || 0}
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