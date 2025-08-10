"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Clock,
  Car,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Check,
  Plus,
  X,
  Loader2,
  Search,
} from "lucide-react";
import { Service, ServiceCenter } from "@/types/service-center";
import { Vehicle } from "@/types/vehicle";
import { useCreateAppointment } from "@/lib/tanstack/appoinment-tanstack";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useGetServiceCenterById,
  useGetServiceCenters,
} from "@/lib/tanstack/service-center.tanstack";
import { toast } from "sonner";
import { useGetUserVehicles } from "@/lib/tanstack/vehicle-tanstack";
import { CreateAppointmentRequest } from "@/types/appointment";
import DefaultButton from "@/components/default-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateAppointmentPage: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [serviceCenterId, setServiceCenterId] = useState<string | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const [overflowingDescriptions, setOverflowingDescriptions] = useState<Record<string, boolean>>({});
  const descriptionRefs = useRef<Record<string, HTMLParagraphElement | null>>({});

  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const id = searchParams.get("service_center_id");
    if (id) {
      setServiceCenterId(id);
    } else {
      // Clear when query param removed (e.g., back navigation)
      setServiceCenterId(null);
    }
  }, [searchParams]);

  const { data: serviceCenterResponse } = useGetServiceCenterById(
    serviceCenterId || ""
  );
  const serviceCenter = serviceCenterResponse?.data?.service_center;

  const { data: serviceCenters } = useGetServiceCenters();

  const filteredServiceCenters = serviceCenters?.filter(
    (center: ServiceCenter) =>
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { mutate: createAppointment, isPending: isCreatingAppointment } =
    useCreateAppointment();

  const { data: vehiclesData } = useGetUserVehicles();

  const availableServices: Service[] = serviceCenter?.services || [];

  const userVehicles: Vehicle[] = (vehiclesData as any)?.vehicles || vehiclesData || [];

  const availableTimes: string[] = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  const toggleService = (service: Service) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const getTotalPrice = () => {
    return selectedServices.reduce(
      (total, service) => total + service.price,
      0
    );
  };

  const getTotalDuration = () => {
    return selectedServices.reduce(
      (total, service) => total + service.duration,
      0
    );
  };

  const handleSubmit = () => {
    if (!serviceCenter || !selectedVehicle?.id) return;

    const payload = {
      service_center_id: serviceCenter.id,
      vehicle_id: selectedVehicle.id,
      date: selectedDate,
      time: selectedTime,
      items: selectedServices.map((service) => ({
        service_id: service.id,
      })),
    };

    createAppointment(payload as CreateAppointmentRequest);
  };

  const isFormValid: boolean =
    selectedServices.length > 0 &&
    selectedVehicle !== null &&
    selectedDate !== "" &&
    selectedTime !== "";

  // Measure description overflow on mobile to decide whether to show View more
  useEffect(() => {
    const measure = () => {
      const next: Record<string, boolean> = {};
      (serviceCenter?.services || []).forEach((s: Service) => {
        const el = descriptionRefs.current[s.id];
        if (el) {
          const isOverflow = el.scrollHeight > el.clientHeight + 1; // small buffer
          next[s.id] = isOverflow;
        }
      });
      setOverflowingDescriptions(next);
    };
    // allow layout to settle
    const r = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(r);
  }, [serviceCenter]);

  return (
    <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 -my-8">
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 pb-24 lg:pb-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl mt-3 sm:mt-4">
        <div className="px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div >
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Book Appointment
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Schedule your vehicle service
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-0 py-8">
        {!serviceCenterId ? (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search service centers..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="pl-10 h-11 text-sm border-gray-300 focus:border-[#363DFF] focus:ring-[#363DFF]/20 transition-colors"
              />
            </div>

            {/* Service Centers List */}
            <div className="space-y-4">
              {filteredServiceCenters?.map(
                (center: ServiceCenter, index: number) => (
                  <div
                    key={center.id}
                    className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
                  >
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                {center.name}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
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
                          </div>

                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span>{center.locations?.address}</span>
                            </div>
                          </div>
                        </div>

                        <div className="sm:ml-6 w-full sm:w-auto">
                          <Button
                            onClick={() =>
                              router.push(
                                `/dashboard/appointments/create?service_center_id=${center.id}`
                              )
                            }
                            size="sm"
                            className="bg-[#363DFF] hover:bg-[#363DFF]/90 text-white h-10 px-4 text-sm font-semibold rounded-full w-full sm:w-auto"
                          >
                            <Car className="h-4 w-4 mr-2" />
                            Book Service
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Progress Steps */}
            <div className="mb-6 sm:mb-8">
              {/* Mobile: compact, all 4 visible without scrolling */}
              <div className="sm:hidden grid grid-cols-4 gap-2 w-full">
                {[
                  { step: 1, label: "Services" },
                  { step: 2, label: "Vehicle" },
                  { step: 3, label: "Date" },
                  { step: 4, label: "Review" },
                ].map((item) => (
                  <div key={item.step} className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        currentStep >= item.step
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300"
                      }`}
                    >
                      <span className="text-xs font-semibold">{item.step}</span>
                    </div>
                    <span
                      className={`mt-1 text-[11px] leading-none font-medium ${
                        currentStep >= item.step
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Desktop/tablet: original with connectors */}
              <div className="hidden sm:flex items-center justify-center">
                <div className="flex items-center space-x-8">
                  {[
                    { step: 1, label: "Services" },
                    { step: 2, label: "Vehicle" },
                    { step: 3, label: "Date & Time" },
                    { step: 4, label: "Review" },
                  ].map((item, index) => (
                    <div key={item.step} className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          currentStep >= item.step
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300"
                        }`}
                      >
                        <span className="text-sm font-medium">{item.step}</span>
                      </div>
                      <span
                        className={`ml-2 text-sm font-medium ${
                          currentStep >= item.step
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {item.label}
                      </span>
                      {index < 3 && (
                        <div
                          className={`ml-8 w-16 h-0.5 ${
                            currentStep > item.step
                              ? "bg-blue-600"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Select Services
                    </h2>
                    <div className="space-y-4">
                      {availableServices.map((service: Service) => {
                        const isSelected = selectedServices.some((s) => s.id === service.id);
                        return (
                          <div
                            key={service.id}
                            onClick={() => toggleService(service)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              isSelected
                                ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  {/* Mobile: no checkbox, show Selected pill */}
                                  {isSelected && (
                                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-600 text-white sm:hidden">
                                      Selected
                                    </span>
                                  )}
                                  <h3 className="font-medium text-gray-900 dark:text-white truncate">
                                    {service.name}
                                  </h3>
                                </div>
                                <p
                                  ref={(el) => {
                                    descriptionRefs.current[service.id] = el;
                                  }}
                                  className={`text-sm text-gray-600 dark:text-gray-300 ${
                                  expandedDescriptions[service.id] ? '' : 'line-clamp-2'
                                } sm:line-clamp-none`}
                                >
                                  {service.description}
                                </p>
                                {/* Mobile only: View more / less toggle */}
                                {overflowingDescriptions[service.id] && (
                                  <Button
                                    variant="link"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedDescriptions((prev) => ({
                                        ...prev,
                                        [service.id]: !prev[service.id],
                                      }));
                                    }}
                                    className="sm:hidden mt-1 px-0 h-auto text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline"
                                  >
                                    {expandedDescriptions[service.id] ? "View less" : "View more"}
                                  </Button>
                                )}
                                <div className="flex items-center gap-3 mt-2">
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    <Clock className="w-4 h-4 inline mr-1" />
                                    {service.duration} min
                                  </span>
                                  <span
                                    className={`text-sm px-2 py-1 rounded ${
                                      service.is_active
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                                  >
                                    {service.is_active ? "Active" : "Inactive"}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right shrink-0 ml-2">
                                {isSelected && (
                                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-600 text-white mb-1">
                                    Selected
                                  </span>
                                )}
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">RM {service.price}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 sm:mt-6 flex justify-end">
                      <button
                        onClick={() => setCurrentStep(2)}
                        disabled={selectedServices.length === 0}
                        className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Vehicle Selection */}
                {currentStep === 2 && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Select Vehicle
                    </h2>
                    <div className="space-y-4">
                      {userVehicles.map((vehicle: Vehicle) => (
                        <div
                          key={vehicle.id}
                          onClick={() => setSelectedVehicle(vehicle)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedVehicle?.id === vehicle.id
                              ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                              <Car className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {vehicle.year} {vehicle.license_plate}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {vehicle.license_plate} • {vehicle.color}
                              </p>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border-2 ${
                                selectedVehicle?.id === vehicle.id
                                  ? "border-blue-600 bg-blue-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedVehicle?.id === vehicle.id && (
                                <Check className="w-3 h-3 text-white m-0.5" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 sm:mt-6 flex justify-between">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="px-4 sm:px-6 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setCurrentStep(3)}
                        disabled={!selectedVehicle}
                        className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Date & Time Selection */}
                {currentStep === 3 && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Select Date & Time
                    </h2>

                    {/* Date Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preferred Date
                      </label>
                      <div className="w-full">
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full h-10 px-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preferred Time
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                        {availableTimes.map((time: string) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`h-10 px-2 text-sm rounded-md border transition-colors ${
                              selectedTime === time
                                ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-6 flex justify-between">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="px-4 sm:px-6 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setCurrentStep(4)}
                        disabled={!selectedDate || !selectedTime}
                        className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Confirm */}
                {currentStep === 4 && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Review Appointment
                    </h2>

                    {/* Selected Services */}
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                        Selected Services
                      </h3>
                      <div className="space-y-2">
                        {selectedServices.map((service: Service) => (
                          <div
                            key={service.id}
                            className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {service.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {service.duration} minutes
                              </p>
                            </div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              RM {service.price}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Selected Vehicle */}
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                        Vehicle
                      </h3>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {selectedVehicle?.year}{" "}
                          {selectedVehicle?.license_plate}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {selectedVehicle?.color}
                        </p>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                        Appointment Details
                      </h3>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {selectedDate} at {selectedTime}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Total duration: {getTotalDuration()} minutes
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-6 flex justify-between">
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="px-6 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Back
                      </button>
                      <DefaultButton
                        isLoading={isCreatingAppointment}
                        handleSubmit={handleSubmit}
                      >
                        Book Appointment
                      </DefaultButton>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Service Center Info */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                  {serviceCenter && (
                    <>
                      <img
                        src={serviceCenter.image}
                        alt={serviceCenter.name}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                        {serviceCenter.name}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{serviceCenter.locations?.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{serviceCenter.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{serviceCenter.email}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Order Summary */}
                {selectedServices.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Order Summary
                    </h3>
                    <div className="space-y-3">
                      {selectedServices.map((service: Service) => (
                        <div
                          key={service.id}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600 dark:text-gray-300">{service.name}</span>
                          <span className="font-medium dark:text-white">
                            RM {service.price}
                          </span>
                        </div>
                      ))}
                      <div className="border-t dark:border-gray-700 pt-3">
                        <div className="flex justify-between font-semibold dark:text-white">
                          <span>Total</span>
                          <span>RM {getTotalPrice()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-1">
                          <span>Total Duration</span>
                          <span>{getTotalDuration()} minutes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default CreateAppointmentPage;
