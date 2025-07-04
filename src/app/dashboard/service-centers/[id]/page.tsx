import React from 'react';
import { MapPin, Phone, Mail, Clock, Star, Calendar, Wrench, Car, Users } from 'lucide-react';

const ServiceCenterDetailPage = () => {
    // Dummy data based on your entity structure
    const serviceCenter = {
        id: "4ce54aa3-6dec-4960-bda5-dc6c8813c931",
        name: "ServisLah Express Puncak Alam",
        phone: "0378901234",
        email: "pa@servislah.com",
        image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=800&h=400&fit=crop",
        locations: {
            address: "Jalan SS2/24, SS2",
            city: "Petaling Jaya",
            state: "Selangor",
            country: "Malaysia",
            zip_code: "47300"
        },
        mechanics: [
            {
                id: "1",
                experience_level: "EXPERT",
                years_of_exp: 10,
                is_active: true
            },
            {
                id: "2",
                experience_level: "INTERMEDIATE",
                years_of_exp: 5,
                is_active: true
            }
        ],
        specializations: [
            {
                id: "1",
                name: "Engine",
                description: "Repairing Engine"
            },
            {
                id: "2",
                name: "Tyre",
                description: "Balancing Tyre"
            },
            {
                id: "3",
                name: "Exhaust",
                description: "Repairing Exhaust"
            },
            {
                id: "4",
                name: "Cermin",
                description: "Repairing Cermin"
            }
        ],
        services: [
            {
                id: "1",
                name: "Oil Replacement",
                description: "Complete oil change service",
                price: 645.4,
                duration: 44,
                is_active: true
            },
            {
                id: "2",
                name: "Tyre Balancing",
                description: "Professional tyre balancing",
                price: 645.4,
                duration: 44,
                is_active: true
            }
        ],
        operating_hours: [
            { day: 1, open_time: "08:00", close_time: "18:00", is_active: true },
            { day: 2, open_time: "08:00", close_time: "18:00", is_active: true },
            { day: 3, open_time: "08:00", close_time: "18:00", is_active: true },
            { day: 4, open_time: "08:00", close_time: "18:00", is_active: true },
            { day: 5, open_time: "08:00", close_time: "18:00", is_active: true },
            { day: 6, open_time: "08:00", close_time: "16:00", is_active: true },
            { day: 0, open_time: "Closed", close_time: "Closed", is_active: false }
        ],
        appointments: [
            { status: "COMPLETED" },
            { status: "COMPLETED" },
            { status: "IN_PROGRESS" },
            { status: "PENDING" }
        ]
    };

    const getDayName = (day: number) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[day];
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return 'bg-green-100 text-green-800';
            case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const completedAppointments = serviceCenter.appointments.filter(app => app.status === 'COMPLETED').length;
    const totalAppointments = serviceCenter.appointments.length;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{serviceCenter.name}</h1>
                            <p className="text-gray-600 mt-1">Manage and discover certified automotive service providers</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                                <Calendar className="w-4 h-4 inline mr-2" />
                                View Schedule
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Calendar className="w-4 h-4 inline mr-2" />
                                Book Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
                    <div className="aspect-[3/1] bg-gradient-to-r from-blue-600 to-blue-800 relative">
                        <img
                            src={serviceCenter.image}
                            alt={serviceCenter.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <h2 className="text-3xl font-bold mb-2">{serviceCenter.name}</h2>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm">4.8 (127 reviews)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{serviceCenter.locations.city}, {serviceCenter.locations.state}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Services</p>
                                <p className="text-2xl font-bold text-gray-900">{serviceCenter.services.length}</p>
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
                                <p className="text-2xl font-bold text-gray-900">{serviceCenter.mechanics.filter(m => m.is_active).length}</p>
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
                                <p className="text-2xl font-bold text-gray-900">{serviceCenter.specializations.length}</p>
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
                                <p className="text-2xl font-bold text-gray-900">{Math.round((completedAppointments / totalAppointments) * 100)}%</p>
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
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
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
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 rounded-full">
                                        <MapPin className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Address</p>
                                        <p className="text-gray-900">{serviceCenter.locations.address}</p>
                                        <p className="text-sm text-gray-600">{serviceCenter.locations.city}, {serviceCenter.locations.state} {serviceCenter.locations.zip_code}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h3>
                            <div className="space-y-4">
                                {serviceCenter.services.map((service) => (
                                    <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <h4 className="font-medium text-gray-900">{service.name}</h4>
                                            <p className="text-sm text-gray-600">{service.description}</p>
                                            <p className="text-sm text-gray-500 mt-1">Duration: {service.duration} minutes</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold text-gray-900">RM {service.price}</p>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${service.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {service.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Specializations */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {serviceCenter.specializations.map((spec) => (
                                    <div key={spec.id} className="p-4 bg-gray-50 rounded-xl">
                                        <h4 className="font-medium text-gray-900">{spec.name}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{spec.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Operating Hours */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Operating Hours</h3>
                            <div className="space-y-3">
                                {serviceCenter.operating_hours.map((hour) => (
                                    <div key={hour.day} className="flex items-center justify-between py-2">
                                        <span className="text-gray-700">{getDayName(hour.day)}</span>
                                        <span className={`${hour.is_active ? 'text-gray-900' : 'text-gray-500'}`}>
                                            {hour.is_active ? `${hour.open_time} - ${hour.close_time}` : 'Closed'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mechanics */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Mechanics</h3>
                            <div className="space-y-4">
                                {serviceCenter.mechanics.map((mechanic, index) => (
                                    <div key={mechanic.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Users className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">Mechanic {index + 1}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${mechanic.experience_level === 'EXPERT' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                                    {mechanic.experience_level}
                                                </span>
                                                <span className="text-sm text-gray-600">{mechanic.years_of_exp} years exp</span>
                                            </div>
                                        </div>
                                        <div className={`w-3 h-3 rounded-full ${mechanic.is_active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Appointments */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Appointments</h3>
                            <div className="space-y-3">
                                {serviceCenter.appointments.map((appointment, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <Calendar className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Appointment #{index + 1}</p>
                                                <p className="text-xs text-gray-600">June 30, 2025</p>
                                            </div>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                            {appointment.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCenterDetailPage;