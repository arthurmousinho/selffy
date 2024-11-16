import { axios } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { queryClient } from "@/main";
import { PageableMeta } from "@/types/pageable.type";

export interface CostProps {
    id: string;
    title: string;
    value: number;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface GetAllCostsResponse {
    costs: CostProps[];
    meta: PageableMeta;
}

export function getAllCosts(page: number, limit: number) {
    const query = useQuery({
        queryKey: ['costs', page, limit],
        queryFn: async () => {
            const response = await axios.get(`/costs?page=${page}&limit=${limit}`);
            return response.data as GetAllCostsResponse;
        }
    })
    return query;
}

interface CreateCostRequest {
    title: string;
    value: number;
    projectId: string;
}

export function createCost() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (newCost: CreateCostRequest) => {
            return await axios.post('/costs', newCost);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['costs'] });
            toast({
                title: "✅ Success",
                description: "Cost was created successfully",
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

export function deleteCost() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (id: string) => {
            return await axios.delete(`/costs/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['costs'] });
            toast({
                title: "✅ Success",
                description: "Cost was deleted successfully",
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

interface UpdateCostRequest {
    id: string;
    title: string;
    value: number;
    projectId: string;
}

export function updateCost() {
    const { toast } = useToast();
    const query = useMutation({
        mutationFn: async (data: UpdateCostRequest) => {
            return await axios.put('/costs', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['costs'] });
            toast({
                title: "✅ Success",
                description: "Cost was updated successfully",
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

interface SearchCostsByTitleResponse {
    costs: CostProps[];
    meta: PageableMeta;
}

export function searchCostsByTitle(props: { title?: string, page?: number, limit?: number }) {
    const { title, page, limit } = props;
    const query = useQuery({
        queryKey: ['costs', title],
        queryFn: async () => {
            const response = await axios.get(`/costs/title/${title}?page=${page}&limit=${limit}`);
            return response.data as SearchCostsByTitleResponse;
        },
        enabled: !!title && !!page && !!limit,
        staleTime: 5000
    });

    return query;
}

export function getCostsByProjectId(projectId: string) {
    const query = useQuery({
        queryKey: ['costs', projectId],
        queryFn: async () => {
            const response = await axios.get(`/costs/project/${projectId}`);
            return response.data as GetAllCostsResponse;
        },
        enabled: !!projectId
    });

    return query;
}