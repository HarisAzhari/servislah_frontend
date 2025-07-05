"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetServiceCenters } from "@/lib/tanstack/service-center.tanstack";
import { Search, MapPin, Phone, Users, Wrench, Building } from "lucide-react";

export default function ServiceCentersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"location" | "services">("location");
  const [showDebug, setShowDebug] = useState(false);

  const { data: serviceCenters, isLoading, error } = useGetServiceCenters();

  // Filter and sort service centers
  const filteredAndSortedCenters = serviceCenters
    ?.filter(
      (center) =>
        center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        center.locations?.address
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        center.phone.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortBy === "location") {
        return (a.locations?.address || "").localeCompare(
          b.locations?.address || ""
        );
      }
      return (b.services?.length || 0) - (a.services?.length || 0);
    });

  // Calculate statistics
  const totalCenters = serviceCenters?.length || 0;
  const activeCenters =
    serviceCenters?.filter((center) =>
      center.operating_hours?.some((hour) => hour.is_active)
    ).length || 0;
  const totalServices =
    serviceCenters?.reduce(
      (sum, center) => sum + (center.services?.length || 0),
      0
    ) || 0;
  const totalMechanics =
    serviceCenters?.reduce(
      (sum, center) => sum + (center.mechanics?.length || 0),
      0
    ) || 0;

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-red-500">
              Error loading service centers: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Service Centers</h1>
        <Button variant="outline" onClick={() => setShowDebug(!showDebug)}>
          {showDebug ? "Hide Debug" : "Show Debug"}
        </Button>
      </div>

      {/* Debug Panel */}
      {showDebug && (
        <Card>
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(
                { serviceCenters, totalCenters, activeCenters },
                null,
                2
              )}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search service centers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "location" ? "default" : "outline"}
            onClick={() => setSortBy("location")}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Location
          </Button>
          <Button
            variant={sortBy === "services" ? "default" : "outline"}
            onClick={() => setSortBy("services")}
          >
            <Wrench className="h-4 w-4 mr-2" />
            Services
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Centers
                </p>
                <p className="text-2xl font-bold">{totalCenters}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-green-600 rounded-full" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Centers
                </p>
                <p className="text-2xl font-bold">{activeCenters}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Wrench className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Services
                </p>
                <p className="text-2xl font-bold">{totalServices}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Mechanics
                </p>
                <p className="text-2xl font-bold">{totalMechanics}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Centers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedCenters?.map((center) => (
          <Card key={center.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              {/* Header with Image and Title */}
              <div className="flex items-start gap-3 mb-3">
                {center.image && (
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={center.image}
                      alt={center.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm truncate">
                      {center.name}
                    </h3>
                    <Badge
                      variant={
                        center.operating_hours?.some((hour) => hour.is_active)
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {center.operating_hours?.some((hour) => hour.is_active)
                        ? "Open"
                        : "Closed"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-1 mb-3">
                <div className="flex items-center text-xs text-gray-600">
                  <Phone className="h-3 w-3 mr-2" />
                  {center.phone}
                </div>
                {center.locations && (
                  <div className="flex items-start text-xs text-gray-600">
                    <MapPin className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="truncate">
                      {center.locations.city}, {center.locations.state}
                    </span>
                  </div>
                )}
              </div>

              {/* Services */}
              {center.services && center.services.length > 0 && (
                <div className="mb-2">
                  <div className="flex flex-wrap gap-1">
                    {center.services.slice(0, 2).map((service) => (
                      <Badge
                        key={service.id}
                        variant="outline"
                        className="text-xs px-2 py-0"
                      >
                        {service.name}
                      </Badge>
                    ))}
                    {center.services.length > 2 && (
                      <Badge variant="outline" className="text-xs px-2 py-0">
                        +{center.services.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Bottom Info */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                {center.mechanics && center.mechanics.length > 0 && (
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {center.mechanics.length} mechanic
                    {center.mechanics.length !== 1 ? "s" : ""}
                  </div>
                )}
                {center.specializations &&
                  center.specializations.length > 0 && (
                    <div className="flex items-center">
                      <Wrench className="h-3 w-3 mr-1" />
                      {center.specializations.length} specialization
                      {center.specializations.length !== 1 ? "s" : ""}
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedCenters?.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500">
              No service centers found matching your search.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
