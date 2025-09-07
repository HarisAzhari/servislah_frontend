"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  Phone,
  Filter,
  Search,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock4,
  Star,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useGetAppointments } from "@/lib/tanstack/appoinment-tanstack";
import { Appointment } from "@/types/appointment";

const getStatusConfig = (status: string) => {
  const configs = {
    pending: {
      color:
        "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 border-amber-200",
      icon: Clock4,
      iconColor: "text-amber-500",
      borderColor: "border-l-amber-400",
    },
    confirmed: {
      color:
        "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-800 border-emerald-200",
      icon: CheckCircle,
      iconColor: "text-emerald-500",
      borderColor: "border-l-emerald-400",
    },
    completed: {
      color:
        "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 border-blue-200",
      icon: Star,
      iconColor: "text-blue-500",
      borderColor: "border-l-blue-400",
    },
    cancelled: {
      color:
        "bg-gradient-to-r from-red-50 to-rose-50 text-red-800 border-red-200",
      icon: XCircle,
      iconColor: "text-red-500",
      borderColor: "border-l-red-400",
    },
  };
  return configs[status as keyof typeof configs] || configs.pending;
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
  }).format(price);
};

export default function AppointmentsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const { data: appointmentsData = [], isLoading } = useGetAppointments({});

  const filteredAppointments = appointmentsData;

  return (
    <div className="space-y-6">
      {/* Header with smooth animation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
        <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-gray-900 dark:from-white to-blue-600 dark:to-blue-400 bg-clip-text">
            My Appointments
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage your car service appointments
          </p>
        </div>
        <Button
          onClick={() => router.push("/dashboard/appointments/create")}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards] group"
        >
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
            <DropdownMenuItem onClick={() => setActiveTab("all")}>
              All Appointments
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("confirmed")}>
              Confirmed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("pending")}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("completed")}>
              Completed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("cancelled")}>
              Cancelled
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]"
      >
        <TabsList className="w-full">
          <TabsTrigger value="all">All ({appointmentsData.length})</TabsTrigger>
          <TabsTrigger value="confirmed">
            Confirmed (
            {
              appointmentsData.filter(
                (a: Appointment) => a.status === "CONFIRMED"
              ).length
            }
            )
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending (
            {
              appointmentsData.filter(
                (a: Appointment) => a.status === "PENDING"
              ).length
            }
            )
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed (
            {
              appointmentsData.filter(
                (a: Appointment) => a.status === "COMPLETED"
              ).length
            }
            )
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled (
            {
              appointmentsData.filter(
                (a: Appointment) => a.status === "CANCELLED"
              ).length
            }
            )
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredAppointments.length === 0 ? (
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Calendar className="h-10 w-10 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No appointments found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                  {searchTerm
                    ? "Try adjusting your search terms."
                    : "You don't have any appointments yet."}
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
              {filteredAppointments.map(
                (appointment: Appointment, index: number) => {
                  const statusConfig = getStatusConfig(
                    appointment.status.toLowerCase()
                  );
                  const StatusIcon = statusConfig.icon;
                  const totalPrice = appointment.items.reduce(
                    (acc, item) => acc + item.price,
                    0
                  );

                  return (
                    <Card
                      key={appointment.id}
                      className={`group relative overflow-hidden border-l-4 ${statusConfig.borderColor} bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] cursor-pointer`}
                      style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                    >
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative">
                        {/* Header Section */}
                        <CardHeader className="pb-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-[#363DFF]/10 to-[#4F46E5]/10 border border-[#363DFF]/20">
                                  <Car className="h-5 w-5 text-[#363DFF]" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#363DFF] transition-colors duration-300">
                                    {appointment.service_center?.name}
                                  </CardTitle>
                                  <CardDescription className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                                    {appointment.vehicle?.model}{" "}
                                    {appointment.vehicle?.year}
                                  </CardDescription>
                                </div>
                              </div>
                            </div>

                            {/* Enhanced Status Badge */}
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border ${statusConfig.color} shadow-sm`}
                            >
                              <StatusIcon
                                className={`h-4 w-4 ${statusConfig.iconColor}`}
                              />
                              <span className="text-sm font-semibold">
                                {appointment.status.charAt(0).toUpperCase() +
                                  appointment.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                          {/* Main Info Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Date & Time */}
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                  {new Date(
                                    appointment.date
                                  ).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  at {appointment.time}
                                </p>
                              </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                                <MapPin className="h-4 w-4 text-red-600 dark:text-red-400" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                                  {appointment.service_center?.locations?.city}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {appointment.service_center?.locations?.state}
                                </p>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                                <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 dark:text-white text-sm">
                                  {formatPrice(totalPrice)}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Total cost
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Services Summary */}
                          {appointment.items &&
                            appointment.items.length > 0 && (
                              <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                  Services:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {appointment.items
                                    .slice(0, 3)
                                    .map((item, idx) => (
                                      <span
                                        key={idx}
                                        className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-200 dark:border-blue-700"
                                      >
                                        {item.name}
                                      </span>
                                    ))}
                                  {appointment.items.length > 3 && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium">
                                      +{appointment.items.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                          {/* Action Buttons */}
                          <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex gap-2">
                              {appointment.status === "CONFIRMED" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs border-[#363DFF] text-[#363DFF] hover:bg-[#363DFF] hover:text-white transition-colors"
                                  >
                                    Reschedule
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                  >
                                    Cancel
                                  </Button>
                                </>
                              )}
                              {appointment.status === "PENDING" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white transition-colors"
                                >
                                  View Details
                                </Button>
                              )}
                              {appointment.status === "COMPLETED" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors"
                                >
                                  Book Again
                                </Button>
                              )}
                            </div>

                            <div className="flex gap-2 flex-wrap">
                              {appointment.status === "COMPLETED" && (
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    router.push(
                                      `/dashboard/review?appointment_id=${appointment.id}`
                                    )
                                  }
                                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300 group/review"
                                >
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                  <span className="text-xs">Write Review</span>
                                  <Star className="h-3 w-3 ml-1 group-hover/review:text-yellow-200 transition-colors duration-300" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-[#363DFF] to-[#4F46E5] hover:from-[#2563EB] hover:to-[#363DFF] text-white shadow-md hover:shadow-lg transition-all duration-300 group/btn"
                              >
                                <span className="text-xs">Contact Shop</span>
                                <ArrowRight className="h-3 w-3 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  );
                }
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
