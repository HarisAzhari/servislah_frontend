import { CreateAppointmentRequest, QueryAppoinmentRequest, UpdateAppointmentRequest } from "@/types/appointment";
import { axiosInstance } from "../config";
import { DEFAULT_TOKEN } from "../constant";

export const createAppointment = async (token: string, appointment: CreateAppointmentRequest) => {
    const response = await axiosInstance(token).post('/appointments', appointment);
    return response.data.data.appoinments;
}

export const getAppointments = async (token: string, query: QueryAppoinmentRequest) => {
    const response = await axiosInstance(token).get('/appointments', { params: query });
    return response.data.data.appoinments;
}

export const getAppointmentById = async (token: string, id: string) => {
    const response = await axiosInstance(token).get(`/appointments/${id}`);
    return response.data.data.appoinment;
}


export const updateAppointment = async (token: string, id: string, appointment: UpdateAppointmentRequest) => {
    const response = await axiosInstance(token).patch(`/appointments/${id}`, appointment);
    return response.data.data.appoinment;
}

export const deleteAppointment = async (token: string, id: string) => {
    const response = await axiosInstance(token).delete(`/appointments/${id}`);
    return response.data.data.appoinment;
}