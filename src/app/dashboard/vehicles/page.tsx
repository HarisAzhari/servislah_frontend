'use client'

import React, { useEffect, useState } from 'react';
import { Heart, Info, Phone, Search } from 'lucide-react';
import { Vehicle } from '@/types/vehicle';
import { vehicleService } from '@/lib/services/vehicleService';

const MyVehicles = () => {
  const [vehiclesAPI, setVehiclesAPI] = useState<Vehicle[]>([])
  useEffect(() => {
    const fetchVehicles = async () => {
      const vehicles = await vehicleService.getVehicles('1591e87d-bbc6-4b59-9f89-bd7d9b3e0286')
      setVehiclesAPI(vehicles as Vehicle[])
    }
    fetchVehicles()
  }, [])
  const [vehicles] = useState([
    {
      id: 1,
      make: 'Tesla',
      model: 'Model S',
      year: 2023,
      image: '/placeholder-car1.jpg',
      price: 285892,
      style: 'Tesla',
      type: 'Electric',
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
      batteryLevel: 85,
      isFavorite: false
    },
    {
      id: 2,
      make: 'BMW',
      model: 'X5 M Competition',
      year: 2022,
      image: '/placeholder-car2.jpg',
      price: 285892,
      style: 'BMW',
      type: 'SUV',
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
      health: 94,
      isFavorite: true
    },
    {
      id: 3,
      make: 'Porsche',
      model: '911 Turbo S',
      year: 2024,
      image: '/placeholder-car3.jpg',
      price: 285892,
      style: 'Porsche',
      type: 'Sports',
      color: 'Guards Red',
      license: 'POR-911',
      mileage: 8920,
      nextAppointment: null,
      lastService: '2025-03-08',
      status: 'needs_scheduling',
      health: 89,
      isFavorite: false
    },
    {
      id: 4,
      make: 'Audi',
      model: 'R8 V10',
      year: 2023,
      image: '/placeholder-car4.jpg',
      price: 285892,
      style: 'Audi',
      type: 'Sports',
      color: 'Quantum Gray',
      license: 'AUD-R8V',
      mileage: 12340,
      nextAppointment: null,
      lastService: '2025-02-15',
      status: 'needs_scheduling',
      health: 91,
      isFavorite: false
    }
  ]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Main Content */}
      <div className="flex">
        {/* Content Area */}
        <div className="flex-1 p-8">
          {/* Filter Controls */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            <div>
              <label className="block text-slate-600 text-sm mb-2 font-medium">Location</label>
              <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option>GST, Mall Gulshan</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 text-sm mb-2 font-medium">Pick Up Date</label>
              <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option>06-Sep-2023</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 text-sm mb-2 font-medium">Drop of Date</label>
              <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option>06-Sep-2023</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 text-sm mb-2 font-medium">Pickup Time</label>
              <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option>10:00 AM</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 text-sm mb-2 font-medium">Drop off Time</label>
              <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option>05:00 PM</option>
              </select>
            </div>
          </div>

          {/* Available Cars Section */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Available Cars</h2>
            <div className="flex items-center gap-4">
              <button className="text-slate-600 hover:text-slate-800 font-medium">View All</button>
              <button className="text-slate-600 hover:text-slate-800 font-medium">Recent Activity</button>
              <Info className="text-slate-500" size={20} />
            </div>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-2 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 relative group" style={{
                boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                transform: 'perspective(1000px) rotateX(1deg)',
                transformStyle: 'preserve-3d'
              }}>
                {/* Curved bottom shadow effect */}
                <div className="absolute -bottom-2 left-4 right-4 h-4 bg-slate-200/40 rounded-full blur-md" style={{
                  transform: 'perspective(100px) rotateX(45deg) scaleY(0.3)'
                }}></div>

                {/* Favorite Button */}
                <button className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                  {vehicle.isFavorite ? (
                    <Heart className="text-red-500 fill-current" size={20} />
                  ) : (
                    <Heart className="text-slate-400 hover:text-red-500" size={20} />
                  )}
                </button>

                {/* Car Image */}
                <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6 relative">
                  <img
                    src="/black-isolated-car_23-2151852894-removebg-preview.png"
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-contain transform scale-110 group-hover:scale-115 transition-transform duration-300"
                  />
                </div>

                {/* Car Details */}
                <div className="p-6 bg-white relative">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    {vehicle.make} {vehicle.model}
                  </h3>

                  <div className="grid grid-cols-3 gap-4 text-sm mb-6">
                    <div>
                      <span className="text-slate-500">Style: </span>
                      <span className="text-slate-800 font-medium">{vehicle.style}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Type: </span>
                      <span className="text-slate-800 font-medium">{vehicle.type}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Color: </span>
                      <span className="text-slate-800 font-medium">{vehicle.color}</span>
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-blue-600">
                    $ {vehicle.price.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-white/70 backdrop-blur-sm p-6 border border-white/20">
          {/* Export Button */}
          <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 px-4 rounded-lg font-medium mb-8 flex items-center justify-center gap-2 shadow-lg">
            📤 Export
          </button>

          {/* Car Info Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚗</span>
              </div>
              <div>
                <h3 className="text-slate-800 font-bold">Lamborghini Autofill</h3>
                <p className="text-slate-600 text-sm">2 hrs Rescaling</p>
              </div>
            </div>

            <div className="text-2xl font-bold text-blue-600 mb-4">$ 285,892</div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-600">Car Info</span>
                <Info className="text-slate-500" size={16} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Georgia bills, 16</span>
                  <span className="text-slate-800 font-medium">48 KM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">105 Saint<br />Laurence UK</span>
                  <span className="text-slate-800 font-medium">2h 18m</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">103 Chicago</span>
                  <span className="text-slate-800 font-medium">7h/km/h</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div className="w-4 h-4 bg-slate-300 rounded-full"></div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Fuel</span>
                  <span className="text-slate-800 font-medium">12 Liters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">People Used</span>
                  <span className="text-slate-800 font-medium">4 Person</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Condition</span>
                  <span className="text-slate-800 font-medium">Average</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="border-t border-slate-200 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              <div>
                <p className="text-slate-800 font-medium">Matthew Jones</p>
                <p className="text-slate-600 text-sm">matthew@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                <Phone className="text-slate-600" size={16} />
              </button>
              <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                <Search className="text-slate-600" size={16} />
              </button>
            </div>
          </div>

          {/* Another User */}
          <div className="border-t border-slate-200 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              <div>
                <p className="text-slate-800 font-medium">Andrew Smith</p>
                <p className="text-slate-600 text-sm">3 hrs Rescaling</p>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="p-1 bg-slate-100 hover:bg-slate-200 rounded transition-colors">
                  <Phone className="text-slate-600" size={14} />
                </button>
                <button className="p-1 bg-slate-100 hover:bg-slate-200 rounded transition-colors">
                  <Search className="text-slate-600" size={14} />
                </button>
              </div>
            </div>
            <div className="text-blue-600 font-bold mt-2">$ 44,7K</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyVehicles;