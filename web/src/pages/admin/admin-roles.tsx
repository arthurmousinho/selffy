import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, Folder, MoreVertical, Pencil, Plus, RefreshCcw, Shield, Trash } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { DetailsDialog } from "@/components/global/details-dialog";

export function AdminRoles() {

    const roles = [
        {
            id: "f87e328f-7f4a-4354-aeaa-c7039029ad3e",
            key: "user.create",
            createdAt: "2024-09-12T14:00:00Z",
            updatedAt: "2024-09-12T14:00:00Z"
        },
        {
            id: "a6b0383c-77cb-4f8b-8824-4ad3de77e1d5",
            key: "user.delete",
            createdAt: "2024-09-12T14:00:00Z",
            updatedAt: "2024-09-12T14:00:00Z"
        },
        {
            id: "2d5a47b8-d59b-4c9a-bf83-4f644431f8e7",
            key: "user.edit",
            createdAt: "2024-09-12T14:00:00Z",
            updatedAt: "2024-09-12T14:00:00Z"
        },
        {
            id: "db3c6b78-9df4-4f27-a8e4-b3a83b7d6c92",
            key: "project.create",
            createdAt: "2024-09-12T14:00:00Z",
            updatedAt: "2024-09-12T14:00:00Z"
        },
        {
            id: "fd5a1d3e-92f2-48d4-9d6a-73b8c4c6f62f",
            key: "project.delete",
            createdAt: "2024-09-12T14:00:00Z",
            updatedAt: "2024-09-12T14:00:00Z"
        }
    ];

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
                        New Role
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Key</TableHead>
                            <TableHead className="text-left">CreatedAt</TableHead>
                            <TableHead className="text-left">UpdatedAt</TableHead>
                            <TableHead className="text-right">Options</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {roles.map((role) => (
                            <TableRow key={role.id}>
                                <TableCell className="font-medium">
                                    {role.id}
                                </TableCell>
                                <TableCell>{role.key}</TableCell>
                                <TableCell className="text-left">{role.createdAt}</TableCell>
                                <TableCell className="text-left">{role.updatedAt}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant={'outline'} className="text-muted-foreground">
                                                <MoreVertical size={20} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem className="cursor-pointer p-2" onSelect={(e) => e.preventDefault()}>
                                                <DetailsDialog data={role}>
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
                    Showing 5 of 100 items
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
