import { Vehicle } from "@/types/vehicle";
import { axiosInstance } from "../config";

export const getUserVehicles = async (token: string) => {
    const response = await axiosInstance(token).get('/vehicles');
    return response.data.data.vehicles;
}

export const getVehicleByUserId = async (token: string, userId: string) => {
    const response = await axiosInstance(token).get(`/vehicles/user/${userId}`);
    return response.data.data.vehicles;
}

export const getVehicleById = async (token: string, id: string) => {
    const response = await axiosInstance(token).get(`/vehicles/${id}`);
    return response.data.data.vehicle;
}

export const createVehicle = async (token: string, vehicle: Vehicle) => {
    const response = await axiosInstance(token).post('/vehicles', vehicle);
    return response.data.data.vehicle;
}

export const updateVehicle = async (token: string, id: string, vehicle: Vehicle) => {
    const response = await axiosInstance(token).put(`/vehicles/${id}`, vehicle);
    return response.data.data.vehicle;
}

export const deleteVehicle = async (token: string, id: string) => {
    const response = await axiosInstance(token).delete(`/vehicles/${id}`);
    return response.data.data.vehicle;
}