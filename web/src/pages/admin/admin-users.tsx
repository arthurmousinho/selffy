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

export function AdminUsers() {

    const users = [
        {
            "id": "e87e328f-7f4a-4354-aeaa-c7039029ad3e",
            "name": "Jesse Mullen",
            "email": "mirandagomez@yahoo.com",
            "password": "(i6KdDGe0r",
            "roles": ["user.create", "user.delete", "user.edit", "project.create", "project.delete"],
            "userType": "default",
            "createdAt": "2024-09-12T14:00:00Z",
            "updatedAt": "2024-09-12T14:00:00Z"
        },
        {
            "id": "e6b0383c-77cb-4f8b-8824-4ad3de77e1d5",
            "name": "Evelyn Molina",
            "email": "rachelbrown@ibarra.com",
            "password": "!vY8AN$r#H",
            "roles": ["user.create", "user.delete", "user.edit", "project.create", "project.delete"],
            "userType": "admin",
            "createdAt": "2024-09-12T14:00:00Z",
            "updatedAt": "2024-09-12T14:00:00Z"
        },
        {
            "id": "685d98b3-dbee-43de-be8a-b71377ce4124",
            "name": "Willie Martin",
            "email": "hmartin@gmail.com",
            "password": "$oW0*LvgbZ",
            "roles": ["user.create", "user.delete", "user.edit", "project.create", "project.delete"],
            "userType": "default"
            , "createdAt": "2024-09-12T14:00:00Z",
            "updatedAt": "2024-09-12T14:00:00Z"
        },
        {
            "id": "bd9abffa-9285-4313-a579-1b230b910ae5",
            "name": "Jason Ball",
            "email": "stephaniestewart@hotmail.com",
            "password": "_$a8gSlfAy",
            "roles": ["user.create", "user.delete", "user.edit", "project.create", "project.delete"],
            "userType": "default",
            "createdAt": "2024-09-12T14:00:00Z",
            "updatedAt": "2024-09-12T14:00:00Z"
        },
        {
            "id": "7017d797-1a3c-4f69-97a3-4ddea36a23fc",
            "name": "Peter Evans",
            "email": "jeremiah26@roberts.com",
            "password": "w&f3SPu(*Y",
            "roles": ["user.create", "user.delete", "user.edit", "project.create", "project.delete"],
            "userType": "default",
            "createdAt": "2024-09-12T14:00:00Z",
            "updatedAt": "2024-09-12T14:00:00Z"
        }
    ];

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
                    <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
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
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>E-mail</TableHead>
                            <TableHead className="text-left">Password</TableHead>
                            <TableHead className="text-left w-[100px]">CreatedAt</TableHead>
                            <TableHead className="text-left w-[100px]">UpdatedAt</TableHead>
                            <TableHead className="text-left">Roles</TableHead>
                            <TableHead className="text-left">Type</TableHead>
                            <TableHead className="text-right">Options</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium max-w-[100px] truncate">
                                    {user.id}
                                </TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell className="max-w-[100px] truncate">{user.email}</TableCell>
                                <TableCell className="max-w-[100px] truncate">{user.password}</TableCell>
                                <TableCell className="max-w-[100px] truncate">{user.createdAt}</TableCell>
                                <TableCell className="max-w-[100px] truncate">{user.updatedAt}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="flex flex-row items-center gap-2 text-muted-foreground justify-center">
                                            {user.roles.length} Roles <ChevronDown size={20} />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {user.roles.map((role, index) => (
                                                <DropdownMenuItem key={index}>
                                                    {role}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                <TableCell className="text-left">
                                    {
                                        user.userType === 'admin' ?
                                            (
                                                <Badge variant={'default'}>
                                                    {user.userType}
                                                </Badge>
                                            )
                                            : (
                                                <Badge variant={'secondary'}>
                                                    {user.userType}
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
                        ))}
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
