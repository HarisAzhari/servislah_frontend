export interface Vehicle {
  id: string;
  user_id: string;
  model: string;
  year: number;
  license_plate: string;
  color?: string;
  fuel_type?: "GASOLINE" | "DIESEL" | "ELECTRIC" | "HYBRID";
  images?: string[];
  appointments?: any;
  created_at: string;
  updated_at: string;
}

export interface CreateVehicleRequest {
  user_id: string;
  model: string;
  year: number;
  license_plate: string;
  color?: string;
  fuel_type?: "GASOLINE" | "DIESEL" | "ELECTRIC" | "HYBRID";
  images?: string[];
}

export interface UpdateVehicleRequest {
  model?: string;
  year?: number;
  license_plate?: string;
  color?: string;
  fuel_type?: "GASOLINE" | "DIESEL" | "ELECTRIC" | "HYBRID";
  images?: string[];
}

export interface VehicleResponse {
  vehicle: Vehicle;
}

export interface VehiclesApiResponse {
  vehicles: Vehicle[];
  metadata: {
    total: number;
  };
}

export interface VehiclesListResponse {
  vehicles: Vehicle[];
  total: number;
  page: number;
  limit: number;
}
