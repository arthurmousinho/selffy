import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Folder, SmileIcon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createProject, getProjectById, updateProject } from "@/hooks/use-project";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { decodeToken } from "@/hooks/use-token";
import { useLocation, useParams } from "react-router-dom";

const colorOptions = [
    { label: "Sky", class: "bg-sky-300", hex: "#7dd3fc" },
    { label: "Amber", class: "bg-amber-300", hex: "#fcd34d" },
    { label: "Pink", class: "bg-pink-300", hex: "#f9a8d4" },
    { label: "Green", class: "bg-green-300", hex: "#86efac" },
    { label: "Rose", class: "bg-rose-300", hex: "#fda4af" },
    { label: "Purple", class: "bg-purple-300", hex: "#d8b4fe" },
];

const projectStatus = [
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Finished", value: "FINISHED" },
];

export function ProjectForm() {

    const isOnAdminPage = useLocation().pathname.includes("/admin/projects");

    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [selectStatus, setSelectStatus] = useState<"IN_PROGRESS" | "FINISHED">("IN_PROGRESS");

    const { mutate: createProjectFn } = createProject();
    const { mutate: updateProjectFn } = updateProject();

    const projectId = useParams().id;
    const { data: projectData } = projectId ? getProjectById(projectId) : { data: null };

    const formSchema = z.object({
        title: z
            .string()
            .trim()
            .min(1, { message: "Title is required" }),
        description: z
            .string()
            .trim()
            .min(1, { message: "Description is required" }),
        revenue: z
            .number({ message: "Revenue is required" })
            .positive({ message: "Revenue must be a positive number" })
            .min(1, { message: "Revenue is required" }),
        icon: z
            .string({ message: "Icon is required" })
            .trim(),
        color: z
            .string()
            .min(1, { message: "Color is required" }),
        status: z
            .enum(["IN_PROGRESS", "FINISHED"], { message: "Status is required" }),
        ownerId: z
            .string()
            .min(1, { message: "Owner is required" })
            .uuid({ message: "Owner must be a valid UUID" })
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: "IN_PROGRESS",
        },
    });

    useEffect(() => {
        const userId = decodeToken()?.sub || '';
        if (!isOnAdminPage) {
            form.setValue("ownerId", userId);
        }

        if (projectData) {
            setSelectStatus(projectData.project.status || "IN_PROGRESS");
            setSelectedEmoji(projectData.project.icon || "");
            setSelectedColor(projectData.project.color || "");

            form.setValue("title", projectData.project.title);
            form.setValue("description", projectData.project.description);
            form.setValue("revenue", projectData.project.revenue);
            form.setValue("icon", projectData.project.icon);
            form.setValue("color", projectData.project.color);
            form.setValue("status", projectData.project.status);
            form.setValue("ownerId", projectData.project.ownerId);
        }
    }, [projectData, form]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        if (projectId) {
            updateProjectFn({
                id: projectId,
                ...values,
            });
            return;
        }

        createProjectFn({
            ...values
        });

        setSelectedColor(null);
        setSelectedEmoji(null);
        setSelectStatus("IN_PROGRESS");
        form.reset();
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2 border-b">
                <div className="w-10 h-10 flex border items-center justify-center rounded-xl">
                    <span className="text-sm">
                        <Folder size={20} />
                    </span>
                </div>
                <h2 className="text-lg font-semibold" style={{ margin: 0 }}>
                    {projectData ? "Edit Project" : "Create Project"}
                </h2>
            </CardHeader>
            <CardContent className="pt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Landing Page" {...field} type="text" />
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
                                    <header className="w-full flex items-center justify-between">
                                        <FormLabel>Description</FormLabel>
                                        <Button 
                                            variant={'link'} 
                                            className="flex items-center gap-2 p-0 m-0 h-auto"
                                            type="button"
                                        >
                                            <Sparkles size={15} />
                                            Generate with AI
                                        </Button>
                                    </header>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Ex: A simple landing page for marketing company"
                                            {...field}
                                            className="min-h-[200px]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <section className="flex flex-row items-center gap-4 justify-between">
                            <FormField
                                control={form.control}
                                name="revenue"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Revenue</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: R$ 1000,00"
                                                onChange={(event) => field.onChange(Number(event.target.value))}
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
                                    <FormItem className="flex flex-col w-full">
                                        <FormLabel className="pb-2">Icon</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl defaultValue={field.value}>
                                                    <Button
                                                        variant={"outline"}
                                                        className={`w-full pl-3 text-left font-normal ${!selectedEmoji && "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {selectedEmoji ? selectedEmoji : <span>Select an emoji</span>}
                                                        <SmileIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <EmojiPicker
                                                    onEmojiClick={(emoji: EmojiClickData) => {
                                                        setSelectedEmoji(emoji.emoji);
                                                        field.onChange(emoji.emoji);
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </section>
                        <section className="flex flex-row items-center gap-4 justify-between">
                            {
                                projectData && (
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Status</FormLabel>
                                                <FormControl>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        {projectStatus.map((status, index) => (
                                                            <Button
                                                                type="button"
                                                                key={index}
                                                                variant={"outline"}
                                                                className={`flex items-center gap-2 justify-start transition-all ${selectStatus === status.value
                                                                    ? `ring-2 ring-offset-2 ring-default`
                                                                    : ""
                                                                    }`}
                                                                onClick={() => {
                                                                    setSelectStatus(status.value as "IN_PROGRESS" | "FINISHED");
                                                                    field.onChange(status.value);
                                                                }}
                                                            >
                                                                {status.label}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )
                            }
                            <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Color</FormLabel>
                                        <FormControl>
                                            <div className="grid grid-cols-3 gap-2">
                                                {colorOptions.map((color) => (
                                                    <Button
                                                        type="button"
                                                        key={color.hex}
                                                        variant={"outline"}
                                                        className={`flex items-center gap-2 justify-start transition-all ${selectedColor === color.hex
                                                            ? `ring-2 ring-offset-2 ring-default`
                                                            : ""
                                                            }`}
                                                        onClick={() => {
                                                            field.onChange(color.hex);
                                                            setSelectedColor(color.hex);
                                                        }}
                                                    >
                                                        <div
                                                            className={`h-5 w-5 rounded-full ${color.class}`}
                                                            style={{ marginRight: "0.5rem" }}
                                                        ></div>
                                                        {color.label}
                                                    </Button>
                                                ))}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </section>
                        {
                            isOnAdminPage && (
                                <FormField
                                    control={form.control}
                                    name="ownerId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Owner Id</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex: a22c6e97-5e30-4f37-8aa2-4e03b192b510"
                                                    {...field}
                                                    type="text"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )
                        }
                        <footer className="flex justify-end">
                            <Button type="submit">
                                Save Project
                            </Button>
                        </footer>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
