'use client'

import React, { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Clock, CheckCircle2, MapPin, ArrowLeft } from 'lucide-react'
import { addDays, format, isAfter, isBefore } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'

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
  
  // Get parameters from URL
  const currentDate = searchParams.get('currentDate') || '2025-07-15'
  const currentTime = searchParams.get('currentTime') || '10:00 AM'
  const serviceName = searchParams.get('serviceName') || 'Premium Service Package'
  const vehicleName = searchParams.get('vehicleName') || '2023 Tesla Model S'
  const location = searchParams.get('location') || 'Tesla Service Center - Downtown'

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(currentDate))
  const [selectedTime, setSelectedTime] = useState(currentTime)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleConfirm = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Navigate back to vehicles page
    router.push('/dashboard/vehicles')
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
              <span>Back to Vehicles</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Reschedule Appointment</h1>
          <p className="text-gray-600">Choose a new date and time for your service appointment</p>
        </div>

        {/* Current Appointment Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Current Appointment</p>
              <p className="text-blue-700">
                {format(new Date(currentDate), 'EEEE, MMMM dd, yyyy')} at {currentTime}
              </p>
              <p className="text-sm text-blue-600 mt-1">{vehicleName} • {serviceName}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h2>
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
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Time</h2>
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

        {/* Appointment Summary */}
        {selectedDate && selectedTime && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                  <p className="text-gray-900 font-medium">
                    {format(selectedDate, 'EEEE, MMMM dd, yyyy')} at {selectedTime}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <p className="text-gray-900">{serviceName}</p>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
                  <p className="text-gray-900">{vehicleName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <p className="text-gray-900 flex items-center gap-2">
                    <MapPin size={16} className="text-gray-500" />
                    {location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="px-6"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime || isLoading}
            className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Confirming...
              </div>
            ) : (
              'Confirm Reschedule'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
} 