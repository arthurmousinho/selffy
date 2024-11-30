import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Lock, Upload, UserRound } from "lucide-react";
import { getUserById } from "@/hooks/use-user";
import { decodeToken } from "@/hooks/use-token";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect } from "react";
import { ChangePasswordDialog } from "./change-password-dialog";
import { UploadAvatarDialog } from "./upload-avatar-dialog";

export function ProfileSettings() {

    const userId = decodeToken()?.sub || '';
    const { data } = getUserById(userId);

    const formSchema = z.object({
        name: z
            .string({ message: "Name is required" })
            .trim()
            .min(1, { message: "Name is required" })
            .max(255, { message: "Name must be less than 255 characters" }),
        email: z
            .string({ message: "Email is required" })
            .min(1, { message: "Email is required" })
            .max(255, { message: "Email must be less than 255 characters" })
            .trim()
            .email({ message: "Invalid email" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name,
            email: data?.email,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    useEffect(() => {
        if (data) {
            form.setValue("name", data.name);
            form.setValue("email", data.email);
        }
    }, [data]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2 border-b">
                <div className="w-10 h-10 flex border items-center justify-center rounded-xl">
                    <span className="text-sm">
                        <UserRound size={20} />
                    </span>
                </div>
                <h2 className="text-lg font-semibold">
                    Profile
                </h2>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        {data?.role !== 'ADMIN' && (
                            <div className="space-y-2">
                                <Label className="text-muted-foreground font-medium">
                                    Avatar
                                </Label>
                                <div className="flex flex-row items-center gap-4">
                                    <Avatar>
                                        <AvatarFallback>
                                            {data?.name?.split(' ')[0].charAt(0)}
                                            {data?.name?.split(' ')[1]?.charAt(0) || ''}
                                        </AvatarFallback>
                                    </Avatar>
                                    <UploadAvatarDialog>
                                        <Button variant={'outline'} className="flex items-center gap-2 text-muted-foreground" type="button">
                                            <Upload size={20} />
                                            Upload image
                                        </Button>
                                    </UploadAvatarDialog>
                                </div>
                            </div>
                        )}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            type="text"
                                            {...field}
                                            value={field.value}
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
                                            type="email"
                                            {...field}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-2 flex flex-col">
                            <Label
                                className="text-muted-foreground font-medium"
                                htmlFor="change-password-button"
                            >
                                Password
                            </Label>
                            <ChangePasswordDialog>
                                <Button
                                    variant={'outline'}
                                    className="flex items-center gap-2 text-muted-foreground w-auto focus:outline-none"
                                    type="button"
                                    id="change-password-button"
                                >
                                    <Lock size={20} />
                                    Change password
                                </Button>
                            </ChangePasswordDialog>
                        </div>
                        <CardFooter className="flex justify-end">
                            <Button type="submit">
                                Save changes
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </CardContent>
        </Card >
    )
}