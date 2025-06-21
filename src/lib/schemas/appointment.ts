import * as z from "zod"

// Location Schema
const locationSchema = z.object({
  type: z.enum(["HOME", "WORKSHOP", "ROADSIDE"]),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  postal_code: z.string().min(4, "Postal code must be at least 4 characters"),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }).optional(),
})

// Appointment Creation Schema
export const createAppointmentSchema = z.object({
  vehicle_id: z.string().min(1, "Vehicle is required"),
  service_type: z.string().min(3, "Service type must be at least 3 characters"),
  service_category: z.enum(["MAINTENANCE", "REPAIR", "INSPECTION", "EMERGENCY"]),
  appointment_date: z.string().refine((date) => {
    const appointmentDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return appointmentDate >= today
  }, "Appointment date cannot be in the past"),
  appointment_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  location: locationSchema,
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
  estimated_duration: z.number().min(15, "Duration must be at least 15 minutes").max(480, "Duration cannot exceed 8 hours"),
})

// Appointment Update Schema
export const updateAppointmentSchema = z.object({
  service_type: z.string().min(3, "Service type must be at least 3 characters").optional(),
  service_category: z.enum(["MAINTENANCE", "REPAIR", "INSPECTION", "EMERGENCY"]).optional(),
  appointment_date: z.string().refine((date) => {
    const appointmentDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return appointmentDate >= today
  }, "Appointment date cannot be in the past").optional(),
  appointment_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)").optional(),
  location: locationSchema.optional(),
  status: z.enum(["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
  estimated_duration: z.number().min(15, "Duration must be at least 15 minutes").max(480, "Duration cannot exceed 8 hours").optional(),
  estimated_cost: z.number().min(0, "Cost must be positive").optional(),
  actual_cost: z.number().min(0, "Cost must be positive").optional(),
  mechanic_id: z.string().optional(),
})

// Appointment Search/Filter Schema
export const appointmentFilterSchema = z.object({
  service_category: z.enum(["MAINTENANCE", "REPAIR", "INSPECTION", "EMERGENCY"]).optional(),
  status: z.enum(["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
  vehicle_id: z.string().optional(),
  mechanic_id: z.string().optional(),
})

// Available Slots Query Schema
export const availableSlotsSchema = z.object({
  service_type: z.string().min(1, "Service type is required"),
  location_type: z.enum(["HOME", "WORKSHOP", "ROADSIDE"]),
  date: z.string().refine((date) => {
    const appointmentDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return appointmentDate >= today
  }, "Date cannot be in the past"),
  duration: z.number().min(15, "Duration must be at least 15 minutes").max(480, "Duration cannot exceed 8 hours"),
})

// Infer types from schemas
export type CreateAppointmentFormData = z.infer<typeof createAppointmentSchema>
export type UpdateAppointmentFormData = z.infer<typeof updateAppointmentSchema>
export type AppointmentFilterData = z.infer<typeof appointmentFilterSchema>
export type AvailableSlotsQueryData = z.infer<typeof availableSlotsSchema>
export type AppointmentLocationData = z.infer<typeof locationSchema> 