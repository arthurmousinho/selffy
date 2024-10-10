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
import { createCost } from "@/hooks/use-cost";

interface NewCostDialogProps {
    children: React.ReactNode;
}

export function NewCostDialog(props: NewCostDialogProps) {

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
        resolver: zodResolver(formSchema)
    })

    const { data: getAllProjectsData } = getAllProjects();
    const { mutate: createCostFn } = createCost();

    function onSubmit(values: z.infer<typeof formSchema>) {
        createCostFn({
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
                        New Cost
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
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select the owner" />
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