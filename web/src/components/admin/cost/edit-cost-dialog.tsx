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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { getAllProjects, ProjectProps } from "@/hooks/use-project";
import { CostProps, updateCost } from "@/hooks/use-cost";

interface EditCostDialogProps {
    data: CostProps;
    children: React.ReactNode;
}

export function EditCostDialog(props: EditCostDialogProps) {

    const formSchema = z.object({
        title: z
            .string({ message: "Title is required" })
            .trim()
            .min(1, { message: "Title is required" }),
        value: z
            .number({ message: "Value is required" })
            .positive({ message: "Value must be greater than 0" })
            .min(1, { message: "Value must be greater than 0" }),
        projectId: z
            .string({ message: "Project is required" })
            .trim()
            .min(1, { message: "Project is required" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: props.data.title,
            value: props.data.value,
            projectId: props.data.projectId,
        }
    })

    const { data: getAllProjectsData } = getAllProjects();
    const { mutate: updateCostFn } = updateCost();

    function onSubmit(values: z.infer<typeof formSchema>) {
        updateCostFn({
            id: props.data.id,
            title: values.title,
            value: values.value,
            projectId: values.projectId,
        })
    }

    return (
        <Dialog>
            <DialogTrigger>
                {props.children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="space-y-4">
                    <DialogTitle>
                        Edit Cost
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
                                                    placeholder="Ex: Host Cost"
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
                                    name="value"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Value</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex: R$ 200,00"
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    type="number"
                                                    defaultValue={props.data.value}
                                                />
                                            </FormControl>
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
                                            <FormControl>
                                                <Select
                                                    onValueChange={(value) => field.onChange(value)}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select the project" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            getAllProjectsData?.projects?.map((project: ProjectProps) => (
                                                                <SelectItem
                                                                    key={project.id}
                                                                    value={project.id}
                                                                    className="cursor-pointer"
                                                                >
                                                                    {project.title}
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