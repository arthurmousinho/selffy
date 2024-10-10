import { axios } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { queryClient } from "@/main";

export interface CostProps {
    id: string;
    title: string;
    value: number;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface GetAllCostsResponse {
    costs: CostProps[]
}

export function getAllCosts() {
    const query = useQuery({
        queryKey: ['costs'],
        queryFn: async () => {
            const response = await axios.get('/costs');
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
    costs: CostProps[]
}

export function searchCostsByTitle(title?: string) {
    const query = useQuery({
        queryKey: ['costs', title],
        queryFn: async () => {
            const response = await axios.get(`/costs/${title}`);
            return response.data as SearchCostsByTitleResponse;
        },
        enabled: !!title,
        staleTime: 5000
    });

    return query;
}