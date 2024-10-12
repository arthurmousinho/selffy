import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { getInProgressProjects, ProjectProps } from "@/hooks/use-project"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Label } from '@/components/ui/label'
import { TaskProps, updateTask } from '@/hooks/use-task'

interface EditTaskDialogProps {
    children: React.ReactNode;
    data: TaskProps;
}

export function EditTaskDialog(props: EditTaskDialogProps) {
    const formSchema = z.object({
        title: z.string({ message: "Title is required" }).min(1, { message: "Title is required" }),
        description: z.string({ message: "Description is required" }).min(1, { message: "Description is required" }),
        dueDate: z.date({ message: "Due date is required" }),
        status: z.enum(["PENDING", "COMPLETED"], { message: "Status is required" }),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"], { message: "Priority is required" }),
        projectId: z.string({ message: "Project is required" }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: props.data.title,
            description: props.data.description,
            dueDate: props.data.dueDate,
            status: props.data.status,
            priority: props.data.priority,
            projectId: props.data.projectId,
        }
    })

    const { data: getInProgressProjectsData } = getInProgressProjects();
    const { mutate: updateTaskFn } = updateTask();

    function onSubmit(values: z.infer<typeof formSchema>) {
        updateTaskFn({
            id: props.data.id,
            title: values.title,
            description: values.description,
            dueDate: values.dueDate,
            status: values.status,
            priority: values.priority,
            projectId: values.projectId,
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {props.children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Task</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-muted-foreground">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Create initial structure" {...field} />
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
                                            placeholder="Ex: In this task we will create the initial structure of the application"
                                            {...field}
                                        />
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
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="flex items-center gap-10"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="PENDING" id="PENDING" />
                                                <Label htmlFor="PENDING">Pending</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="COMPLETED" id="COMPLETED" />
                                                <Label htmlFor="COMPLETED">Completed</Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="flex items-center gap-10"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="LOW" id="LOW" />
                                                <Label htmlFor="LOW">Low</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="MEDIUM" id="MEDIUM" />
                                                <Label htmlFor="MEDIUM">Medium</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="HIGH" id="HIGH" />
                                                <Label htmlFor="HIGH">High</Label>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Due Date</FormLabel>
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
                        <FormField
                            control={form.control}
                            name="projectId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a project" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {getInProgressProjectsData?.projects.map((project: ProjectProps) => (
                                                <SelectItem key={project.id} value={project.id}>
                                                    {project.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Save</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}