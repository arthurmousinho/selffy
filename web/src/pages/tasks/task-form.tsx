import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarIcon, CheckCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { createTask, generateTaskDescription, getTaskById, TaskPriority, TaskStatus, updateTask } from "@/hooks/use-task";
import { TaskBadge } from "@/components/tasks/task-badge";
import { useLocation, useParams } from "react-router-dom";
import { AiAssistantSheet } from "@/components/tasks/ai-assistent-sheet";

const taskStatus = [
    { label: "Pending", value: "PENDING" },
    { label: "Completed", value: "COMPLETED" },
];

const taskPriorities = [
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MEDIUM" },
    { label: "High", value: "HIGH" },
];

export function TaskForm() {

    const isOnAdminPage = useLocation().pathname.includes("/admin/tasks");

    const projectId = useParams().id || '';
    const taskId = useParams().taskId || '';

    const [selectStatus, setSelectStatus] = useState<TaskStatus>("PENDING");
    const [selectPriority, setSelectPriority] = useState<TaskPriority>("LOW");

    const { mutate: createTaskFn } = createTask();
    const { mutate: updateTaskFn } = updateTask();
    const {
        mutate: generateTaskDescriptionFn,
        isPending: isGenerateTaskDescriptionPending,
        data: generatedDescription,
    } = generateTaskDescription();

    const { data: taskData } = getTaskById(taskId);
    const formSchema = z.object({
        title: z
            .string({ required_error: "Title is required" })
            .min(1, { message: "Title is required" }),
        description: z
            .string({ required_error: "Description is required" })
            .min(1, { message: "Description is required" }),
        dueDate: z
            .date({ required_error: "Due date is required" }),
        status: z
            .enum(["PENDING", "COMPLETED"], { required_error: "Status is required" }),
        priority: z
            .enum(["LOW", "MEDIUM", "HIGH"], { required_error: "Priority is required" }),
        projectId: z
            .string({ message: "Project Id is required" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: "PENDING",
            priority: "LOW",
            projectId: projectId,
        }
    });

    useEffect(() => {
        if (taskData) {
            setSelectStatus(taskData.task.status);
            setSelectPriority(taskData.task.priority);

            form.setValue("title", taskData.task.title);
            form.setValue("description", taskData.task.description);
            form.setValue("dueDate", new Date(taskData.task.dueDate));
            form.setValue("status", taskData.task.status);
            form.setValue("priority", taskData.task.priority);
            form.setValue("projectId", taskData.task.projectId || projectId);
        }
    }, [form, taskData, isOnAdminPage, projectId]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (taskData) {
            updateTaskFn({
                id: taskId,
                ...values,
                projectId,
            });
        }
        else {
            createTaskFn({
                ...values,
            });
        }
    }

    useEffect(() => {
        if (generatedDescription) {
            form.setValue("description", generatedDescription);
        }
    }, [generatedDescription, form]);

    function handleGenerateDescription() {
        generateTaskDescriptionFn({
            taskTitle: form.getValues("title"),
            projectId: projectId,
        });
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b">
                <header className="flex items-center gap-2">
                    <div className="w-10 h-10 flex border items-center justify-center rounded-xl">
                        <span className="text-sm">
                            <CheckCheck size={20} />
                        </span>
                    </div>
                    <h2 className="text-lg font-semibold" style={{ margin: 0 }}>
                        {taskId ? "Edit Task" : "Create Task"}
                    </h2>
                </header>
                <AiAssistantSheet />
            </CardHeader>
            <CardContent className="pt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <section className="w-full flex flex-row items-center gap-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ex: Create initial structure"
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
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col w-full">
                                        <FormLabel className="pb-2">Due Date</FormLabel>
                                        <Popover >
                                            <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date(new Date().setHours(0, 0, 0, 0))
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </section>
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
                                            onClick={handleGenerateDescription}
                                            disabled={isGenerateTaskDescriptionPending}
                                        >
                                            <Sparkles size={15} />
                                            {
                                                isGenerateTaskDescriptionPending ?
                                                    <span>Generating...</span>
                                                    :
                                                    <span>Generate with AI</span>
                                            }
                                        </Button>
                                    </header>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Ex: In this task we will create the initial structure of the application"
                                            className="min-h-[200px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Priority</FormLabel>
                                    <FormControl>
                                        <div className="grid grid-cols-3 gap-4">
                                            {taskPriorities.map((priority, index) => (
                                                <Button
                                                    type="button"
                                                    key={index}
                                                    variant={"outline"}
                                                    className={`flex py-8 items-center gap-2 justify-start transition-all ${selectPriority === priority.value
                                                        ? `ring-2 ring-offset-2 ring-default`
                                                        : ""
                                                        }`}
                                                    onClick={() => {
                                                        setSelectPriority(priority.value as TaskPriority);
                                                        field.onChange(priority.value);
                                                    }}
                                                >
                                                    <TaskBadge priority={priority.value as TaskPriority} />
                                                    {priority.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <section className="flex flex-row items-center gap-4 justify-between">
                            {taskData && (
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {taskStatus.map((status, index) => (
                                                        <Button
                                                            type="button"
                                                            key={index}
                                                            variant={"outline"}
                                                            className={`flex items-center gap-2 justify-start transition-all ${selectStatus === status.value && `ring-2 ring-offset-2 ring-default`}`}
                                                            onClick={() => {
                                                                setSelectStatus(status.value as TaskStatus);
                                                                field.onChange(status.value);
                                                            }}
                                                        >
                                                            <div className={`w-2 h-2 rounded-full ${status.value === "COMPLETED" ? 'bg-green-500' : 'bg-slate-500'
                                                                }`} />
                                                            <span className={`${status.value === 'COMPLETED' ? 'text-green-500' : 'text-slate-500'}`}>
                                                                {status.label}
                                                            </span>
                                                        </Button>
                                                    ))}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            {isOnAdminPage && (
                                <FormField
                                    control={form.control}
                                    name="projectId"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Project Id</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex: a22c6e97-5e30-4f37-8aa2-4e03b192b510"
                                                    {...field}
                                                    type="text"
                                                    defaultValue={field.value}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </section>
                        <footer className="flex justify-end">
                            <Button type="submit">
                                Save Task
                            </Button>
                        </footer>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
