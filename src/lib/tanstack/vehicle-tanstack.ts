import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getVehicleById,
  getUserVehicles,
  getVehicleByUserId,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../services/vehicle.service";
import { useAuthTanstack } from "./auth-tanstack";
import { CreateVehicleRequest, UpdateVehicleRequest } from "@/types/vehicle";
import { toast } from "sonner";

export const useGetUserVehicles = () => {
  const { user } = useAuthTanstack();
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: () =>
      getUserVehicles(
        user?.backend_tokens?.access_token || user?.accessToken || ""
      ),
    enabled: !!user,
  });
};

export const useGetVehicleById = (id: string) => {
  const { user } = useAuthTanstack();
  return useQuery({
    queryKey: ["vehicle", id],
    queryFn: () =>
      getVehicleById(
        user?.backend_tokens?.access_token || user?.accessToken || "",
        id
      ),
    enabled: !!user && !!id,
  });
};

export const useGetVehicleByUserId = () => {
  const { user } = useAuthTanstack();
  return useQuery({
    queryKey: ["vehicles", user?.id],
    queryFn: () =>
      getVehicleByUserId(
        user?.backend_tokens?.access_token || user?.accessToken || "",
        user?.id || ""
      ),
    enabled: !!user?.id,
  });
};

export const useCreateVehicle = () => {
  const { user } = useAuthTanstack();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (vehicle: CreateVehicleRequest) =>
      createVehicle(
        user?.backend_tokens?.access_token || user?.accessToken || "",
        vehicle
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Vehicle added successfully!");
    },
    onError: (error: any) => {
      toast.error(
        "Failed to add vehicle: " + (error?.message || "Unknown error")
      );
    },
  });
};

export const useUpdateVehicle = () => {
  const { user } = useAuthTanstack();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      vehicle,
    }: {
      id: string;
      vehicle: UpdateVehicleRequest;
    }) =>
      updateVehicle(
        user?.backend_tokens?.access_token || user?.accessToken || "",
        id,
        vehicle
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Vehicle updated successfully!");
    },
    onError: (error: any) => {
      toast.error(
        "Failed to update vehicle: " + (error?.message || "Unknown error")
      );
    },
  });
};

export const useDeleteVehicle = () => {
  const { user } = useAuthTanstack();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteVehicle(
        user?.backend_tokens?.access_token || user?.accessToken || "",
        id
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      toast.success("Vehicle deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(
        "Failed to delete vehicle: " + (error?.message || "Unknown error")
      );
    },
  });
};
