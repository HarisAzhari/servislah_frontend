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
  console.log("🚀 Making API call to create appointment");
  console.log("🔍 Token:", token ? "Available" : "Missing");
  console.log("🔍 Token length:", token?.length);
  console.log(
    "🔍 Token preview:",
    token ? `${token.substring(0, 20)}...` : "No token"
  );
  console.log("🔍 Authorization header:", `Bearer ${token}`);
  console.log("🔍 Appointment data:", appointment);
  console.log("📋 JSON payload:", JSON.stringify(appointment, null, 2));

  try {
    const response = await axiosInstance(token).post(
      "/appointments",
      appointment
    );
    console.log("✅ API response:", response.data);
    console.log(
      "📋 API response JSON:",
      JSON.stringify(response.data, null, 2)
    );
    return response.data.data.appoinments;
  } catch (error: any) {
    console.error("❌ API call failed:", error);
    if (error?.response) {
      console.error("❌ Error response:", error.response.data);
      console.error(
        "📋 Error response JSON:",
        JSON.stringify(error.response.data, null, 2)
      );
      console.error("❌ Status code:", error.response.status);
    }
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
