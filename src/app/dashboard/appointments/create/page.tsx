"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Car, MapPin, Calendar, Clock, ArrowRight, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Form schema
const appointmentSchema = z.object({
  vehicleId: z.string().min(1, "Please select a vehicle"),
  serviceType: z.string().min(1, "Please select a service type"),
  serviceCenterId: z.string().min(1, "Please select a service center"),
  date: z.date({
    required_error: "Please select a date",
  }),
  timeSlot: z.string().min(1, "Please select a time slot"),
  notes: z.string().optional(),
})

type AppointmentFormData = z.infer<typeof appointmentSchema>

// Mock data
const vehicles = [
  { id: "1", make: "Toyota", model: "Camry", year: 2020, plateNumber: "WXY 1234" },
  { id: "2", make: "Honda", model: "Civic", year: 2019, plateNumber: "ABC 5678" },
  { id: "3", make: "Perodua", model: "Myvi", year: 2021, plateNumber: "DEF 9012" },
]

const serviceTypes = [
  { id: "oil-change", name: "Oil Change & Basic Maintenance", duration: "1 hour", price: "RM 120-180" },
  { id: "brake-service", name: "Brake Inspection & Service", duration: "2 hours", price: "RM 200-400" },
  { id: "ac-repair", name: "Air Conditioning Service", duration: "1.5 hours", price: "RM 150-300" },
  { id: "engine-diagnostic", name: "Engine Diagnostic", duration: "1 hour", price: "RM 80-150" },
  { id: "tire-service", name: "Tire Replacement/Repair", duration: "1 hour", price: "RM 100-500" },
  { id: "full-service", name: "Full Service Package", duration: "3 hours", price: "RM 400-800" },
]

const serviceCenters = [
  { 
    id: "1", 
    name: "AutoCare Plus", 
    location: "Kuala Lumpur", 
    rating: 4.8, 
    distance: "2.5 km",
    availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
  },
  { 
    id: "2", 
    name: "SpeedFix Workshop", 
    location: "Petaling Jaya", 
    rating: 4.6, 
    distance: "5.2 km",
    availableSlots: ["08:00", "09:30", "11:00", "13:30", "15:00", "16:30"]
  },
  { 
    id: "3", 
    name: "CoolCar Services", 
    location: "Shah Alam", 
    rating: 4.9, 
    distance: "8.1 km",
    availableSlots: ["09:00", "10:30", "12:00", "14:30", "16:00", "17:00"]
  },
]

const STEPS = [
  { id: 1, title: "Vehicle & Service", description: "Select your vehicle and service type" },
  { id: 2, title: "Service Center", description: "Choose your preferred service center" },
  { id: 3, title: "Date & Time", description: "Pick your appointment date and time" },
  { id: 4, title: "Confirmation", description: "Review and confirm your booking" },
]

export default function CreateAppointmentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      vehicleId: "",
      serviceType: "",
      serviceCenterId: "",
      timeSlot: "",
      notes: "",
    },
  })

  const selectedVehicle = vehicles.find(v => v.id === form.watch("vehicleId"))
  const selectedService = serviceTypes.find(s => s.id === form.watch("serviceType"))
  const selectedCenter = serviceCenters.find(c => c.id === form.watch("serviceCenterId"))

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log("Appointment booked:", data)
      alert("Appointment booked successfully!")
      // Redirect to appointments page
    } catch (error) {
      console.error("Error booking appointment:", error)
      alert("Failed to book appointment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return form.watch("vehicleId") && form.watch("serviceType")
      case 2:
        return form.watch("serviceCenterId")
      case 3:
        return selectedDate && form.watch("timeSlot")
      default:
        return true
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
        <p className="text-gray-600 mt-1">Schedule your car service appointment</p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2
                  ${currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-500'
                  }
                `}>
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="ml-3 min-w-0 flex-1">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 hidden sm:block">{step.description}</p>
                </div>
                {index < STEPS.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Step 1: Vehicle & Service */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Vehicle</CardTitle>
                  <CardDescription>Choose which vehicle needs service</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="vehicleId"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {vehicles.map((vehicle) => (
                            <div
                              key={vehicle.id}
                              className={`
                                p-4 border-2 rounded-lg cursor-pointer transition-colors
                                ${field.value === vehicle.id 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-200 hover:border-gray-300'
                                }
                              `}
                              onClick={() => field.onChange(vehicle.id)}
                            >
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback className="bg-blue-100 text-blue-700">
                                    {vehicle.make[0]}{vehicle.model[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="font-medium">{vehicle.make} {vehicle.model}</p>
                                  <p className="text-sm text-gray-500">{vehicle.year} • {vehicle.plateNumber}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Select Service Type</CardTitle>
                  <CardDescription>What service does your car need?</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {serviceTypes.map((service) => (
                            <div
                              key={service.id}
                              className={`
                                p-4 border-2 rounded-lg cursor-pointer transition-colors
                                ${field.value === service.id 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-200 hover:border-gray-300'
                                }
                              `}
                              onClick={() => field.onChange(service.id)}
                            >
                              <h3 className="font-medium mb-1">{service.name}</h3>
                              <div className="flex justify-between text-sm text-gray-500">
                                <span>{service.duration}</span>
                                <span className="font-medium text-green-600">{service.price}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Service Center */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Choose Service Center</CardTitle>
                <CardDescription>Select your preferred service center</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="serviceCenterId"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-4">
                        {serviceCenters.map((center) => (
                          <div
                            key={center.id}
                            className={`
                              p-4 border-2 rounded-lg cursor-pointer transition-colors
                              ${field.value === center.id 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                              }
                            `}
                            onClick={() => field.onChange(center.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">{center.name}</h3>
                                <div className="flex items-center mt-1 text-sm text-gray-600">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {center.location} • {center.distance}
                                </div>
                                <div className="flex items-center mt-1">
                                  <div className="flex items-center">
                                    <span className="text-sm font-medium">★ {center.rating}</span>
                                  </div>
                                </div>
                              </div>
                              <Badge variant="outline" className="ml-4">Available</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 3: Date & Time */}
          {currentStep === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                  <CardDescription>Choose your preferred appointment date</CardDescription>
                </CardHeader>
                <CardContent>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date)
                      form.setValue("date", date as Date)
                    }}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Select Time</CardTitle>
                  <CardDescription>Available time slots for {selectedCenter?.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="timeSlot"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedCenter?.availableSlots.map((slot) => (
                            <Button
                              key={slot}
                              type="button"
                              variant={field.value === slot ? "default" : "outline"}
                              className="justify-center"
                              onClick={() => field.onChange(slot)}
                            >
                              <Clock className="h-4 w-4 mr-2" />
                              {slot}
                            </Button>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Confirm Your Appointment</CardTitle>
                <CardDescription>Please review your booking details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Vehicle Details</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">{selectedVehicle?.make} {selectedVehicle?.model}</p>
                      <p className="text-sm text-gray-600">{selectedVehicle?.year} • {selectedVehicle?.plateNumber}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Service Details</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">{selectedService?.name}</p>
                      <p className="text-sm text-gray-600">{selectedService?.duration} • {selectedService?.price}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Service Center</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">{selectedCenter?.name}</p>
                      <p className="text-sm text-gray-600">{selectedCenter?.location} • {selectedCenter?.distance}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Date & Time</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">{selectedDate?.toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">{form.watch("timeSlot")}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Any special requests or notes..."
                            className="mt-2"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < STEPS.length ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceedToNext()}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
} 