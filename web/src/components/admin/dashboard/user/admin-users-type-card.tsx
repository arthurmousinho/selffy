import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AdminUsersTypeCardProps {
    total: number;
    default: number;
    admin: number;
}

export function AdminUsersTypeCard(props: AdminUsersTypeCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Users Type Distribuition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center">
                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                Admin
                            </span>
                            <span className="text-sm text-muted-foreground">{props.admin} users</span>
                        </div>
                        <Progress value={(props.admin / props.total) * 100} className="mt-2" />
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="w-full">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                Default
                            </span>
                            <span className="text-sm text-muted-foreground">{props.default} users</span>
                        </div>
                        <Progress value={(props.default / props.total) * 100} className="mt-2"  />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}