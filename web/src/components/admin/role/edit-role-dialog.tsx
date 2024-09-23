import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RoleProps, updateRole } from "@/hooks/use-role";
import { UserType } from "@/hooks/use-user";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";


interface EditUserDialogProps {
    data: RoleProps;
    children: React.ReactNode;
}

export function EditRoleDialog(props: EditUserDialogProps) {

    const formSchema = z.object({
        key: z.string({ message: "Key is required" }).min(1, { message: "Key is required" }),
        userTypes: z.array(z.string({ message: "User Types is required" })).nonempty({ message: "At least one user type must be selected" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            key: props.data.key,
            userTypes: props.data.userTypes,
        },
    });

    const { mutate: updateRoleFn } = updateRole();

    function onSubmit(values: z.infer<typeof formSchema>) {
        updateRoleFn({
            id: props.data.id,
            key: values.key,
            userTypes: values.userTypes as UserType[]
        });
    }

    return (
        <Dialog>
            <DialogTrigger>
                {props.children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="space-y-4">
                    <DialogTitle>
                        Edit User
                    </DialogTitle>
                    <DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="key"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Key</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex: user.delete.self"
                                                    {...field}
                                                    type="text"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="userTypes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>User Types</FormLabel>
                                            <FormControl>
                                                <Card className="space-y-4 p-4">
                                                    <div className="flex flex-row items-center gap-2">
                                                        <Checkbox
                                                            checked={field.value?.includes("ADMIN") || false}
                                                            onCheckedChange={(checked) => {
                                                                field.onChange(
                                                                    checked
                                                                        ? [...(field.value || []), "ADMIN"]
                                                                        : (field.value || []).filter(value => value !== "ADMIN")
                                                                );
                                                            }}
                                                        />
                                                        <Label className="text-muted-foreground">
                                                            Admin
                                                        </Label>
                                                    </div>
                                                    <div className="flex flex-row items-center gap-2">
                                                        <Checkbox
                                                            checked={field.value?.includes("DEFAULT") || false}
                                                            onCheckedChange={(checked) => {
                                                                field.onChange(
                                                                    checked
                                                                        ? [...(field.value || []), "DEFAULT"]
                                                                        : (field.value || []).filter(value => value !== "DEFAULT")
                                                                );
                                                            }}
                                                        />
                                                        <Label className="text-muted-foreground">
                                                            Default
                                                        </Label>
                                                    </div>
                                                </Card>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full">
                                    Save
                                </Button>
                            </form>
                        </Form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

}