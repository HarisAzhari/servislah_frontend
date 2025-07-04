import { useQuery } from "@tanstack/react-query";
import { getServiceCenterById, getServiceCenters } from "../services/service-center.service";
import { DEFAULT_TOKEN } from "../constant";
import { useAuthTanstack } from "./auth-tanstack";
import { ServiceCenter } from "@/types/service-center";

interface ServiceCenterResponse {
    status: string;
    message: string;
    data: {
        service_center: ServiceCenter;
    };
}

export const useGetServiceCenters = () => {
    const { user } = useAuthTanstack()
    return useQuery({
        queryKey: ['service-centers'],
        queryFn: async () => {
            console.log('user', user);
            if (!user) {
                throw new Error('User are not authenticated');
            }
            const serviceCenters = await getServiceCenters(user.backend_tokens.access_token);
            console.log('serviceCenters', serviceCenters);
            return serviceCenters;
        },
    });
}

export const useGetServiceCenterById = (id: string) => {
    const { user } = useAuthTanstack()
    return useQuery<ServiceCenterResponse>({
        queryKey: ['service-center', id],
        queryFn: async () => {
            if (!user) {
                throw new Error('User are not authenticated');
            }
            const serviceCenter = await getServiceCenterById(user.backend_tokens.access_token, id);
            return serviceCenter;
        },
    });
}