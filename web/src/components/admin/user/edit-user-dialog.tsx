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
import { updateUser, UserProps } from "@/hooks/use-user";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";


interface EditUserDialogProps {
    data: UserProps;
    children: React.ReactNode;
}

export function EditUserDialog(props: EditUserDialogProps) {

    const formSchema = z.object({
        name: z.string({ message: "Name is required" }).min(1, { message: "Name is required" }),
        email: z.string({ message: "Email is required" }).email({ message: "Invalid email" }),
        type: z.enum(["DEFAULT", "ADMIN"], { message: "Type is required" }),
        plan: z.enum(["FREE", "PREMIUM"], { message: "Plan is required" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: props.data.name,
            email: props.data.email,
            type: props.data.type,
            plan: props.data.plan,
        }
    })

    const { mutate: updateUserFn } = updateUser();

    function onSubmit(values: z.infer<typeof formSchema>) {
        updateUserFn({
            id: props.data.id,
            name: values.name,
            email: values.email,
            type: values.type,
            plan: values.plan,
        });
        return;
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
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="John Doe"
                                                    type="text"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="example@email.com"
                                                    type="email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex flex-row items-center justify-start gap-10">
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Type</FormLabel>
                                                <FormControl>
                                                    <RadioGroup value={field.value} onValueChange={field.onChange}>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="DEFAULT" id="DEFAULT" />
                                                            <Label htmlFor="DEFAULT">Default</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="ADMIN" id="ADMIN" />
                                                            <Label htmlFor="ADMIN">Admin</Label>
                                                        </div>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="plan"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Plan</FormLabel>
                                                <FormControl>
                                                    <RadioGroup value={field.value} onValueChange={field.onChange}>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="FREE" id="FREE" />
                                                            <Label htmlFor="FREE">Free</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="PREMIUM" id="PREMIUM" />
                                                            <Label htmlFor="PREMIUM">Premium</Label>
                                                        </div>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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