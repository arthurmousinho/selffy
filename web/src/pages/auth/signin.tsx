import GoogleIcon from "@/components/icons/googleIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authUser } from "@/hooks/use-user";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect } from "react";
import { removeToken } from "@/hooks/use-token";

export function SignIn() {

    useEffect(() => {
        removeToken()
    }, []);

    const formSchema = z.object({
        email: z
            .string({ message: "Email is required" })
            .min(1, { message: "Email is required" })
            .trim()
            .email({ message: "Invalid email" }),
        password: z
            .string({ message: "Password is required" })
            .min(1, { message: "Password is required" })
            .trim(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { mutate: authUserFn } = authUser();

    function onSubmit(values: z.infer<typeof formSchema>) {
        authUserFn({
            email: values.email,
            password: values.password
        });
    }

    return (
        <Form {...form}>
            <form className="w-[500px] space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <header className="flex flex-row justify-between">
                    <div className="flex flex-col ">
                        <h2 className="text-2xl font-semibold">
                            Wellcome Back
                        </h2>
                        <span className="text-sm text-muted-foreground">
                            Enter your email below to access your account
                        </span>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVertical size={20} className="text-muted-foreground" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Auth Asistent</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                                Forgot your password?
                            </DropdownMenuItem>
                            <Link to={'/auth/signup'}>
                                <DropdownMenuItem className="cursor-pointer">
                                    Don't you have an account?
                                </DropdownMenuItem>
                            </Link>
                            <Link to={'/auth/signin'}>
                                <DropdownMenuItem className="cursor-pointer">
                                    Already have an account?
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="example@email.com"
                                    type="email"
                                    {...field}
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
                                    placeholder="******"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full">
                    Sign In
                </Button>
                <Button variant={'outline'} className="w-full flex flex-row items-center gap-2">
                    <GoogleIcon />
                    Sign In with Google
                </Button>
            </form>
        </Form>
    )
}