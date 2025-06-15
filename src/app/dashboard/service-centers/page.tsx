"use client"

import { useState } from "react"
import { MapPin, Star, Phone, Clock, Car, Search, Filter, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for service centers
const serviceCenters = [
  {
    id: "1",
    name: "AutoCare Plus",
    rating: 4.8,
    reviewCount: 124,
    location: "Kuala Lumpur",
    address: "123 Jalan Sultan Ismail, KL",
    distance: "2.5 km",
    phone: "+60 12-345-6789",
    hours: "8:00 AM - 6:00 PM",
    services: ["Oil Change", "Brake Service", "AC Repair", "Engine Diagnostic"],
    specialties: ["BMW", "Mercedes", "Audi"],
    priceRange: "RM 80 - RM 500",
    image: "/garage-placeholder.jpg",
    verified: true,
    available: true
  },
  {
    id: "2",
    name: "SpeedFix Workshop",
    rating: 4.6,
    reviewCount: 89,
    location: "Petaling Jaya",
    address: "456 Jalan PJ, Petaling Jaya",
    distance: "5.2 km",
    phone: "+60 11-987-6543",
    hours: "9:00 AM - 7:00 PM",
    services: ["Brake Service", "Tire Change", "Engine Repair", "Transmission"],
    specialties: ["Honda", "Toyota", "Nissan"],
    priceRange: "RM 60 - RM 400",
    image: "/garage-placeholder.jpg",
    verified: true,
    available: false
  },
  {
    id: "3",
    name: "CoolCar Services",
    rating: 4.9,
    reviewCount: 156,
    location: "Shah Alam",
    address: "789 Jalan Shah Alam, Selangor",
    distance: "8.1 km",
    phone: "+60 13-456-7890",
    hours: "8:30 AM - 5:30 PM",
    services: ["AC Repair", "Electrical", "Oil Change", "Battery Service"],
    specialties: ["All Brands"],
    priceRange: "RM 50 - RM 300",
    image: "/garage-placeholder.jpg",
    verified: true,
    available: true
  },
  {
    id: "4",
    name: "TireMax Center",
    rating: 4.7,
    reviewCount: 203,
    location: "Subang Jaya",
    address: "321 Jalan Subang, Subang Jaya",
    distance: "12.3 km",
    phone: "+60 12-678-9012",
    hours: "7:00 AM - 8:00 PM",
    services: ["Tire Service", "Wheel Alignment", "Balancing", "Brake Service"],
    specialties: ["Tire Specialist"],
    priceRange: "RM 40 - RM 600",
    image: "/garage-placeholder.jpg",
    verified: false,
    available: true
  }
]

const getAvailabilityColor = (available: boolean) => {
  return available 
    ? "bg-green-100 text-green-800 hover:bg-green-200" 
    : "bg-red-100 text-red-800 hover:bg-red-200"
}

export default function ServiceCentersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("distance")

  const filteredCenters = serviceCenters
    .filter(center =>
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.services.some(service => 
        service.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "distance":
          return parseFloat(a.distance) - parseFloat(b.distance)
        case "reviews":
          return b.reviewCount - a.reviewCount
        default:
          return 0
      }
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Centers</h1>
          <p className="text-gray-600 mt-1">Find trusted service centers near you</p>
        </div>
        <Button>
          <Navigation className="h-4 w-4 mr-2" />
          Find Nearby
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by name, location, or services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Sort by: {sortBy === "distance" ? "Distance" : sortBy === "rating" ? "Rating" : "Reviews"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortBy("distance")}>Distance</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("rating")}>Rating</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("reviews")}>Reviews</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{serviceCenters.length}</p>
            <p className="text-sm text-gray-600">Total Centers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {serviceCenters.filter(c => c.available).length}
            </p>
            <p className="text-sm text-gray-600">Available Now</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">
              {serviceCenters.filter(c => c.verified).length}
            </p>
            <p className="text-sm text-gray-600">Verified</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">4.7</p>
            <p className="text-sm text-gray-600">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Service Centers List */}
      <div className="space-y-6">
        {filteredCenters.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MapPin className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No service centers found</h3>
              <p className="text-gray-600 text-center">
                Try adjusting your search terms or location.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredCenters.map((center) => (
            <Card key={center.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Section - Main Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={center.image} alt={center.name} />
                          <AvatarFallback>
                            {center.name.split(' ').map(word => word[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-semibold text-gray-900">{center.name}</h3>
                            {center.verified && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center mt-1">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm font-medium">{center.rating}</span>
                              <span className="ml-1 text-sm text-gray-500">
                                ({center.reviewCount} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge className={getAvailabilityColor(center.available)}>
                        {center.available ? "Available" : "Busy"}
                      </Badge>
                    </div>

                    {/* Location & Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-red-500" />
                        <div>
                          <p className="font-medium text-gray-900">{center.location}</p>
                          <p className="text-sm">{center.address} • {center.distance}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-green-500" />
                        <div>
                          <p className="font-medium text-gray-900">{center.phone}</p>
                          <p className="text-sm flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {center.hours}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {center.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Specialties & Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Specializes in:</p>
                        <p className="font-medium">{center.specialties.join(", ")}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Price Range:</p>
                        <p className="font-medium">{center.priceRange}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="lg:w-48 flex flex-col space-y-3">
                    <Button className="w-full">
                      <Car className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button variant="ghost" className="w-full text-sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
} 