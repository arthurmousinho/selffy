import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
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
import { NewCostDialog } from "@/components/admin/cost/new-cost-dialog";
import { CostProps, deleteCost, getAllCosts, searchCostsByTitle } from "@/hooks/use-cost";
import { DeleteAlertDialog } from "@/components/global/delete-alert-dialog";
import { EditCostDialog } from "@/components/admin/cost/edit-cost-dialog";
import { useEffect, useState } from "react";

export function AdminCosts() {

    const [costsData, setCostsData] = useState<CostProps[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { data: getAllCostsData, refetch: refetchCosts } = getAllCosts();
    const { mutate: deleteCostFn } = deleteCost();
    const { data: searchCostsByTitleData } = searchCostsByTitle(searchTerm);

    useEffect(() => {
        if (!searchTerm && getAllCostsData) {
            setCostsData(getAllCostsData?.costs);
        }
        if (searchCostsByTitleData) {
            setCostsData(searchCostsByTitleData.costs);
        }
    }, [getAllCostsData, searchCostsByTitleData, searchTerm]);

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
                        Costs
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search..."
                        className="w-[250px]"
                        type="search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground">
                        <Filter size={20} />
                        Filter
                    </Button>
                    <Button
                        variant={'outline'}
                        className="flex items-center gap-2 text-muted-foreground"
                        onClick={() => refetchCosts()}
                    >
                        <RefreshCcw size={20} />
                        Refresh
                    </Button>
                    <NewCostDialog>
                        <Button className="flex items-center gap-2">
                            <Plus size={20} />
                            New Cost
                        </Button>
                    </NewCostDialog>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-left">Value</TableHead>
                            <TableHead className="text-left">PrejectId</TableHead>
                            <TableHead className="text-right">Details</TableHead>
                            <TableHead className="text-right">Edit</TableHead>
                            <TableHead className="text-right">Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            costsData.map((cost) => (
                                <TableRow key={cost.id}>
                                    <TableCell>{cost.title}</TableCell>
                                    <TableCell>{formatCurrency(cost.value)}</TableCell>
                                    <TableCell>{cost.projectId}</TableCell>
                                    <TableCell className="text-right">
                                        <DetailsDialog data={cost}>
                                            <Button className="text-muted-foreground" variant={'outline'}>
                                                <Folder size={20} />
                                            </Button>
                                        </DetailsDialog>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <EditCostDialog data={cost} > 
                                            <Button className="text-muted-foreground" variant={'outline'}>
                                                <Pencil size={20} />
                                            </Button>
                                        </EditCostDialog>
                                    </TableCell>
                                    <TableCell className="flex justify-end">
                                        <DeleteAlertDialog
                                            onDelete={() => deleteCostFn(cost.id)}
                                        >
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