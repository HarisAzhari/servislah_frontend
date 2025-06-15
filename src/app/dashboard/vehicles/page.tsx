"use client"

import { useState } from "react"
import { Car, Plus, Edit, Trash2, Calendar, Fuel, Gauge, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data for vehicles
const vehicles = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    color: "Silver",
    plateNumber: "WXY 1234",
    mileage: "45,000 km",
    fuelType: "Petrol",
    transmission: "Automatic",
    lastService: "2024-01-10",
    nextService: "2024-04-10",
    status: "active",
    image: "/car-placeholder.jpg"
  },
  {
    id: "2", 
    make: "Honda",
    model: "Civic",
    year: 2019,
    color: "Black",
    plateNumber: "ABC 5678",
    mileage: "38,200 km",
    fuelType: "Petrol",
    transmission: "Manual",
    lastService: "2024-01-05",
    nextService: "2024-04-05",
    status: "active",
    image: "/car-placeholder.jpg"
  },
  {
    id: "3",
    make: "Perodua",
    model: "Myvi",
    year: 2021,
    color: "White",
    plateNumber: "DEF 9012",
    mileage: "22,500 km",
    fuelType: "Petrol",
    transmission: "Automatic",
    lastService: "2023-12-20",
    nextService: "2024-03-20",
    status: "maintenance",
    image: "/car-placeholder.jpg"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "maintenance":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    case "inactive":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
}

const getCarInitials = (make: string, model: string) => {
  return `${make.charAt(0)}${model.charAt(0)}`.toUpperCase()
}

const isServiceDue = (nextServiceDate: string) => {
  const nextService = new Date(nextServiceDate)
  const today = new Date()
  const diffTime = nextService.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 30
}

export default function VehiclesPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Vehicles</h1>
          <p className="text-gray-600 mt-1">Manage your vehicle information and service history</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                <p className="text-3xl font-bold text-gray-900">{vehicles.length}</p>
              </div>
              <Car className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Vehicles</p>
                <p className="text-3xl font-bold text-green-600">{vehicles.filter(v => v.status === "active").length}</p>
              </div>
              <Gauge className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Service Due Soon</p>
                <p className="text-3xl font-bold text-orange-600">
                  {vehicles.filter(v => isServiceDue(v.nextService)).length}
                </p>
              </div>
              <Settings className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                      {getCarInitials(vehicle.make, vehicle.model)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{vehicle.make} {vehicle.model}</CardTitle>
                    <CardDescription>{vehicle.year} • {vehicle.plateNumber}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(vehicle.status)}>
                  {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {/* Vehicle Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Color</p>
                    <p className="font-medium">{vehicle.color}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Mileage</p>
                    <p className="font-medium">{vehicle.mileage}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fuel Type</p>
                    <p className="font-medium flex items-center">
                      <Fuel className="h-3 w-3 mr-1" />
                      {vehicle.fuelType}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Transmission</p>
                    <p className="font-medium">{vehicle.transmission}</p>
                  </div>
                </div>

                {/* Service Information */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Service Schedule</span>
                    {isServiceDue(vehicle.nextService) && (
                      <Badge variant="destructive" className="text-xs">
                        Due Soon
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                    <div>
                      <p>Last Service</p>
                      <p className="font-medium text-gray-900">
                        {new Date(vehicle.lastService).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p>Next Service</p>
                      <p className={`font-medium ${isServiceDue(vehicle.nextService) ? 'text-red-600' : 'text-gray-900'}`}>
                        {new Date(vehicle.nextService).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle book service
                    }}
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    Book Service
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle edit
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle delete
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {vehicles.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Car className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-gray-600 text-center mb-4">
              Add your first vehicle to get started with managing your car services.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Vehicle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 