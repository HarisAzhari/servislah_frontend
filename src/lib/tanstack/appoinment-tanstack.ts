import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  updateAppointment,
} from "../services/appoinment.service";
import {
  CreateAppointmentRequest,
  QueryAppoinmentRequest,
  UpdateAppointmentRequest,
} from "@/types/appointment";
import { toast } from "sonner";
import { useAuthTanstack } from "./auth-tanstack";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { DEFAULT_TOKEN } from "../constant";

// Helper function to get access token from either auth system
const getAccessToken = (user: any): string => {
  // First, try to get token from useAuthTanstack user
  if (user?.backend_tokens?.access_token) {
    return user.backend_tokens.access_token;
  }

  // Fallback to direct localStorage access (for regular login)
  if (typeof window !== "undefined") {
    const directToken = localStorage.getItem("access_token");
    if (directToken) {
      return directToken;
    }
  }

  // Last resort: use default token
  return DEFAULT_TOKEN;
};

export const useCreateAppointment = () => {
  const { user } = useAuthTanstack();
  const router = useRouter();

  return useMutation({
    mutationFn: async (appointment: CreateAppointmentRequest) => {
      if (!user) {
        throw new Error("User are not authenticated");
      }
      appointment.user_id = user.id;

      const token = getAccessToken(user);

      // Debug logging
      console.log("🔍 Creating appointment with data:", appointment);
      console.log("🔍 User ID:", user.id);
      console.log("🔑 Using token for appointment:", {
        hasUser: !!user,
        tokenLength: token.length,
        tokenSource: user?.backend_tokens?.access_token
          ? "useAuthTanstack"
          : typeof window !== "undefined" &&
            localStorage.getItem("access_token")
          ? "localStorage"
          : "default",
      });

      const respones = await createAppointment(token, appointment);
      console.log("✅ Appointment created successfully:", respones);
      return respones;
    },
    onSuccess: () => {
      toast.success("Appointment created successfully");
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("❌ Failed to create appointment:", error);
      toast.error("Failed to create appointment");
    },
  });
};

export const useUpdateAppointment = () => {
  const { user } = useAuthTanstack();
  const router = useRouter();

  return useMutation({
    mutationFn: async (variables: {
      id: string;
      appointment: UpdateAppointmentRequest;
    }) => {
      if (!user) {
        throw new Error("User are not authenticated");
      }
      const respones = await updateAppointment(
        (user as User)?.backend_tokens?.access_token || "",
        variables.id,
        variables.appointment
      );
      return respones;
    },
    onSuccess: () => {
      toast.success("Appointment updated successfully");
      router.push("/dashboard/appointments");
    },
    onError: () => {
      toast.error("Failed to update appointment");
    },
  });
};

export const useDeleteAppointment = () => {
  const { user } = useAuthTanstack();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!user) {
        throw new Error("User are not authenticated");
      }
      const respones = await deleteAppointment(
        (user as User)?.backend_tokens?.access_token || "",
        id
      );
      return respones;
    },
    onSuccess: () => {
      toast.success("Appointment deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete appointment");
    },
  });
};

export const useGetAppointments = (query: QueryAppoinmentRequest) => {
  const { user } = useAuthTanstack();
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await getAppointments(
        (user as User)?.backend_tokens?.access_token || "",
        { ...query, user_id: user?.id }
      );
      console.log("response", response);
      return response;
    },
  });
};

export const useGetAppointmentById = (id: string) => {
  const { user } = useAuthTanstack();
  return useQuery({
    queryKey: ["appointment", id],
    queryFn: async () => {
      const response = await getAppointmentById(
        (user as User)?.backend_tokens?.access_token || "",
        id
      );
      return response;
    },
  });
};
