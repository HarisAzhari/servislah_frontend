import { axiosInstance } from "../config";
import { ServiceCenter } from "@/types/service-center";

interface ServiceCenterResponse {
    status: string;
    message: string;
    data: {
        service_center: ServiceCenter;
    };
}

export const getServiceCenters = async (token: string): Promise<ServiceCenter[]> => {
    const response = await axiosInstance(token).get('/service-centers');
    return response.data.data.service_centers;
}

export const getServiceCenterById = async (token: string, id: string): Promise<ServiceCenterResponse> => {
    const response = await axiosInstance(token).get(`/service-centers/${id}`);
    return response.data;
}

