import { ApiError } from "@/lib/api"
import { config } from "@/lib/config"
import type { Vehicle, CreateVehicleRequest, UpdateVehicleRequest } from "@/types/vehicle"

export const vehicleService = {
  // Fetch all vehicles for a user
  async getVehicles(userId: string): Promise<Vehicle[]> {
    try {
      const response = await fetch(`${config.apiBaseUrl}/vehicles?user_id=${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },

      })

      if (!response.ok) {
        throw new ApiError(response.status, `Failed to fetch vehicles: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(500, 'Failed to fetch vehicles')
    }
  },

  // Create a new vehicle
  async createVehicle(vehicleData: CreateVehicleRequest): Promise<Vehicle> {
    try {
      const response = await fetch(`${config.apiBaseUrl}/vehicles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError(
          response.status,
          errorData.message || `Failed to create vehicle: ${response.status}`
        )
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating vehicle:', error)
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(500, 'Failed to create vehicle')
    }
  },

  // Update a vehicle
  async updateVehicle(vehicleId: string, vehicleData: UpdateVehicleRequest): Promise<Vehicle> {
    try {
      const response = await fetch(`${config.apiBaseUrl}/vehicles/${vehicleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError(
          response.status,
          errorData.message || `Failed to update vehicle: ${response.status}`
        )
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating vehicle:', error)
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(500, 'Failed to update vehicle')
    }
  },

  // Delete a vehicle
  async deleteVehicle(vehicleId: string): Promise<void> {
    try {
      const response = await fetch(`${config.apiBaseUrl}/vehicles/${vehicleId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError(
          response.status,
          errorData.message || `Failed to delete vehicle: ${response.status}`
        )
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(500, 'Failed to delete vehicle')
    }
  },

  // Get a single vehicle
  async getVehicle(vehicleId: string): Promise<Vehicle> {
    try {
      const response = await fetch(`${config.apiBaseUrl}/vehicles/${vehicleId}`)

      if (!response.ok) {
        throw new ApiError(response.status, `Failed to fetch vehicle: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching vehicle:', error)
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(500, 'Failed to fetch vehicle')
    }
  }
} 