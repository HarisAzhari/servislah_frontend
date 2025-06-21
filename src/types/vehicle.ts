export interface Vehicle {
  id: string
  user_id: string
  model: string
  year: number
  license_plate: string
  color?: string
  images?: string[]
  created_at: string
  updated_at: string
}

export interface CreateVehicleRequest {
  user_id: string
  model: string
  year: number
  license_plate: string
  color?: string
  images?: string[]
}

export interface UpdateVehicleRequest {
  model?: string
  year?: number
  license_plate?: string
  color?: string
  images?: string[]
}

export interface VehicleResponse {
  vehicle: Vehicle
}

export interface VehiclesListResponse {
  vehicles: Vehicle[]
  total: number
  page: number
  limit: number
} 