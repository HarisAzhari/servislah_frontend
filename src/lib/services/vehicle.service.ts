import { CreateVehicleRequest, UpdateVehicleRequest } from "@/types/vehicle";
import { axiosInstance } from "../config";

export const getUserVehicles = async (token: string) => {
  const response = await axiosInstance(token).get("/vehicles");
  return response.data.data;
};

export const getVehicleByUserId = async (token: string, userId: string) => {
  const response = await axiosInstance(token).get(`/vehicles/user/${userId}`);
  return response.data.data.vehicles;
};

export const getVehicleById = async (token: string, id: string) => {
  const response = await axiosInstance(token).get(`/vehicles/${id}`);
  return response.data.data.vehicle;
};

export const createVehicle = async (
  token: string,
  vehicle: CreateVehicleRequest
) => {
  console.log("=== VEHICLE SERVICE CREATE ===");
  console.log("Token:", token ? "Present" : "Missing");
  console.log("Vehicle data:", JSON.stringify(vehicle, null, 2));
  console.log("Request URL:", "/vehicles");
  console.log("===============================");

  try {
    const response = await axiosInstance(token).post("/vehicles", vehicle);
    console.log("=== VEHICLE SERVICE SUCCESS ===");
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
    console.log("===============================");
    return response.data.data.vehicle;
  } catch (error: unknown) {
    console.error("=== VEHICLE SERVICE ERROR ===");
    console.error("Error:", error);
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { status?: number; data?: unknown };
      };
      console.error("Error status:", axiosError.response?.status);
      console.error("Error data:", axiosError.response?.data);
    }
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
    console.error("============================");
    throw error;
  }
};

export const updateVehicle = async (
  token: string,
  id: string,
  vehicle: UpdateVehicleRequest
) => {
  const response = await axiosInstance(token).put(`/vehicles/${id}`, vehicle);
  return response.data.data.vehicle;
};

export const deleteVehicle = async (token: string, id: string) => {
  const response = await axiosInstance(token).delete(`/vehicles/${id}`);
  return response.data.data.vehicle;
};
