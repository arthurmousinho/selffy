import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { axios } from "@/lib/axios";
import { queryClient } from "@/main";

export interface TaskProps {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: "LOW" | "MEDIUM" | "HIGH";
    status: "PENDING" | "COMPLETED";
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface GetAllTasksResponse {
    tasks: TaskProps[]
}

export function getAllTasks() {
    const query = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await axios.get('/tasks');
            return response.data as GetAllTasksResponse;
        }
    })
    return query;
}

interface CreateTaskProps {
    title: string;
    description: string;
    dueDate: Date;
    priority: "LOW" | "MEDIUM" | "HIGH";
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
    status: "PENDING" | "COMPLETED";
    dueDate: Date;
    priority: "LOW" | "MEDIUM" | "HIGH";
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

export function searchTasksByTitle(title?: string) {
    const query = useQuery({
        queryKey: ['tasks', title],
        queryFn: async () => {
            const response = await axios.get(`/tasks/${title}`);
            return response.data as GetAllTasksResponse;
        },
        enabled: !!title,
        staleTime: 5000
    })
    return query;
}