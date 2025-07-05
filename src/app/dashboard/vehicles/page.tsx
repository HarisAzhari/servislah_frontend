"use client";

import React, { useState } from "react";
import { Car, Calendar, Fuel, Palette, Hash, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Vehicle } from "@/types/vehicle";
import { useGetUserVehicles } from "@/lib/tanstack/vehicle-tanstack";
import { AddVehicleDialog } from "@/components/add-vehicle-dialog";

const VehiclesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data: vehiclesData, isLoading, error } = useGetUserVehicles();

  const vehicles = vehiclesData?.vehicles || [];
  const totalVehicles = vehiclesData?.metadata?.total || 0;

  const filteredVehicles = vehicles.filter(
    (vehicle: Vehicle) =>
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.license_plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.color?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFuelTypeColor = (fuelType?: string) => {
    switch (fuelType) {
      case "GASOLINE":
        return "bg-orange-100 text-orange-800";
      case "DIESEL":
        return "bg-blue-100 text-blue-800";
      case "ELECTRIC":
        return "bg-green-100 text-green-800";
      case "HYBRID":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFuelTypeIcon = (fuelType?: string) => {
    switch (fuelType) {
      case "ELECTRIC":
        return "⚡";
      case "HYBRID":
        return "🔋";
      default:
        return "⛽";
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Failed to load vehicles
          </h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Car className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading vehicles...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Vehicles</h1>
          <p className="text-gray-600 mt-1">
            Manage your vehicles and their details
          </p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {/* Stats Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Vehicles
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalVehicles}
              </p>
            </div>
            <Car className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search vehicles by model, license plate, or color..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Vehicles Grid */}
      {filteredVehicles.length === 0 ? (
        <div className="text-center py-12">
          <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? "No vehicles found" : "No vehicles yet"}
          </h3>
          <p className="text-gray-600">
            {searchTerm
              ? "Try adjusting your search terms"
              : "No vehicles to display"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle: Vehicle) => (
            <Card
              key={vehicle.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Vehicle Image */}
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                {vehicle.images && vehicle.images.length > 0 ? (
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.model}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Car className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Vehicle Details */}
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {vehicle.model}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Added {new Date(vehicle.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Year:</span>
                      <span className="font-medium">{vehicle.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Plate:</span>
                      <span className="font-medium">
                        {vehicle.license_plate}
                      </span>
                    </div>
                    {vehicle.color && (
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Color:</span>
                        <span className="font-medium">{vehicle.color}</span>
                      </div>
                    )}
                    {vehicle.fuel_type && (
                      <div className="flex items-center gap-2">
                        <Fuel className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Fuel:</span>
                        <Badge
                          variant="secondary"
                          className={getFuelTypeColor(vehicle.fuel_type)}
                        >
                          {getFuelTypeIcon(vehicle.fuel_type)}{" "}
                          {vehicle.fuel_type}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Vehicle Dialog */}
      <AddVehicleDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
};

export default VehiclesPage;
