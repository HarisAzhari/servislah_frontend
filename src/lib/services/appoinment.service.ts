import {
  CreateAppointmentRequest,
  QueryAppoinmentRequest,
  UpdateAppointmentRequest,
} from "@/types/appointment";
import { axiosInstance } from "../config";

export const createAppointment = async (
  token: string,
  appointment: CreateAppointmentRequest
) => {
  // Only log the final payload we're sending (per request)

  try {
    // The API expects `customer_id` instead of `user_id`
    const body = {
      service_center_id: appointment.service_center_id,
      customer_id: (appointment as any).customer_id || appointment.user_id,
      vehicle_id: appointment.vehicle_id,
      date: appointment.date,
      time: appointment.time,
      items: appointment.items,
    };

    const response = await axiosInstance(token).post(
      "/appointments",
      body
    );
    return response.data.data.appoinments;
  } catch (error: any) {
    throw error;
  }
};

export const getAppointments = async (
  token: string,
  query: QueryAppoinmentRequest
) => {
  const response = await axiosInstance(token).get("/appointments", {
    params: query,
  });
  return response.data.data.appoinments;
};

export const getAppointmentById = async (token: string, id: string) => {
  const response = await axiosInstance(token).get(`/appointments/${id}`);
  return response.data.data.appoinment;
};

export const updateAppointment = async (
  token: string,
  id: string,
  appointment: UpdateAppointmentRequest
) => {
  const response = await axiosInstance(token).patch(
    `/appointments/${id}`,
    appointment
  );
  return response.data.data.appoinment;
};

export const deleteAppointment = async (token: string, id: string) => {
  const response = await axiosInstance(token).delete(`/appointments/${id}`);
  return response.data.data.appoinment;
};
