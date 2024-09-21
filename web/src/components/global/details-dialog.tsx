import { ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label";
import { isArray } from "@/utils/is-array";
import { Card, CardHeader } from "../ui/card";


interface DetailsDialogProps {
    children: ReactNode;
    data: Record<string, any>;
}

export function DetailsDialog(props: DetailsDialogProps) {
    return (
        <Dialog>
            <DialogTrigger>
                {props.children}
            </DialogTrigger>
            <DialogContent className="h-[500px] min-w-[600px] overflow-y-auto overflow-x-hidden">
                <DialogHeader>
                    <DialogTitle>Details</DialogTitle>
                </DialogHeader>
                {
                    Object.entries(props.data).map(([key, value], index) => (
                        <Card key={index}>
                            <CardHeader>
                                <Label className="text-sm font-semibold text-muted-foreground">
                                    {key}:
                                </Label>
                                {
                                    isArray(value) ? (
                                        <ul className="list-disc ml-5 text-sm text-muted-foreground">
                                            {value.map((item, i) => (
                                                <li key={i}>
                                                    {item?.toString()}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span className="text-sm text-muted-foreground">
                                            {value?.toString()}
                                        </span>
                                    )
                                }
                            </CardHeader>
                        </Card>
                    ))
                }
            </DialogContent>
        </Dialog>
    );
}
