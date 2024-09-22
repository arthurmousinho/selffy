import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface DeleteAlertDialogProps {
    children: React.ReactNode;
    onDelete: () => void;
}

export function DeleteAlertDialog(props: DeleteAlertDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {props.children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this item from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-muted-foreground">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={props.onDelete} className="bg-red-500 hover:bg-red-600">
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}