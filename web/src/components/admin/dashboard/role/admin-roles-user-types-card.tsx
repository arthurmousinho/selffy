import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AdminRolesUserTypesCardProps {
    total: number;
    admin: number;
    default: number;
}

export function AdminRolesUserTypesCard(props: AdminRolesUserTypesCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Types Roles Distribuition</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Admin</span>
                                <span className="text-sm text-muted-foreground">{props.admin} roles</span>
                            </div>
                            <Progress value={(props.admin / props.total) * 100} className="mt-2" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Default</span>
                                <span className="text-sm text-muted-foreground">{props.default} roles</span>
                            </div>
                            <Progress value={(props.default / props.total) * 100} className="mt-2" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}