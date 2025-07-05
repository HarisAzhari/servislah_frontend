import { useQuery } from "@tanstack/react-query";
import {
  getServiceCenterById,
  getServiceCenters,
} from "../services/service-center.service";
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

export const useGetServiceCenters = () => {
  const { user } = useAuthTanstack();

  return useQuery({
    queryKey: ["service-centers"],
    queryFn: async () => {
      const token = getAccessToken(user);
      console.log("🔑 Using token for service centers:", {
        hasUser: !!user,
        tokenLength: token.length,
        tokenSource: user?.backend_tokens?.access_token
          ? "useAuthTanstack"
          : typeof window !== "undefined" &&
            localStorage.getItem("access_token")
          ? "localStorage"
          : "default",
      });

      const serviceCenters = await getServiceCenters(token);
      console.log("✅ Service centers loaded:", serviceCenters.length);
      return serviceCenters;
    },
    retry: (failureCount, error) => {
      // Don't retry if it's an auth error
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        error.status === 401
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export const useGetServiceCenterById = (id: string) => {
  const { user } = useAuthTanstack();

  return useQuery<ServiceCenterResponse>({
    queryKey: ["service-center", id],
    queryFn: async () => {
      const token = getAccessToken(user);
      console.log("🔑 Using token for service center detail:", {
        hasUser: !!user,
        tokenLength: token.length,
        serviceId: id,
        tokenSource: user?.backend_tokens?.access_token
          ? "useAuthTanstack"
          : typeof window !== "undefined" &&
            localStorage.getItem("access_token")
          ? "localStorage"
          : "default",
      });

      const serviceCenter = await getServiceCenterById(token, id);
      console.log(
        "✅ Service center detail loaded:",
        serviceCenter.data.service_center.name
      );
      return serviceCenter;
    },
    retry: (failureCount, error) => {
      // Don't retry if it's an auth error
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        error.status === 401
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });
};
