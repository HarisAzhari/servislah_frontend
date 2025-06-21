"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Car, Phone, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for appointments
const appointments = [
  {
    id: "1",
    date: "2024-01-15",
    time: "10:00 AM",
    service: "Oil Change & Basic Maintenance",
    vehicle: "Toyota Camry 2020",
    serviceCenter: "AutoCare Plus",
    location: "Kuala Lumpur",
    status: "confirmed",
    price: "RM 150",
    phone: "+60 12-345-6789"
  },
  {
    id: "2", 
    date: "2024-01-18",
    time: "2:30 PM",
    service: "Brake Inspection & Repair",
    vehicle: "Honda Civic 2019",
    serviceCenter: "SpeedFix Workshop",
    location: "Petaling Jaya",
    status: "pending",
    price: "RM 280",
    phone: "+60 11-987-6543"
  },
  {
    id: "3",
    date: "2024-01-12",
    time: "9:00 AM", 
    service: "Air Conditioning Service",
    vehicle: "Toyota Camry 2020",
    serviceCenter: "CoolCar Services",
    location: "Shah Alam",
    status: "completed",
    price: "RM 120",
    phone: "+60 13-456-7890"
  },
  {
    id: "4",
    date: "2024-01-20",
    time: "11:30 AM",
    service: "Tire Replacement",
    vehicle: "Honda Civic 2019", 
    serviceCenter: "TireMax Center",
    location: "Subang Jaya",
    status: "cancelled",
    price: "RM 400",
    phone: "+60 12-678-9012"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    case "completed":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-200"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
}

interface Appointment {
  id: string
  date: string
  time: string
  service: string
  vehicle: string
  serviceCenter: string
  location: string
  status: string
  price: string
  phone: string
}

const filterAppointments = (appointments: Appointment[], filter: string) => {
  if (filter === "all") return appointments
  return appointments.filter(appointment => appointment.status === filter)
}

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredAppointments = filterAppointments(appointments, activeTab).filter(
    appointment =>
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.serviceCenter.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header with smooth animation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
        <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text">My Appointments</h1>
          <p className="text-gray-600 mt-1">Manage your car service appointments</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards] group">
          <Calendar className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
          Book New Appointment
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setActiveTab("all")}>All Appointments</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("confirmed")}>Confirmed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("pending")}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("completed")}>Completed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("cancelled")}>Cancelled</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({appointments.length})</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed ({appointments.filter(a => a.status === "confirmed").length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({appointments.filter(a => a.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({appointments.filter(a => a.status === "completed").length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({appointments.filter(a => a.status === "cancelled").length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredAppointments.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
                <p className="text-gray-600 text-center">
                  {searchTerm ? "Try adjusting your search terms." : "You don't have any appointments yet."}
                </p>
                {!searchTerm && (
                  <Button className="mt-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Your First Appointment
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredAppointments.map((appointment, index) => (
                <Card 
                  key={appointment.id} 
                  className="hover:shadow-xl hover:scale-[1.01] transition-all duration-300 border-l-4 border-l-transparent hover:border-l-blue-500 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] group"
                  style={{ animationDelay: `${0.6 + (index * 0.1)}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{appointment.service}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Car className="h-4 w-4 mr-1" />
                          {appointment.vehicle}
                        </CardDescription>
                      </div>
                      <Badge className={`${getStatusColor(appointment.status)} transition-all duration-300 hover:scale-105`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        <div>
                          <p className="font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-500">Date</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-green-500" />
                        <div>
                          <p className="font-medium">{appointment.time}</p>
                          <p className="text-xs text-gray-500">Time</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-red-500" />
                        <div>
                          <p className="font-medium">{appointment.serviceCenter}</p>
                          <p className="text-xs text-gray-500">{appointment.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-purple-500" />
                        <div>
                          <p className="font-medium">{appointment.price}</p>
                          <p className="text-xs text-gray-500">Price</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                      {appointment.status === "confirmed" && (
                        <>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        </>
                      )}
                      {appointment.status === "pending" && (
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      )}
                      {appointment.status === "completed" && (
                        <Button variant="outline" size="sm">
                          Book Again
                        </Button>
                      )}
                      <Button size="sm">
                        Contact Shop
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 