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
import { createUser } from "@/hooks/use-user";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


interface NewUserDialogProps {
    children: React.ReactNode;
}

export function NewUserDialog(props: NewUserDialogProps) {

    const formSchema = z.object({
        name: z.string({ message: "Name is required" }).min(1, { message: "Name is required" }),
        email: z.string({ message: "Email is required" }).email({ message: "Invalid email" }),
        password: z.string({ message: "Password is required" }),
        type: z.enum(["DEFAULT", "ADMIN"], { message: "Type is required" }),
        plan: z.enum(["FREE", "PREMIUM"], { message: "Plan is required" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            type: "DEFAULT",
            plan: "FREE",
        },
    })

    const { mutate: createUserFn } = createUser();

    function onSubmit(values: z.infer<typeof formSchema>) {
        createUserFn({
            name: values.name,
            email: values.email,
            password: values.password,
            type: values.type,
            plan: values.plan,
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
                        New User
                    </DialogTitle>
                    <DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John Doe"
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
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="example@email.com"
                                                    {...field}
                                                    type="email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="********"
                                                    {...field}
                                                    type="password"
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