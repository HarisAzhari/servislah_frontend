"use client"

import { useState } from "react"
import { MapPin, Phone, Car, Search, Filter, Navigation, Mail, Clock, Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data based on your JSON response
const mockServiceCenters = [
  {
    "id": "4ce54aa3-6dec-4960-bda5-dc6c8813c931",
    "name": "ServisLah Express Puncak Alam",
    "phone": "0378901234",
    "email": "pa@servislah.com",
    "image": "https://firebasestorage.googleapis.com/v0/b/servislah-e0a85.firebasestorage.app/o/service_center%2Fservice_center_1749740709?alt=media",
    "company_id": "a8a1d2fb-dd67-429a-97fe-b1d0e87ae36c",
    "company": null,
    "mechanics": null,
    "specializations": null,
    "services": null,
    "locations": null,
    "appointments": null,
    "operating_hours": null,
    "reviews": null,
    "service_bays": null,
    "created_at": "2025-06-12T15:05:10.954542Z",
    "updated_at": "2025-06-12T15:05:10.954542Z"
  },
  {
    "id": "9fdab4d0-f1a4-4d27-9d63-6966e1336463",
    "name": "ServisLah Express Gombak",
    "phone": "0378901234",
    "email": "g@servislah.com",
    "image": "https://firebasestorage.googleapis.com/v0/b/servislah-e0a85.firebasestorage.app/o/service_center%2Fservice_center_1749822507?alt=media",
    "company_id": "a8a1d2fb-dd67-429a-97fe-b1d0e87ae36c",
    "company": null,
    "mechanics": null,
    "specializations": null,
    "services": null,
    "locations": null,
    "appointments": null,
    "operating_hours": null,
    "reviews": null,
    "service_bays": null,
    "created_at": "2025-06-13T13:48:31.474067Z",
    "updated_at": "2025-06-13T13:48:31.474067Z"
  }
]

export default function ServiceCentersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  
  // Use mock data instead of API
  const serviceCenters = mockServiceCenters
  const totalCount = mockServiceCenters.length

  // Handle search (mock implementation)
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    // Just update the search term, filtering will happen in filteredCenters
  }

  const handleRefresh = () => {
    setSearchTerm("")
    // In a real app, this would refetch data
  }

  const filteredCenters = serviceCenters
    .filter(center =>
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "email":
          return a.email.localeCompare(b.email)
        case "created":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="space-y-8">
        {/* Professional Header */}
        <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-2">
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                Service Centers
              </h1>
              <p className="text-gray-600 text-base">
                Manage and discover certified automotive service providers
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleRefresh} 
                variant="outline" 
                size="sm"
                className="h-9 px-4 text-sm font-medium border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors"
              >
                <Search className="h-3.5 w-3.5 mr-2" />
                Refresh
              </Button>
              <Button 
                size="sm"
                className="h-9 px-4 text-sm font-medium bg-[#363DFF] hover:bg-[#363DFF]/90 shadow-sm transition-colors"
              >
                <Navigation className="h-3.5 w-3.5 mr-2" />
                Locate Centers
              </Button>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
        </div>

        {/* Professional Search and Controls */}
        <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.15s_forwards]">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search service centers..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 h-9 text-sm border-gray-300 focus:border-[#363DFF] focus:ring-[#363DFF]/20 transition-colors"
              />
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 px-4 text-sm font-medium border-gray-300 hover:bg-gray-50 transition-colors">
                    <Filter className="h-3.5 w-3.5 mr-2" />
                    Sort: {sortBy === "name" ? "Name" : sortBy === "email" ? "Email" : "Date"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setSortBy("name")} className="text-sm">
                    Sort by Name
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("email")} className="text-sm">
                    Sort by Email
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("created")} className="text-sm">
                    Sort by Date Created
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Professional Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Centers</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{totalCount}</p>
              </div>
              <div className="h-12 w-12 bg-[#363DFF]/10 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-[#363DFF]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Currently Displayed</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{filteredCenters.length}</p>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Search className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified Centers</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{serviceCenters.filter(c => c.image).length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Today</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{serviceCenters.length}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Since we're using mock data, no loading or error states needed */}

        {/* Service Centers List */}
        <div className="space-y-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
          {filteredCenters.length === 0 ? (
            <Card className="border-dashed border-2 border-gray-300 bg-white">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="p-4 bg-gray-100 rounded-full mb-6">
                  <MapPin className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No service centers found</h3>
                <p className="text-gray-600 text-center max-w-md">
                  Try adjusting your search terms or refresh to see all available centers.
                </p>
              </CardContent>
            </Card>
          ) : (
                        <div className="space-y-4">
              {filteredCenters.map((center, index) => (
                <div 
                  key={center.id} 
                  className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${0.7 + (index * 0.1)}s` }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      {/* Left Section - Main Info */}
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="relative flex-shrink-0">
                          <Avatar className="h-16 w-16 border-2 border-gray-100">
                            <AvatarImage src={center.image} alt={center.name} className="object-cover" />
                            <AvatarFallback className="bg-[#363DFF] text-white text-lg font-semibold">
                              {center.name.split(' ').map(word => word[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-500 border-2 border-white rounded-full"></div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {center.name}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <span>{center.phone}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Mail className="h-4 w-4 text-gray-400" />
                                  <span>{center.email}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                Active
                              </Badge>
                              <div className="flex items-center space-x-1 text-sm text-amber-600">
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                <span className="font-medium">4.8</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Professional Info Grid */}
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs font-medium text-gray-500 mb-1">Established</p>
                              <p className="text-sm font-semibold text-gray-900">
                                {new Date(center.created_at).getFullYear()}
                              </p>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs font-medium text-gray-500 mb-1">Service Type</p>
                              <p className="text-sm font-semibold text-gray-900">Full Service</p>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs font-medium text-gray-500 mb-1">Availability</p>
                              <p className="text-sm font-semibold text-gray-900">Open Today</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Professional Actions */}
                      <div className="flex items-center space-x-3 ml-6">
                        <Button 
                          size="sm"
                          className="bg-[#363DFF] hover:bg-[#363DFF]/90 text-white px-4 h-9 text-sm font-medium"
                        >
                          <Car className="h-4 w-4 mr-2" />
                          Book Service
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="px-4 h-9 text-sm font-medium border-gray-300 hover:bg-gray-50"
                          onClick={() => window.open(`tel:${center.phone}`, '_self')}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="px-3 h-9 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            )}
        </div>
      </div>
    </div>
  )
} 