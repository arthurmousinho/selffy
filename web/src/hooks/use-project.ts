import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { axios } from "@/lib/axios";
import { queryClient } from "@/main";
import { PageableMeta } from "@/types/pageable.type";


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

export interface GetAllProjectsResponse {
    projects: ProjectProps[],
    meta: PageableMeta
}

export function getAllProjects(page: number, limit: number) {
    const query = useQuery({
        queryKey: ['projects', page, limit],
        queryFn: async () => {
            const response = await axios.get(`/projects?page=${page}&limit=${limit}`);
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

interface UpdateProjectProps {
    id: string;
    title: string;
    description: string;
    revenue: number;
    icon: string
    color: string;
    ownerId: string;
    status: ProjectProps['status'];
}

export function updateProject() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (data: UpdateProjectProps) => {
            return await axios.put('/projects', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            toast({
                title: "✅ Success",
                description: "Project was updated successfully",
            });
        },
    });

    return query;
}

interface SearchProjectByTitleResponse {
    projects: ProjectProps[],
    meta: PageableMeta
}

export function searchProjectsByTitle(props: { title?: string, page?: number, limit?: number }) {
    const { title, page, limit } = props;
    const query = useQuery({
        queryKey: ['projects', title],
        queryFn: async () => {
            const response = await axios.get(`/projects/${title}?page=${page}&limit=${limit}`);
            return response.data as SearchProjectByTitleResponse;
        },
        enabled: !!title && !!page && !!limit,
        staleTime: 5000
    });

    return query;
}

export function getInProgressProjects() {
    const query = useQuery({
        queryKey: ['projects', 'in-progress'],
        queryFn: async () => {
            const response = await axios.get('/projects/status/IN_PROGRESS');
            return response.data as GetAllProjectsResponse;
        }
    });
    return query;
}