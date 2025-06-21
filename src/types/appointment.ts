export interface Appointment {
  id: string
  user_id: string
  vehicle_id: string
  service_type: string
  service_category: "MAINTENANCE" | "REPAIR" | "INSPECTION" | "EMERGENCY"
  appointment_date: string
  appointment_time: string
  location: AppointmentLocation
  status: "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  notes?: string
  estimated_duration: number // in minutes
  estimated_cost?: number
  actual_cost?: number
  mechanic_id?: string
  created_at: string
  updated_at: string
}

export interface AppointmentLocation {
  type: "HOME" | "WORKSHOP" | "ROADSIDE"
  address: string
  city: string
  postal_code: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

export interface CreateAppointmentRequest {
  vehicle_id: string
  service_type: string
  service_category: "MAINTENANCE" | "REPAIR" | "INSPECTION" | "EMERGENCY"
  appointment_date: string
  appointment_time: string
  location: AppointmentLocation
  notes?: string
  estimated_duration: number
}

export interface UpdateAppointmentRequest {
  service_type?: string
  service_category?: "MAINTENANCE" | "REPAIR" | "INSPECTION" | "EMERGENCY"
  appointment_date?: string
  appointment_time?: string
  location?: AppointmentLocation
  status?: "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  notes?: string
  estimated_duration?: number
  estimated_cost?: number
  actual_cost?: number
  mechanic_id?: string
}

export interface AppointmentResponse {
  appointment: Appointment
}

export interface AppointmentsListResponse {
  appointments: Appointment[]
  total: number
  page: number
  limit: number
}

export interface AppointmentSlot {
  date: string
  time: string
  available: boolean
  mechanic_id?: string
}

export interface AvailableSlotsResponse {
  slots: AppointmentSlot[]
  service_type: string
  location: string
} 