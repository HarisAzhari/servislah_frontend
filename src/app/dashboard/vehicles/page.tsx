'use client'

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, AlertTriangle, Car, Settings, Phone, ChevronRight, Gauge, Wrench } from 'lucide-react';
import { AddVehicleDialog } from '@/components/add-vehicle-dialog';
import { useRouter } from 'next/navigation';

const MyVehicles = () => {
  const router = useRouter();
  const [vehicles] = useState([
    {
      id: 1,
      make: 'Tesla',
      model: 'Model S',
      year: 2023,
      color: 'Pearl White',
      license: 'TESLA-01',
      mileage: 15420,
      nextAppointment: {
        date: '2025-07-15',
        time: '10:00 AM',
        service: 'Premium Service Package',
        location: 'Tesla Service Center - Downtown',
        estimatedDuration: '2-3 hours'
      },
      lastService: '2025-04-12',
      status: 'scheduled',
      health: 98,
      batteryLevel: 85
    },
    {
      id: 2,
      make: 'BMW',
      model: 'X5 M Competition',
      year: 2022,
      color: 'Carbon Black',
      license: 'BMW-X5M',
      mileage: 28750,
      nextAppointment: {
        date: '2025-08-03',
        time: '2:30 PM',
        service: 'Performance Brake Service',
        location: 'BMW Performance Center',
        estimatedDuration: '3-4 hours'
      },
      lastService: '2025-05-20',
      status: 'scheduled',
      health: 94
    },
    {
      id: 3,
      make: 'Porsche',
      model: '911 Turbo S',
      year: 2024,
      color: 'Guards Red',
      license: 'POR-911',
      mileage: 8920,
      nextAppointment: null,
      lastService: '2025-03-08',
      status: 'needs_scheduling',
      health: 89
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'scheduled': 
        return { 
          bg: 'bg-gradient-to-r from-emerald-50 to-teal-50', 
          text: 'text-emerald-700', 
          border: 'border-emerald-200',
          dot: 'bg-emerald-400'
        };
      case 'needs_scheduling': 
        return { 
          bg: 'bg-gradient-to-r from-amber-50 to-orange-50', 
          text: 'text-amber-700', 
          border: 'border-amber-200',
          dot: 'bg-amber-400'
        };
      default: 
        return { 
          bg: 'bg-gradient-to-r from-gray-50 to-slate-50', 
          text: 'text-gray-700', 
          border: 'border-gray-200',
          dot: 'bg-gray-400'
        };
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'text-emerald-600';
    if (health >= 85) return 'text-blue-600';
    if (health >= 75) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-100/30"></div>
      </div>
      
      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                My Fleet
              </h1>
              <p className="text-slate-600 text-lg">Premium vehicle management and service scheduling</p>
            </div>
            <AddVehicleDialog />
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
            {[
              { label: 'Total Vehicles', value: '3', icon: Car, gradient: 'from-blue-500 to-cyan-500' },
              { label: 'Scheduled Services', value: '2', icon: Calendar, gradient: 'from-emerald-500 to-teal-500' },
              { label: 'Avg Health Score', value: '94%', icon: Gauge, gradient: 'from-violet-500 to-purple-500' },
              { label: 'Next Service', value: '24 days', icon: Clock, gradient: 'from-orange-500 to-red-500' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg shadow-slate-200/50">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
                <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Vehicles Grid */}
          <div className="grid gap-8 lg:grid-cols-1 xl:grid-cols-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
            {vehicles.map((vehicle) => {
              const statusConfig = getStatusConfig(vehicle.status);
              
              return (
                <div key={vehicle.id} className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/50 border border-white/20 overflow-hidden hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:-translate-y-1 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]" style={{ animationDelay: `${0.6 + (vehicle.id * 0.1)}s` }}>
                  {/* Vehicle Header with Gradient */}
                  <div className="bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                    
                    <div className="relative z-10 flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                          <Car className="text-white" size={28} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h3>
                          <p className="text-blue-100">{vehicle.color} • {vehicle.license}</p>
                        </div>
                      </div>
                      
                      <div className={`px-4 py-2 rounded-full text-sm font-semibold ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border backdrop-blur-sm`}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
                          {vehicle.status === 'scheduled' ? 'Scheduled' : 'Needs Service'}
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Stats */}
                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{vehicle.mileage.toLocaleString()}</div>
                        <div className="text-blue-200 text-sm">Miles</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getHealthColor(vehicle.health)}`}>{vehicle.health}%</div>
                        <div className="text-blue-200 text-sm">Health Score</div>
                      </div>
                      {vehicle.batteryLevel && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-400">{vehicle.batteryLevel}%</div>
                          <div className="text-blue-200 text-sm">Battery</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Appointment Section */}
                  <div className="p-8">
                    {vehicle.nextAppointment ? (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 text-slate-800">
                          <Calendar size={20} className="text-blue-600" />
                          <span className="font-semibold text-lg">Upcoming Service</span>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                          <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Clock size={18} className="text-blue-600" />
                                <div>
                                  <div className="font-bold text-slate-800">{formatDate(vehicle.nextAppointment.date)}</div>
                                  <div className="text-slate-600 text-sm">{vehicle.nextAppointment.time} • {vehicle.nextAppointment.estimatedDuration}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-white/60 rounded-xl p-4">
                              <div className="font-semibold text-slate-800 mb-2">{vehicle.nextAppointment.service}</div>
                              <div className="flex items-center gap-2 text-slate-600">
                                <MapPin size={16} />
                                <span className="text-sm">{vehicle.nextAppointment.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Premium Action Buttons */}
                        <div className="flex gap-4">
                          <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30">
                            View Details
                          </button>
                          <button 
                            onClick={() => {
                              const params = new URLSearchParams({
                                currentDate: vehicle.nextAppointment.date,
                                currentTime: vehicle.nextAppointment.time,
                                serviceName: vehicle.nextAppointment.service,
                                location: vehicle.nextAppointment.location,
                                vehicleName: `${vehicle.year} ${vehicle.make} ${vehicle.model}`
                              });
                              router.push(`/dashboard/appointments/reschedule?${params.toString()}`);
                            }}
                            className="flex-1 bg-white hover:bg-slate-50 text-slate-700 py-3 px-6 rounded-xl font-semibold transition-all duration-300 border border-slate-200 hover:border-slate-300"
                          >
                            Reschedule
                          </button>
                          <button className="bg-white hover:bg-slate-50 text-slate-700 p-3 rounded-xl transition-all duration-300 border border-slate-200 hover:border-slate-300">
                            <Phone size={18} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 text-amber-600">
                          <AlertTriangle size={20} />
                          <span className="font-semibold text-lg">Service Required</span>
                        </div>
                        
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 text-center">
                          <div className="mb-4">
                            <Wrench size={32} className="text-amber-500 mx-auto mb-3" />
                            <p className="text-slate-700 font-medium">Your vehicle is due for scheduled maintenance</p>
                            <p className="text-slate-600 text-sm mt-2">Last service: {formatDate(vehicle.lastService)}</p>
                          </div>
                          <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30">
                            Schedule Service
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="flex gap-3 pt-6 border-t border-slate-100">
                      <button className="flex items-center gap-2 text-slate-600 hover:text-slate-800 px-4 py-2 rounded-xl hover:bg-slate-50 transition-all duration-300 group">
                        <Settings size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                        <span className="font-medium">Manage</span>
                      </button>
                      <button className="flex items-center gap-2 text-slate-600 hover:text-slate-800 px-4 py-2 rounded-xl hover:bg-slate-50 transition-all duration-300">
                        <span className="font-medium">Service History</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyVehicles;