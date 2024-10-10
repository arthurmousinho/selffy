import { axios } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { queryClient } from "@/main";

interface CostProps {
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