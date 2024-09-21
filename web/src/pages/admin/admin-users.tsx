import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, Folder, MoreVertical, Pencil, Plus, RefreshCcw, Trash, UsersRound } from "lucide-react";
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
import { getAllUsers, UserProps } from "@/hooks/use-user.hook";

export function AdminUsers() {

    const { data, refetch } = getAllUsers();

    async function handleRefresh() {
        await refetch();
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
                    />
                    <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                        <Filter size={20} />
                        Filter
                    </Button>
                    <Button onClick={handleRefresh} variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                        <RefreshCcw size={20} />
                        Refresh
                    </Button>
                    <Button className="flex items-center gap-2">
                        <Plus size={20} />
                        New User
                    </Button>
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
                            <TableHead className="text-right">Options</TableHead>
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
                                                            {role.key}
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
                                                        {user.type.toLowerCase()}
                                                    </Badge>
                                                )
                                                : (
                                                    <Badge variant={'secondary'}>
                                                        {user.type.toLowerCase()}
                                                    </Badge>
                                                )
                                        }
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant={'outline'} className="text-muted-foreground">
                                                    <MoreVertical size={20} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem className="cursor-pointer p-2" onSelect={(e) => e.preventDefault()}>
                                                    <DetailsDialog data={user}>
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
