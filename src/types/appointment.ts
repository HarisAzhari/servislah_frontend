import { Mechanic, ServiceCenter } from "./service-center"
import { Vehicle } from "./vehicle"

export interface Appointment {
  id: string
  service_center_id: string
  user_id: string
  vehicle_id: string
  vehicle?: Vehicle
  mechanic_id?: string,
  mechanic?: Mechanic | null,
  service_bay_id?: string
  service_center?: ServiceCenter | null
  user?: any
  service_bay?: any
  date: string
  time: string
  status: "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  items: {
    id: string
    service_id: string
    service_appointment_id: string
    service?: any
    service_appointment?: any
    price: number
    duration: number
    created_at: string
    updated_at: string
  }[]
  reviews?: any
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
  service_center_id: string
  user_id: string
  vehicle_id: string
  date: string
  time: string
  items: {
    service_id: string
  }[]
}



export interface UpdateAppointmentRequest {
  service_center_id: string
  user_id: string,
  vehicle_id?: string,
  date?: string,
  time?: string,
  items?: {
    service_id: string
  }[]
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


export interface QueryAppoinmentRequest {
  user_id?: string
  date?: string
  time?: string
  status?: string
  service_center_id?: string
}