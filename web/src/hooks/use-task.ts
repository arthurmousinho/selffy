import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { axios } from "@/lib/axios";
import { queryClient } from "@/main";
import { PageableMeta } from "@/types/pageable.type";

type TaskStatus = "PENDING" | "COMPLETED";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface TaskProps {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    status: TaskStatus;
    priority: TaskPriority;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface GetAllTasksResponse {
    tasks: TaskProps[];
    meta: PageableMeta;
}

export function getAllTasks(page: number, limit: number) {
    const query = useQuery({
        queryKey: ['tasks', page, limit],
        queryFn: async () => {
            const response = await axios.get(`/tasks?page=${page}&limit=${limit}`);
            return response.data as GetAllTasksResponse;
        }
    })
    return query;
}

interface CreateTaskProps {
    title: string;
    description: string;
    dueDate: Date;
    priority: TaskPriority;
    projectId: string;
}

export function createTask() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (data: CreateTaskProps) => {
            return await axios.post('/tasks', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast({
                title: "✅ Success",
                description: "Task was created successfully",
            })
        },
        onError: () => {
            toast({
                title: "❌ Error",
                description: "Something went wrong",
            });
        }
    })

    return query;
}

export function deleteTask() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (id: string) => {
            return await axios.delete(`/tasks/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast({
                title: "✅ Success",
                description: "Task was deleted successfully",
            })
        },
        onError: () => {
            toast({
                title: "❌ Error",
                description: "Something went wrong",
            });
        }
    })
    return query;
}

interface UpdateTaskProps {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
    priority: TaskPriority;
    projectId: string;
}

export function updateTask() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (data: UpdateTaskProps) => {
            return await axios.put('/tasks', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast({
                title: "✅ Success",
                description: "Task was updated successfully",
            })
        },
        onError: () => {
            toast({
                title: "❌ Error",
                description: "Something went wrong",
            });
        }
    })
    return query;
}

export function searchTasksByTitle(props: { title?: string, page?: number, limit?: number }) {
    const { title, page, limit } = props;
    const query = useQuery({
        queryKey: ['tasks', title],
        queryFn: async () => {
            const response = await axios.get(`/tasks/${title}?page=${page}&limit=${limit}`);
            return response.data as GetAllTasksResponse;
        },
        enabled: !!title && !!page && !!limit,
        staleTime: 5000
    });

    return query;
}