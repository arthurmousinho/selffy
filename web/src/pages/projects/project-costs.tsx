import { useParams } from "react-router-dom";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getProjectById } from "@/hooks/use-project";
import { NewCostDialog } from "@/components/admin/cost/new-cost-dialog";
import { CostProps } from "@/hooks/use-cost";
import { formatCurrency } from "@/utils/format-currency";


export function ProjectCosts() {

    const projectIdFromRoute = useParams().id;
    const { data: projectData } = getProjectById(projectIdFromRoute || '');

    return (
        <main className="space-y-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <header className="flex items-center gap-2">
                        <div
                            className="w-14 h-14 flex items-center justify-center rounded-xl"
                            style={{ backgroundColor: projectData?.project.color }}
                        >
                            <span className="text-2xl">{projectData?.project.icon}</span>
                        </div>
                        <div className="space-y-2">
                            <h2 className="font-semibold">
                                {projectData?.project.title}' costs
                            </h2>
                            <span className="text-sm text-muted-foreground font-semibold">
                                {projectData?.project.tasks} costs
                            </span>
                        </div>
                    </header>
                    <nav>
                        <NewCostDialog
                            projectId={projectData?.project.id}
                            adminMode={false}
                        >
                            <Button className="flex items-center gap-2">
                                <Plus />
                                New Cost
                            </Button>
                        </NewCostDialog>
                    </nav>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead className="text-right">Value</TableHead>
                                <TableHead className="text-right">Edit</TableHead>
                                <TableHead className="text-right">Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[].map((cost: CostProps) => (
                                <TableRow>
                                    <TableCell>{cost.title}</TableCell>
                                    <TableCell className="text-right">
                                        {formatCurrency(cost.value)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardHeader>
            </Card>
        </main>
    )
}