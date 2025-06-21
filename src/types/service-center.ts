export interface ServiceCenter {
  id: string
  name: string
  phone: string
  email: string
  image: string
  company_id: string
  company: unknown | null
  mechanics: unknown[] | null
  specializations: unknown[] | null
  services: unknown[] | null
  locations: unknown[] | null
  appointments: unknown[] | null
  operating_hours: unknown[] | null
  reviews: unknown[] | null
  service_bays: unknown[] | null
  created_at: string
  updated_at: string
}

export interface ServiceCentersResponse {
  status: string
  message: string
  data: {
    metadata: {
      total: number
    }
    service_centers: ServiceCenter[]
  }
}

export interface ServiceCenterFilters {
  search?: string
  location?: string
  services?: string[]
}

export interface ServiceCenterStats {
  total: number
  available: number
  verified: number
  avgRating: number
} 