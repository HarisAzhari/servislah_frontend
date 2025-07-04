import { useQuery } from "@tanstack/react-query";
import { getVehicleById, getUserVehicles, getVehicleByUserId } from "../services/vehicle.service";
import { useAuthTanstack } from "./auth-tanstack";

export const useGetUserVehicles = () => {
    const { user } = useAuthTanstack();
    return useQuery({
        queryKey: ['vehicles'],
        queryFn: () => getUserVehicles(user?.backend_tokens.access_token || ''),
    });
}

export const useGetVehicleById = (id: string) => {
    const { user } = useAuthTanstack();
    return useQuery({
        queryKey: ['vehicle', id],
        queryFn: () => getVehicleById(user?.backend_tokens.access_token || '', id),
    });
}


export const useGetVehicleByUserId = () => {
    const { user } = useAuthTanstack();
    return useQuery({
        queryKey: ['vehicles', user?.id],
        queryFn: () => getVehicleByUserId(user?.backend_tokens.access_token || '', user?.id || ''),
    });
}