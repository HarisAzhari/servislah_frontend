'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle2, MapPin, ArrowLeft, Car, Wrench, Calendar as CalendarIcon } from 'lucide-react'
import { addDays, format, isAfter, isBefore, parseISO } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { useGetAppointmentById, useUpdateAppointment } from '@/lib/tanstack/appoinment-tanstack'
import { toast } from 'sonner'
import DefaultButton from '@/components/default-button'
import { convertTimeTo24h } from '@/lib/helper'

const timeSlots = [
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '01:00 PM', available: true },
  { time: '02:00 PM', available: true },
  { time: '03:00 PM', available: false },
  { time: '04:00 PM', available: true },
  { time: '05:00 PM', available: true }
]

export default function ReschedulePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [appointmentId, setAppointmentId] = useState<string | null>(null)
  const { data: appointment, isLoading: isLoadingAppointment } = useGetAppointmentById(appointmentId || '')
  const { mutate: updateAppointment, isPending: isUpdatingAppointment } = useUpdateAppointment()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    appointment?.date ? parseISO(appointment.date) : undefined
  )
  const [selectedTime, setSelectedTime] = useState(appointment?.time || '')

  useEffect(() => {
    const appointmentId = searchParams.get('appointment_id')
    if (appointmentId) {
      setAppointmentId(appointmentId)
    }
  }, [searchParams])
  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time')
      return
    }
    try {
      const formattedDate = format(selectedDate || new Date(), 'yyyy-MM-dd')
      const formattedTime = convertTimeTo24h(selectedTime)

      const payload = {
        date: formattedDate,
        time: formattedTime,
        service_center_id: appointment?.service_center_id,
        user_id: appointment?.user_id,
      }

      updateAppointment({
        id: appointmentId || '',
        appointment: payload
      })
    } catch (error) {
      toast.error('Failed to reschedule appointment due to ' + error)
    }
  }

  if (isLoadingAppointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading appointment details...</span>
        </div>
      </div>
    )
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Appointment Not Found</h2>
          <p className="text-gray-600 mt-2">The appointment you're looking for doesn't exist.</p>
          <Button
            onClick={() => router.push('/dashboard/vehicles')}
            className="mt-4"
          >
            Go Back to Vehicles
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Appointment Summary Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-6">Appointment Details</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Vehicle</p>
                  <p className="text-gray-900 font-medium">{appointment.vehicle?.name || 'Vehicle'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Wrench className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="text-gray-900">{appointment.items?.[0]?.service?.name || 'Service'}</p>
                  {appointment.items && appointment.items.length > 1 && (
                    <p className="text-sm text-gray-500 mt-1">
                      +{appointment.items.length - 1} additional services
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <CalendarIcon className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Current Schedule</p>
                  <p className="text-gray-900">{format(parseISO(appointment.date), 'EEEE, MMMM dd, yyyy')}</p>
                  <p className="text-gray-900">{appointment.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900">{appointment.service_center?.name || 'Service Center'}</p>
                  <p className="text-sm text-gray-500 mt-1">{appointment.service_center?.address || ''}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Select New Schedule</h2>
          <p className="text-gray-600">Choose a new date and time for your service appointment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-base font-medium text-gray-900 mb-4">Select Date</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full"
              disabled={(date) => isBefore(date, new Date()) || isAfter(date, addDays(new Date(), 60))}
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center mb-4",
                caption_label: "text-lg font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: "h-8 w-8 bg-transparent p-0 hover:bg-gray-100 rounded-md transition-colors",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse",
                head_row: "flex mb-2",
                head_cell: "text-gray-500 rounded-md w-10 font-medium text-sm text-center",
                row: "flex w-full mt-1",
                cell: "h-10 w-10 text-center text-sm p-0 relative",
                day: cn(
                  "h-10 w-10 p-0 font-normal rounded-md hover:bg-gray-100 transition-colors",
                  "focus:bg-blue-100 focus:text-blue-900"
                ),
                day_selected: "bg-blue-600 text-white hover:bg-blue-600 focus:bg-blue-600",
                day_today: "bg-gray-100 text-gray-900 font-semibold",
                day_outside: "text-gray-300",
                day_disabled: "text-gray-300 opacity-50 cursor-not-allowed",
              }}
            />
          </div>

          {/* Time Selection */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-base font-medium text-gray-900 mb-4">Select Time</h3>
            <div className="space-y-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={cn(
                    "w-full p-3 text-left rounded-md border transition-colors",
                    slot.available
                      ? selectedTime === slot.time
                        ? "bg-blue-50 border-blue-200 text-blue-900"
                        : "border-gray-200 hover:bg-gray-50"
                      : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{slot.time}</span>
                    {!slot.available && <span className="text-sm">Unavailable</span>}
                    {selectedTime === slot.time && slot.available && (
                      <CheckCircle2 size={18} className="text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="px-6"
          >
            Cancel
          </Button>
          <DefaultButton
            isLoading={isUpdatingAppointment}
            handleSubmit={handleConfirm}
            props={{
              disabled: !selectedDate || !selectedTime || isUpdatingAppointment,
              className: "px-6 bg-blue-600 hover:bg-blue-700 text-white"
            }}
          >
            Confirm Reschedule
          </DefaultButton>

        </div>
      </div>
    </div>
  )
} 