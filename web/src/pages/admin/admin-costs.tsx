import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
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
import { DetailsDialog } from "@/components/global/details-dialog";
import { formatCurrency } from "@/utils/format-currency";
import { NewCostDialog } from "@/components/admin/cost/new-cost-dialog";
import { deleteCost, getAllCosts, GetAllCostsResponse, searchCostsByTitle } from "@/hooks/use-cost";
import { DeleteAlertDialog } from "@/components/global/delete-alert-dialog";
import { EditCostDialog } from "@/components/admin/cost/edit-cost-dialog";
import { useEffect, useState } from "react";
import { Paginator } from "@/components/global/paginator";

export function AdminCosts() {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const [data, setData] = useState<GetAllCostsResponse>();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { data: getAllCostsData, refetch: refetchCosts } = getAllCosts(page, limit);
    const { mutate: deleteCostFn } = deleteCost();
    const { data: searchCostsByTitleData } = searchCostsByTitle({
        title: searchTerm,
        page,
        limit
    });

    useEffect(() => {
        if (!searchTerm && getAllCostsData) {
            setData(getAllCostsData);
        }
        if (searchCostsByTitleData) {
            setData(searchCostsByTitleData);
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
                    <NewCostDialog adminMode={true}>
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
                            data?.costs.map((cost) => (
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
                                        <EditCostDialog data={cost} adminMode={true}>
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
            <CardFooter>
                <Paginator
                    showing={data?.costs.length || 0}
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