"use client";

import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Calendar,
  Wrench,
  Car,
  Users,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useGetServiceCenterById } from "@/lib/tanstack/service-center.tanstack";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


const ServiceCenterDetailPage = async (props: { params: Promise<{ id: string }> }) => {
  const serviceCenterID = (await props.params).id;

  const router = useRouter();
  const {
    data: serviceCenterResponse,
    isLoading,
    error,
  } = useGetServiceCenterById(serviceCenterID);

  const serviceCenter = serviceCenterResponse?.data?.service_center;

  const getDayName = (day: number) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[day];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateAverageRating = (reviews: Array<{ rating: number }>) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((total / reviews.length).toFixed(1));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#363DFF]" />
          <p className="text-gray-600">Loading service center details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-lg mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="p-4 bg-red-100 rounded-full mb-6">
              <MapPin className="h-16 w-16 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Error Loading Service Center
            </h3>
            <p className="text-gray-600 text-center max-w-md mb-6">
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred"}
            </p>
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!serviceCenter) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-lg mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="p-4 bg-gray-100 rounded-full mb-6">
              <MapPin className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Service Center Not Found
            </h3>
            <p className="text-gray-600 text-center max-w-md mb-6">
              The service center you&apos;re looking for doesn&apos;t exist or
              has been removed.
            </p>
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const averageRating = calculateAverageRating(serviceCenter.reviews || []);
  const reviewCount = serviceCenter.reviews?.length || 0;
  const completedAppointments =
    serviceCenter.appointments?.filter(
      (app: { status: string }) => app.status === "COMPLETED"
    ).length || 0;
  const totalAppointments = serviceCenter.appointments?.length || 0;
  const activeMechanics =
    serviceCenter.mechanics?.filter((m) => m.is_active).length || 0;
  const activeServices =
    serviceCenter.services?.filter((s) => s.is_active).length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {serviceCenter.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  Service center details and information
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() =>
                  router.push(
                    `/dashboard/appointments?service_center_id=${serviceCenter.id}`
                  )
                }
                className="px-4 py-2"
              >
                <Calendar className="w-4 h-4 mr-2" />
                View Appointments
              </Button>
              <Button
                onClick={() =>
                  router.push(
                    `/dashboard/appointments/create?service_center_id=${serviceCenter.id}`
                  )
                }
                className="px-4 py-2 bg-[#363DFF] hover:bg-[#363DFF]/90"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="aspect-[3/1] bg-gradient-to-r from-blue-600 to-blue-800 relative">
            {serviceCenter.image ? (
              <img
                src={serviceCenter.image}
                alt={serviceCenter.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-[#363DFF] to-blue-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <Car className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium opacity-75">
                    No Image Available
                  </p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{serviceCenter.name}</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">
                    {averageRating.toFixed(1)} ({reviewCount} reviews)
                  </span>
                </div>
                {serviceCenter.locations && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">
                      {serviceCenter.locations.city},{" "}
                      {serviceCenter.locations.state}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Services</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeServices}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Wrench className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Mechanics</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeMechanics}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Specializations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {serviceCenter.specializations?.length || 0}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Car className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalAppointments > 0
                    ? Math.round(
                      (completedAppointments / totalAppointments) * 100
                    )
                    : 0}
                  %
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-900">{serviceCenter.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Mail className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-900">{serviceCenter.email}</p>
                  </div>
                </div>
                {serviceCenter.locations && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <MapPin className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="text-gray-900">
                        {serviceCenter.locations.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        {serviceCenter.locations.city},{" "}
                        {serviceCenter.locations.state}{" "}
                        {serviceCenter.locations.zip_code}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Services */}
            {serviceCenter.services && serviceCenter.services.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Services Offered
                </h3>
                <div className="space-y-4">
                  {serviceCenter.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {service.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {service.description}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Duration: {service.duration} minutes
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          RM {service.price}
                        </p>
                        <Badge
                          variant={service.is_active ? "default" : "secondary"}
                        >
                          {service.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specializations */}
            {serviceCenter.specializations &&
              serviceCenter.specializations.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Specializations
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {serviceCenter.specializations.map((spec) => (
                      <div key={spec.id} className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium text-gray-900">
                          {spec.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {spec.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Operating Hours */}
            {serviceCenter.operating_hours &&
              serviceCenter.operating_hours.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Operating Hours
                  </h3>
                  <div className="space-y-3">
                    {serviceCenter.operating_hours.map((hour) => (
                      <div
                        key={hour.day}
                        className="flex items-center justify-between py-2"
                      >
                        <span className="text-gray-700">
                          {getDayName(hour.day)}
                        </span>
                        <span
                          className={`${hour.is_active ? "text-gray-900" : "text-gray-500"
                            }`}
                        >
                          {hour.is_active
                            ? `${hour.open_time} - ${hour.close_time}`
                            : "Closed"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Mechanics */}
            {serviceCenter.mechanics && serviceCenter.mechanics.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Our Mechanics
                </h3>
                <div className="space-y-4">
                  {serviceCenter.mechanics.map((mechanic, index) => (
                    <div
                      key={mechanic.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          Mechanic {index + 1}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={
                              mechanic.experience_level === "EXPERT"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {mechanic.experience_level}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {mechanic.years_of_exp} years exp
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full ${mechanic.is_active ? "bg-green-500" : "bg-gray-300"
                          }`}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {serviceCenter.reviews && serviceCenter.reviews.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Reviews
                </h3>
                <div className="space-y-4">
                  {serviceCenter.reviews.slice(-3).map((review) => (
                    <div key={review.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600">
                              {review.user?.name?.charAt(0) || "U"}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">
                            {review.user?.name || "Anonymous"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {review.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Appointments */}
            {serviceCenter.appointments &&
              serviceCenter.appointments.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Appointments
                  </h3>
                  <div className="space-y-3">
                    {serviceCenter.appointments.slice(-4).map(
                      (
                        appointment: {
                          id?: string;
                          service?: { name?: string };
                          appointment_date?: string;
                          status: string;
                        },
                        index: number
                      ) => (
                        <div
                          key={appointment.id || index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {appointment.service?.name ||
                                  `Appointment #${index + 1}`}
                              </p>
                              <p className="text-xs text-gray-600">
                                {appointment.appointment_date
                                  ? new Date(
                                    appointment.appointment_date
                                  ).toLocaleDateString()
                                  : "Date TBD"}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={getStatusColor(appointment.status)}
                          >
                            {appointment.status.replace("_", " ")}
                          </Badge>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCenterDetailPage;
