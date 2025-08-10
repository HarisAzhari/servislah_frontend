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
import { useRouter } from "next/navigation"
import { useGetAppointments } from "@/lib/tanstack/appoinment-tanstack"
import { Appointment } from "@/types/appointment"



const getStatusColor = (status: string): string => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return colors[status as keyof typeof colors] || colors.pending
}

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const router = useRouter()

  const { data: appointmentsData = [], isLoading } = useGetAppointments({})

  const filteredAppointments = appointmentsData

  return (
    <div className="space-y-6">
      {/* Header with smooth animation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
        <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-gray-900 dark:from-white to-blue-600 dark:to-blue-400 bg-clip-text">My Appointments</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your car service appointments</p>
        </div>
        <Button
          onClick={() => router.push('/dashboard/appointments/create')}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards] group">
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
        <TabsList className="w-full">
          <TabsTrigger value="all">All ({appointmentsData.length})</TabsTrigger>
          <TabsTrigger value="confirmed">
            Confirmed ({appointmentsData.filter((a: Appointment) => a.status === "CONFIRMED").length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({appointmentsData.filter((a: Appointment) => a.status === "PENDING").length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({appointmentsData.filter((a: Appointment) => a.status === "COMPLETED").length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({appointmentsData.filter((a: Appointment) => a.status === "CANCELLED").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredAppointments.length === 0 ? (
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Calendar className="h-10 w-10 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No appointments found</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                  {searchTerm ? "Try adjusting your search terms." : "You don't have any appointments yet."}
                </p>
                {!searchTerm && (
                  <Button className="mt-3 h-8 text-sm">
                    <Calendar className="h-3 w-3 mr-2" />
                    Book Your First Appointment
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredAppointments.map((appointment: Appointment, index: number) => (
                <Card
                  key={appointment.id}
                  className="hover:shadow-xl hover:scale-[1.01] transition-all duration-300 border-l-4 border-l-transparent hover:border-l-blue-500 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] group dark:bg-gray-800 dark:border-gray-700"
                  style={{ animationDelay: `${0.6 + (index * 0.1)}s` }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base dark:text-white">{appointment.service_center?.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1 dark:text-gray-300 text-sm">
                          <Car className="h-3 w-3 mr-1" />
                          {appointment.vehicle?.model} {appointment.vehicle?.year}
                        </CardDescription>
                      </div>
                      <Badge className={`${getStatusColor(appointment.status)} transition-all duration-300 hover:scale-105 text-xs`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Calendar className="h-3 w-3 mr-2 text-blue-500" />
                        <div>
                          <p className="font-medium dark:text-white text-xs">{new Date(appointment.date).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Clock className="h-3 w-3 mr-2 text-green-500" />
                        <div>
                          <p className="font-medium dark:text-white text-xs">{appointment.time}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <MapPin className="h-3 w-3 mr-2 text-red-500" />
                        <div>
                          <p className="font-medium dark:text-white text-xs">{appointment.service_center?.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{appointment.service_center?.locations?.city}, {appointment.service_center?.locations?.state}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Phone className="h-3 w-3 mr-2 text-purple-500" />
                        <div>
                          <p className="font-medium dark:text-white text-xs">{appointment.items.reduce((acc, item) => acc + item.price, 0)}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-3 pt-3 border-t dark:border-gray-700">
                      {appointment.status === "CONFIRMED" && (
                        <>
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            Cancel
                          </Button>
                        </>
                      )}
                      {appointment.status === "PENDING" && (
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          View Details
                        </Button>
                      )}
                      {appointment.status === "COMPLETED" && (
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Book Again
                        </Button>
                      )}
                      <Button size="sm" className="h-7 text-xs">
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