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
import { z } from "zod"
import { ProjectProps, updateProject } from "@/hooks/use-project";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { getAllUsers, UserProps } from "@/hooks/use-user";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { decodeToken } from "@/hooks/use-token";

const colorOptions = [
    { label: "Red", class: "bg-red-300", hex: "#fca5a5" },
    { label: "Sky", class: "bg-sky-300", hex: "#7dd3fc" },
    { label: "Amber", class: "bg-amber-300", hex: "#fcd34d" },
    { label: "Pink", class: "bg-pink-300", hex: "#f9a8d4" },
    { label: "Green", class: "bg-green-300", hex: "#86efac" },
    { label: "Rose", class: "bg-rose-300", hex: "#fda4af" },
    { label: "Purple", class: "bg-purple-300", hex: "#d8b4fe" },
    { label: "Orange", class: "bg-orange-300", hex: "#fdba74" },
    { label: "Blue", class: "bg-blue-300", hex: "#93c5fd" },
]


interface EditProjectDialogProps {
    data: ProjectProps;
    children: ReactNode;
    adminMode: boolean;
}

export function EditProjectDialog(props: EditProjectDialogProps) {

    const [selectedColor, setSelectedColor] = useState<string>(props.data.color);

    const { data: getAllUsersData } = props.adminMode ? getAllUsers(1, 10) : { data: null };
    const { mutate: updateProjectFn } = updateProject();

    const formSchema = z.object({
        title: z
            .string({ message: "Title is required" })
            .trim()
            .min(1, { message: "Title is required" }),
        status: z
            .enum(["IN_PROGRESS", "FINISHED"], { message: "Status is required" }),
        description: z
            .string({ message: "Description is required" })
            .trim()
            .min(1, { message: "Description is required" }),
        revenue: z
            .number({ message: "Revenue is required" })
            .positive({ message: "Revenue must be a positive number" })
            .min(1, { message: "Revenue is required" }),
        icon: z
            .string({ message: "Icon is required" })
            .trim()
            .min(1, { message: "Icon is required" })
            .max(2, { message: "Icon must have just one character" }),
        color: z
            .string({ message: "Color is required" })
            .min(1, { message: "Color is required" }),
        ownerId: z
            .string({ message: "Owner is required" })
            .min(1, { message: "Owner is required" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: props.data.title,
            description: props.data.description,
            revenue: props.data.revenue,
            icon: props.data.icon,
            color: props.data.color,
            status: props.data.status,
            ownerId: props.data.ownerId,
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        updateProjectFn({
            id: props.data.id,
            title: values.title,
            description: values.description,
            revenue: values.revenue,
            icon: values.icon,
            color: values.color,
            status: values.status,
            ownerId: values.ownerId,
        });
    }

    if (!props.adminMode) {
        const userId = decodeToken()?.sub;
        form.setValue("ownerId", userId ?? '');
    }

    return (
        <Dialog>
            <DialogTrigger>
                {props.children}
            </DialogTrigger>
            <DialogContent className="overflow-y-scroll max-h-[90vh]">
                <DialogHeader className="space-y-4">
                    <DialogTitle>
                        Edit Project
                    </DialogTitle>
                    <DialogDescription>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex: Landing Page"
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
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Ex: A simple landing page for marketing company"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="revenue"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Revenue</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex: R$ 1000,00"
                                                    onChange={event => field.onChange(Number(event.target.value))}
                                                    type="number"
                                                    defaultValue={field.value}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="icon"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Icon</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Ex: 🚀"
                                                    type="emoji"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="color"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Color</FormLabel>
                                            <FormControl>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {colorOptions.map((color) => (
                                                        <Button
                                                            type="button"
                                                            key={color.hex}
                                                            variant={'outline'}
                                                            className={`flex items-center gap-2 justify-start transition-all ${selectedColor === color.hex ? `ring-2 ring-offset-2 ring-default` : ""}`}
                                                            onClick={() => {
                                                                field.onChange(color.hex);
                                                                setSelectedColor(color.hex);
                                                            }}
                                                        >
                                                            <div className={`h-6 w-6 rounded-full ${color.class}`} />
                                                            {color.label}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    defaultValue={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="IN_PROGRESS" id="IN_PROGRESS" />
                                                        <Label htmlFor="IN_PROGRESS">In Progress</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="FINISHED" id="FINISHED" />
                                                        <Label htmlFor="FINISHED">Finished</Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {
                                    props.adminMode && (
                                        <FormField
                                            control={form.control}
                                            name="ownerId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Owner</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)}
                                                            defaultValue={field.value}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select the owner" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {
                                                                    getAllUsersData?.users?.map((user: UserProps) => (
                                                                        <SelectItem
                                                                            key={user.id}
                                                                            value={user.id}
                                                                            className="cursor-pointer"
                                                                        >
                                                                            {user.name}
                                                                        </SelectItem>
                                                                    ))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )
                                }
                                <Button className="w-full" type="submit">
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