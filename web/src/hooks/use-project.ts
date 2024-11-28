import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { axios } from "@/lib/axios";
import { queryClient } from "@/main";
import { PageableMeta } from "@/types/pageable.type";
import { decodeToken } from "./use-token";
import { useNavigate } from "react-router-dom";

export interface ProjectProps {
    id: string;
    title: string;
    description: string;
    revenue: number;
    icon: string;
    status: 'IN_PROGRESS' | 'FINISHED';
    tasks: number;
    color: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
    isPinned: boolean;
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

export function getUserProjects(page: number, limit: number) {
    const ownerId = decodeToken()?.sub;
    if (!ownerId) {
        return;
    }

    const query = useQuery({
        queryKey: ['projects', ownerId, page, limit],
        queryFn: async () => {
            const response = await axios.get(`/projects/owner/${ownerId}?page=${page}&limit=${limit}`);
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
    const navigate = useNavigate();

    const query = useMutation({
        mutationFn: async (newProject: CreateProjectProps) => {
            const response = await axios.post('/projects', newProject);
            const project = response.data.project as ProjectProps;
            return project;
        },
        onSuccess: (project: ProjectProps) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            navigate(`/app/projects/${project.id}`);
            toast({
                title: "✅ Success",
                description: "Project was created successfully",
            });
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
    const navigate = useNavigate();

    const query = useMutation({
        mutationFn: async (id: string) => {
            return await axios.delete(`/projects/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            navigate('/app/projects');
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
            const response = await axios.get(`/projects/title/${title}?page=${page}&limit=${limit}`);
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

export function getProjectById(id: string) {
    const query = useQuery({
        queryKey: ['projects', id],
        queryFn: async () => {
            const response = await axios.get(`/projects/${id}`);
            return response.data as { project: ProjectProps };
        }
    });
    return query;
}

interface GetProjectDashboardResponse {
    project: ProjectProps;
    tasks: {
        total: number;
        completed: number;
        highPriority: number;
        mediumPriority: number;
        lowPriority: number;
        productivity: {
            Sunday: number;
            Monday: number;
            Tuesday: number;
            Wednesday: number;
            Thursday: number;
            Friday: number;
            Saturday: number;
        }
    };
    costs: {
        totalValue: number;
        totalProfit: number;
    }
}

export function getProjectDashboard(id: string) {
    const query = useQuery({
        queryKey: ['projects', id, 'dashboard'],
        queryFn: async () => {
            const response = await axios.get(`/projects/dashboard/${id}`);
            return response.data as GetProjectDashboardResponse;
        }
    });
    return query;
}

export function getPinnedProjects() {
    const ownerId = decodeToken()?.sub;

    const query = useQuery({
        queryKey: ['projects', 'pinned'],
        queryFn: async () => {
            const response = await axios.get(`/projects/pinned/owner/${ownerId}`);
            return response.data as GetAllProjectsResponse;
        }
    });

    return query;
}

export function togglePinProject() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (id: string) => {
            return await axios.patch(`/projects/pin/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects', 'pinned'] });
            toast({
                title: "✅ Success",
                description: "Project was pinned status was updated",
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