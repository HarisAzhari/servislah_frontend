import * as z from "zod"

// Vehicle Creation Schema
export const createVehicleSchema = z.object({
  user_id: z.string().min(1, "User ID is required"),
  model: z.string().min(2, "Model must be at least 2 characters"),
  year: z.number()
    .min(1900, "Year must be at least 1900")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future"),
  license_plate: z.string().min(3, "License plate must be at least 3 characters"),
  color: z.string().optional(),
  images: z.array(z.string()).optional(),
})

// Vehicle Update Schema
export const updateVehicleSchema = z.object({
  model: z.string().min(2, "Model must be at least 2 characters").optional(),
  year: z.number()
    .min(1900, "Year must be at least 1900")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future")
    .optional(),
  license_plate: z.string().min(3, "License plate must be at least 3 characters").optional(),
  color: z.string().optional(),
  images: z.array(z.string()).optional(),
})

// Vehicle Search/Filter Schema
export const vehicleFilterSchema = z.object({
  model: z.string().optional(),
  year_from: z.number().optional(),
  year_to: z.number().optional(),
  color: z.string().optional(),
  license_plate: z.string().optional(),
})

// Infer types from schemas
export type CreateVehicleFormData = z.infer<typeof createVehicleSchema>
export type UpdateVehicleFormData = z.infer<typeof updateVehicleSchema>
export type VehicleFilterData = z.infer<typeof vehicleFilterSchema> 