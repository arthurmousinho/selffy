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
    Pencil,
    Plus,
    RefreshCcw,
    Shield,
    Trash
}
    from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { DetailsDialog } from "@/components/global/details-dialog";
import { DeleteAlertDialog } from "@/components/global/delete-alert-dialog";
import { Badge } from "@/components/ui/badge";
import { getAllRoles, RoleProps } from "@/hooks/use-role";
import { UserType } from "@/hooks/use-user";
import { NewRoleDialog } from "@/components/admin/role/new-role-dialog";

export function AdminRoles() {

    const { data: fetchRoleData, refetch: refetchRoles } = getAllRoles();

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
                        placeholder="Search..."
                        className="w-[250px]"
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
                            fetchRoleData?.roles.map((role: RoleProps) => (
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
                                        <Button className="text-muted-foreground" variant={'outline'}>
                                            <Pencil size={20} />
                                        </Button>
                                    </TableCell>
                                    <TableCell className="flex justify-end">
                                        <DeleteAlertDialog onDelete={() => console.log('delete')}>
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
