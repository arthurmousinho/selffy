import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { axios } from "@/lib/axios";
import { queryClient } from "@/main";


export interface ProjectProps {
    id: string;
    title: string;
    description: string;
    revenue: number;
    icon: string;
    status: 'IN_PROGRESS' | 'FINISHED';
    tasks: any[];
    color: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface GetAllProjectsResponse {
    projects: ProjectProps[]
}

export function getAllProjects() {
    const query = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await axios.get('/projects');
            return response.data as GetAllProjectsResponse;
        }
    })

    return query;
}

interface CreateProjectProps {
    title: string;
    description: string;
    revenue: number;
    icon: string
    color: string;
    ownerId: string;
}

export function createProject() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (newProject: CreateProjectProps) => {
            return await axios.post('/projects', newProject);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            toast({
                title: "✅ Success",
                description: "Project was created successfully",
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

export function deleteProject() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (id: string) => {
            return await axios.delete(`/projects/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            toast({
                title: "✅ Success",
                description: "Project was deleted successfully",
            });
        },
        onError: () => {
            toast({
                title: "❌ Error",
                description: "Something went wrong",
            });
        }
    });

    return query;
}