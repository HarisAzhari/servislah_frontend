'use client'

import * as React from 'react'
import { Calendar as CalendarIcon, Clock, CheckCircle2, MapPin, ArrowRight } from 'lucide-react'
import { addDays, format, startOfToday, isSameDay, isAfter, isBefore } from 'date-fns'
import { cn } from '@/lib/utils'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

const timeSlots = [
  { time: '09:00 AM', available: 3, premium: false },
  { time: '10:00 AM', available: 1, premium: false },
  { time: '11:00 AM', available: 2, premium: true },
  { time: '01:00 PM', available: 4, premium: false },
  { time: '02:00 PM', available: 0, premium: false },
  { time: '03:00 PM', available: 2, premium: true },
  { time: '04:00 PM', available: 1, premium: false },
  { time: '05:00 PM', available: 3, premium: true }
]

interface RescheduleDialogProps {
  currentDate: string
  currentTime: string
  serviceName: string
  location: string
  vehicleName: string
}

export function RescheduleDialog({ 
  currentDate, 
  currentTime, 
  serviceName, 
  location, 
  vehicleName 
}: RescheduleDialogProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date(currentDate))
  const [selectedTime, setSelectedTime] = React.useState(currentTime)
  const [step, setStep] = React.useState<'date' | 'time' | 'confirm'>('date')
  const [isLoading, setIsLoading] = React.useState(false)
  
  const [quickDates] = React.useState(() => {
    const today = startOfToday()
    return Array.from({ length: 7 }, (_, i) => addDays(today, i + 1))
  })

  const handleConfirm = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Close dialog and show success
  }

  const StepIndicator = ({ currentStep }: { currentStep: string }) => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-4">
        {[
          { id: 'date', label: 'Select Date', icon: CalendarIcon },
          { id: 'time', label: 'Choose Time', icon: Clock },
          { id: 'confirm', label: 'Confirm', icon: CheckCircle2 }
        ].map((item, index) => (
          <React.Fragment key={item.id}>
            <div className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-500",
              currentStep === item.id 
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25" 
                : step === 'confirm' && item.id !== 'confirm'
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : "bg-slate-100 text-slate-400"
            )}>
              <item.icon size={16} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {index < 2 && (
              <ArrowRight size={16} className={cn(
                "transition-colors duration-300",
                (currentStep === 'time' && item.id === 'date') || 
                (currentStep === 'confirm' && item.id !== 'confirm')
                  ? "text-emerald-400" 
                  : "text-slate-300"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex-1 bg-white hover:bg-slate-50 text-slate-700 py-3 px-6 rounded-xl font-semibold transition-all duration-300 border border-slate-200 hover:border-slate-300">
          Reschedule
        </button>
      </DialogTrigger>
             <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-white border border-slate-200 shadow-xl">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30 rounded-2xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <DialogHeader className="text-center pb-6">
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2">
              Reschedule Your Service
            </DialogTitle>
            <DialogDescription className="text-slate-600 text-lg">
              {vehicleName} • {serviceName}
            </DialogDescription>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-slate-500">
              <MapPin size={14} />
              <span>{location}</span>
            </div>
          </DialogHeader>

          <StepIndicator currentStep={step} />

          <div className="space-y-8">
            {/* Current Appointment Info */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-amber-100 p-2 rounded-xl">
                  <Clock size={18} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800">Current Appointment</h3>
                  <p className="text-amber-600 text-sm">
                    {format(new Date(currentDate), 'EEEE, MMMM dd, yyyy')} at {currentTime}
                  </p>
                </div>
              </div>
            </div>

                         {/* Step Content */}
             <div className="min-h-[300px]">
              {step === 'date' && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Choose Your Perfect Date</h3>
                    <p className="text-slate-600">Select a date that works best for your schedule</p>
                  </div>

                                     {/* Quick Date Selection */}
                   <div className="space-y-3">
                     <h4 className="text-sm font-semibold text-slate-700">Quick Select</h4>
                     <div className="grid grid-cols-7 gap-2">
                       {quickDates.map((date, i) => (
                         <button
                           key={i}
                           onClick={() => setSelectedDate(date)}
                           className={cn(
                             "p-3 rounded-xl border transition-all duration-200",
                             selectedDate && isSameDay(date, selectedDate)
                               ? "bg-blue-500 text-white border-blue-500"
                               : "bg-white border-slate-200 hover:border-blue-300"
                           )}
                         >
                           <div className="text-center">
                             <div className="text-xs font-semibold mb-1">{format(date, 'EEE')}</div>
                             <div className="text-lg font-bold">{format(date, 'd')}</div>
                           </div>
                         </button>
                       ))}
                     </div>
                   </div>

                  {/* Calendar */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="w-full"
                      disabled={(date) => isBefore(date, new Date()) || isAfter(date, addDays(new Date(), 60))}
                      classNames={{
                        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                        month: "space-y-4",
                        caption: "flex justify-center pt-1 relative items-center text-lg font-semibold text-slate-800",
                        caption_label: "text-lg font-semibold",
                        nav: "space-x-1 flex items-center",
                        nav_button: cn(
                          "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-blue-50 rounded-lg transition-all"
                        ),
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell: "text-slate-500 rounded-md w-12 font-semibold text-sm",
                        row: "flex w-full mt-2",
                        cell: "h-12 w-12 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                        day: cn(
                          "h-12 w-12 p-0 font-medium aria-selected:opacity-100 rounded-xl transition-all duration-200",
                          "hover:bg-blue-100 hover:text-blue-800 hover:scale-110",
                          "focus:bg-blue-100 focus:text-blue-800 focus:scale-110"
                        ),
                        day_selected: "bg-gradient-to-b from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-110",
                        day_today: "bg-slate-100 text-slate-900 font-bold",
                        day_outside: "text-slate-300 opacity-50",
                        day_disabled: "text-slate-300 opacity-30",
                      }}
                    />
                  </div>
                </div>
              )}

              {step === 'time' && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Pick Your Ideal Time</h3>
                    <p className="text-slate-600">
                      Available slots for {selectedDate && format(selectedDate, 'EEEE, MMMM dd, yyyy')}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => slot.available > 0 && setSelectedTime(slot.time)}
                        disabled={slot.available === 0}
                        className={cn(
                          "group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105",
                          slot.available === 0
                            ? "bg-slate-50 border-slate-200 opacity-50 cursor-not-allowed"
                            : selectedTime === slot.time
                            ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-500 shadow-xl shadow-blue-500/25"
                            : "bg-white/70 backdrop-blur-sm border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10"
                        )}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-left">
                            <div className={cn(
                              "text-lg font-bold",
                              selectedTime === slot.time ? "text-white" : "text-slate-900"
                            )}>
                              {slot.time}
                            </div>
                            <div className={cn(
                              "text-sm flex items-center gap-1",
                              slot.available === 0
                                ? "text-slate-400"
                                : selectedTime === slot.time 
                                ? "text-white/80" 
                                : "text-slate-600"
                            )}>
                              {slot.available === 0 ? 'Fully Booked' : `${slot.available} slots available`}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {slot.premium && slot.available > 0 && (
                              <div className={cn(
                                "px-2 py-1 rounded-full text-xs font-semibold",
                                selectedTime === slot.time 
                                  ? "bg-white/20 text-white" 
                                  : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700"
                              )}>
                                Premium
                              </div>
                            )}
                            {selectedTime === slot.time && (
                              <CheckCircle2 size={20} className="text-white" />
                            )}
                          </div>
                        </div>
                        {slot.premium && slot.available > 0 && (
                          <div className={cn(
                            "text-xs",
                            selectedTime === slot.time ? "text-white/70" : "text-slate-500"
                          )}>
                            Priority service, premium waiting area
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 'confirm' && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                  <div className="text-center">
                                         <h3 className="text-xl font-bold text-slate-800 mb-2">Perfect! Let&apos;s Confirm</h3>
                    <p className="text-slate-600">Review your new appointment details</p>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-emerald-100 p-3 rounded-2xl">
                        <CheckCircle2 size={24} className="text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-emerald-800">New Appointment</h4>
                        <p className="text-emerald-600">Your service has been rescheduled</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-semibold text-slate-700">Date & Time</label>
                          <div className="text-lg font-bold text-slate-900">
                            {selectedDate && format(selectedDate, 'EEEE, MMM dd, yyyy')}
                          </div>
                          <div className="text-blue-600 font-semibold">{selectedTime}</div>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-slate-700">Service</label>
                          <div className="text-slate-900 font-medium">{serviceName}</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-semibold text-slate-700">Vehicle</label>
                          <div className="text-slate-900 font-medium">{vehicleName}</div>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-slate-700">Location</label>
                          <div className="text-slate-900 font-medium flex items-center gap-2">
                            <MapPin size={16} className="text-slate-500" />
                            {location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-200">
              <div className="flex gap-3">
                {step !== 'date' && (
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(step === 'confirm' ? 'time' : 'date')}
                    className="px-6"
                  >
                    Back
                  </Button>
                )}
                <DialogClose>
                  <Button variant="ghost" className="text-slate-500 hover:text-slate-700">
                    Cancel
                  </Button>
                </DialogClose>
              </div>

              <div className="flex gap-3">
                {step === 'date' && (
                  <Button 
                    onClick={() => setStep('time')}
                    disabled={!selectedDate}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Time
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                )}
                {step === 'time' && (
                  <Button 
                    onClick={() => setStep('confirm')}
                    disabled={!selectedTime}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Review Booking
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                )}
                {step === 'confirm' && (
                  <Button 
                    onClick={handleConfirm}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 disabled:opacity-50 min-w-[140px]"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Confirming...
                      </div>
                    ) : (
                      <>
                        Confirm Reschedule
                        <CheckCircle2 size={16} className="ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 