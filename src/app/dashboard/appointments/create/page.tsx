"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, ArrowLeft, Wrench, Phone, Star, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Mock service centers data
const serviceCenters = [
  {
    id: "1",
    name: "AutoCare Premium",
    type: "FULL SERVICE",
    location: "Kuala Lumpur",
    address: "123 Jalan Sultan, KL City Centre, 50000 Kuala Lumpur",
    image: "/api/placeholder/80/80",
    rating: 4.9,
    distance: "2.1 km",
    availability: [
      { date: "Nov 20, 2024", available: true },
      { date: "Nov 21, 2024", available: false },
      { date: "Nov 22, 2024", available: true }
    ],
    coordinates: { lat: 3.1390, lng: 101.6869 },
    phone: "+60 3-2123 4567",
    services: ["Oil Change", "Brake Service", "AC Repair", "Engine Diagnostic"]
  },
  {
    id: "2",
    name: "SpeedFix Workshop",
    type: "EXPRESS SERVICE",
    location: "Petaling Jaya",
    address: "45 Jalan SS2/24, Damansara Heights, 47300 Petaling Jaya",
    image: "/api/placeholder/80/80",
    rating: 4.7,
    distance: "5.2 km",
    availability: [
      { date: "Nov 20, 2024", available: true },
      { date: "Nov 21, 2024", available: true },
      { date: "Nov 22, 2024", available: false }
    ],
    coordinates: { lat: 3.1073, lng: 101.6505 },
    phone: "+60 3-7956 2345",
    services: ["Quick Oil Change", "Tire Service", "Battery Check"]
  },
  {
    id: "3",
    name: "CoolCar Services",
    type: "AC SPECIALIST",
    location: "Shah Alam",
    address: "78 Jalan Tengku Ampuan Zabedah C9/C, 40100 Shah Alam",
    image: "/api/placeholder/80/80",
    rating: 4.8,
    distance: "8.5 km",
    availability: [
      { date: "Nov 20, 2024", available: false },
      { date: "Nov 21, 2024", available: true },
      { date: "Nov 22, 2024", available: true }
    ],
    coordinates: { lat: 3.0733, lng: 101.5185 },
    phone: "+60 3-5511 8899",
    services: ["AC Repair", "Cooling System", "Radiator Service"]
  },
  {
    id: "4",
    name: "ProMech Auto Center",
    type: "ENGINE SPECIALIST",
    location: "Subang Jaya",
    address: "32 Jalan SS15/4D, SS15, 47500 Subang Jaya",
    image: "/api/placeholder/80/80",
    rating: 4.6,
    distance: "12.3 km",
    availability: [
      { date: "Nov 20, 2024", available: true },
      { date: "Nov 21, 2024", available: true },
      { date: "Nov 22, 2024", available: true }
    ],
    coordinates: { lat: 3.0738, lng: 101.5906 },
    phone: "+60 3-5633 1122",
    services: ["Engine Overhaul", "Transmission", "Suspension"]
  }
]

export default function CreateAppointmentPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("Anything")

  const filteredCenters = serviceCenters.filter(center => 
    searchQuery === "" || 
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "FULL SERVICE": return "bg-blue-100 text-blue-800"
      case "EXPRESS SERVICE": return "bg-green-100 text-green-800"
      case "AC SPECIALIST": return "bg-cyan-100 text-cyan-800"
      case "ENGINE SPECIALIST": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const handleSelectCenter = (centerId: string) => {
    // Navigate to appointment booking with selected center
    router.push(`/dashboard/appointments/book?centerId=${centerId}`)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Centers</h1>
          <p className="text-gray-600">Find and book your preferred service center</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Input
            placeholder="Search service centers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filter:</span>
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Anything">Anything</option>
            <option value="FULL SERVICE">Full Service</option>
            <option value="EXPRESS SERVICE">Express Service</option>
            <option value="AC SPECIALIST">AC Specialist</option>
            <option value="ENGINE SPECIALIST">Engine Specialist</option>
          </select>
        </div>
      </div>

      {/* Map Section */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
            {/* Map Placeholder - you can integrate with Google Maps or Mapbox here */}
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="relative w-full h-full bg-gradient-to-br from-blue-100 via-green-50 to-blue-50">
                  {/* Simulated map with service center markers */}
                  <div className="absolute inset-0 opacity-60">
                    <svg width="100%" height="100%" viewBox="0 0 800 400" className="w-full h-full">
                      {/* Map background */}
                      <rect width="800" height="400" fill="#f0f9ff"/>
                      
                      {/* Roads */}
                      <path d="M0 200 L800 200" stroke="#e5e7eb" strokeWidth="8"/>
                      <path d="M200 0 L200 400" stroke="#e5e7eb" strokeWidth="6"/>
                      <path d="M600 0 L600 400" stroke="#e5e7eb" strokeWidth="6"/>
                      <path d="M0 100 L800 100" stroke="#f3f4f6" strokeWidth="4"/>
                      <path d="M0 300 L800 300" stroke="#f3f4f6" strokeWidth="4"/>
                      
                      {/* Service center markers */}
                      {serviceCenters.map((center, index) => (
                        <g key={center.id}>
                          <circle 
                            cx={150 + index * 150} 
                            cy={120 + (index % 2) * 160} 
                            r="12" 
                            fill="#3b82f6" 
                            className="animate-pulse"
                          />
                          <circle 
                            cx={150 + index * 150} 
                            cy={120 + (index % 2) * 160} 
                            r="8" 
                            fill="white"
                          />
                          <text 
                            x={150 + index * 150} 
                            y={140 + (index % 2) * 160} 
                            textAnchor="middle" 
                            className="text-xs font-semibold" 
                            fill="#1f2937"
                          >
                            {center.name.split(' ')[0]}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                  
                  {/* Map overlay info */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Navigation size={16} className="text-blue-600" />
                      <span className="font-medium text-gray-900">Kuala Lumpur Area</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{filteredCenters.length} service centers nearby</p>
                  </div>
                  
                  {/* Zoom controls */}
                  <div className="absolute top-4 right-4 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
                    <button className="p-2 hover:bg-gray-50 border-b border-gray-100">
                      <span className="text-lg font-bold text-gray-600">+</span>
                    </button>
                    <button className="p-2 hover:bg-gray-50">
                      <span className="text-lg font-bold text-gray-600">−</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Centers List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Select Service Center</h2>
        
        <div className="grid gap-4">
          {filteredCenters.map((center) => (
            <Card key={center.id} className="hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-gray-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  {/* Service Center Image */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center">
                      <Wrench size={32} className="text-blue-600" />
                    </div>
                  </div>
                  
                  {/* Service Center Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-gray-900">{center.name}</h3>
                          <Badge className={`text-xs font-semibold px-2 py-1 ${getTypeColor(center.type)}`}>
                            {center.type}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-1">{center.location}</p>
                        <p className="text-sm text-gray-500 mb-2">{center.address}</p>
                        
                        {/* Rating and Distance */}
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star size={14} className="text-yellow-400 fill-current" />
                            <span className="font-medium text-gray-900">{center.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} className="text-gray-400" />
                            <span className="text-gray-600">{center.distance}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone size={14} className="text-gray-400" />
                            <span className="text-gray-600">{center.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Services */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {center.services.slice(0, 3).map((service, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {service}
                          </span>
                        ))}
                        {center.services.length > 3 && (
                          <span className="text-xs text-gray-500">+{center.services.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Availability and Action */}
                  <div className="flex-shrink-0 text-right">
                    <div className="space-y-2 mb-4">
                      {center.availability.map((slot, index) => (
                        <div key={index} className="flex items-center justify-end gap-2 text-sm">
                          <div className={`w-2 h-2 rounded-full ${slot.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-gray-600">{slot.date}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={() => handleSelectCenter(center.id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Select Office
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <div className="text-sm text-gray-500">
                     Can&apos;t find what you&apos;re looking for? <button className="text-blue-600 hover:text-blue-700 font-medium">Contact support</button>
        </div>
      </div>
    </div>
  )
} 