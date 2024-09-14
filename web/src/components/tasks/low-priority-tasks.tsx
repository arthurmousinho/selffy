import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {
    Folder,
    MoreVertical,
    Pencil,
    Snail,
    Trash,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function LowPriorityTasks() {
    return (
        <Card>
            <CardHeader className="w-full h-auto flex flex-row items-center justify-between border-b">
                <header className="flex items-center gap-2">
                    <div
                        className="w-12 h-12 flex items-center justify-center rounded-xl text-xl bg-sky-200 text-sky-500"
                    >
                        <Snail />
                    </div>
                    <h2 className="font-semibold">
                        Low Priority
                    </h2>
                </header>
            </CardHeader>
            <CardContent className="pt-4">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="flex items-center gap-2 text-sm">
                                <div
                                    className="w-10 h-10 flex items-center justify-center rounded-xl text-xl bg-green-300"
                                >
                                    💬
                                </div>
                                Try to calculate the EXE feed, maybe it will index the multi-byte pixel!
                            </TableCell>
                            <TableCell className="text-right text-sm text-muted-foreground">
                                2024-09-20
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
                        <TableRow>
                            <TableCell className="flex items-center gap-2 text-sm">
                                <div
                                    className="w-10 h-10 flex items-center justify-center rounded-xl text-xl bg-green-300"
                                >
                                    💬
                                </div>
                                Try to calculate the EXE feed, maybe it will index the multi-byte pixel!
                            </TableCell>
                            <TableCell className="text-right text-sm text-muted-foreground">
                                2024-09-20
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
                        <TableRow>
                            <TableCell className="flex items-center gap-2 text-sm">
                                <div
                                    className="w-10 h-10 flex items-center justify-center rounded-xl text-xl bg-pink-300"
                                >
                                    💊
                                </div>
                                Try to calculate the EXE feed, maybe it will index the multi-byte pixel!
                            </TableCell>
                            <TableCell className="text-right text-sm text-muted-foreground">
                                2024-09-20
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
                        <TableRow>
                            <TableCell className="flex items-center gap-2 text-sm">
                                <div
                                    className="w-10 h-10 flex items-center justify-center rounded-xl text-xl bg-sky-300"
                                >
                                    📚
                                </div>
                                Try to calculate the EXE feed, maybe it will index the multi-byte pixel!
                            </TableCell>
                            <TableCell className="text-right text-sm text-muted-foreground">
                                2024-09-20
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
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}