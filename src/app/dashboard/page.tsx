"use client"

import { Calendar, Car, MapPin, Clock, Plus, ArrowRight, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Header with smooth animation */}
      <div className="animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text">
          Welcome back, John! 👋
        </h1>
        <p className="text-gray-600 mt-2 text-lg">Here&apos;s what&apos;s happening with your vehicles today</p>
      </div>

      {/* Quick Stats with staggered animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Active Vehicles", value: "3", icon: Car, color: "blue", description: "Ready to serve" },
          { title: "Upcoming", value: "2", icon: Calendar, color: "green", description: "This week" },
          { title: "Service Due", value: "1", icon: Clock, color: "orange", description: "Needs attention" },
          { title: "Nearby Centers", value: "12", icon: MapPin, color: "purple", description: "Within 10km" }
        ].map((stat, index) => (
          <Card 
            key={stat.title} 
            className="hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700 group border-l-4 border-l-transparent hover:border-l-blue-500"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <stat.icon className={`h-10 w-10 text-${stat.color}-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions with enhanced animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        {[
          {
            title: "Book Appointment",
            description: "Schedule a new service for your vehicle",
            icon: Plus,
            href: "/dashboard/appointments/create",
            color: "blue",
            info: "Quick booking"
          },
          {
            title: "Manage Vehicles",
            description: "View and manage your vehicle information",
            icon: Car,
            href: "/dashboard/vehicles",
            color: "green",
            info: "3 vehicles"
          },
          {
            title: "Find Centers",
            description: "Discover service centers near you",
            icon: MapPin,
            href: "/dashboard/service-centers",
            color: "purple",
            info: "12 nearby"
          }
        ].map((action, index) => (
          <Card 
            key={action.title}
            className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group border-0 bg-gradient-to-br from-white to-gray-50/50"
            style={{ animationDelay: `${(index + 3) * 150}ms` }}
          >
            <Link href={action.href}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center group-hover:text-blue-600 transition-colors duration-300">
                  <action.icon className={`h-6 w-6 mr-3 text-${action.color}-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} />
                  {action.title}
                </CardTitle>
                <CardDescription className="group-hover:text-gray-700 transition-colors duration-300">
                  {action.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-300">{action.info}</span>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="animate-in fade-in slide-in-from-left-4 duration-700 delay-500 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest appointments and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Oil Change Completed",
                  description: "Toyota Camry - AutoCare Plus",
                  time: "2 days ago",
                  status: "Completed",
                  color: "green"
                },
                {
                  title: "Brake Service Booked",
                  description: "Honda Civic - SpeedFix Workshop",
                  time: "3 days ago",
                  status: "Confirmed",
                  color: "blue"
                },
                {
                  title: "Loyalty Points Earned",
                  description: "+50 points from service completion",
                  time: "2 days ago",
                  status: "+50 pts",
                  color: "purple"
                }
              ].map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between border-b pb-4 last:border-b-0 hover:bg-gray-50/50 -mx-2 px-2 py-2 rounded-lg transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`h-3 w-3 bg-${activity.color}-500 rounded-full animate-pulse`}></div>
                    <div>
                      <p className="font-medium group-hover:text-blue-600 transition-colors duration-300">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`bg-${activity.color}-100 text-${activity.color}-800 border-${activity.color}-200 hover:scale-105 transition-transform duration-300`}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Services */}
        <Card className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Upcoming Services
            </CardTitle>
            <CardDescription>Your scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  service: "Brake Inspection & Repair",
                  vehicle: "Honda Civic 2019",
                  date: "Jan 18, 2024",
                  time: "2:30 PM",
                  center: "SpeedFix Workshop"
                },
                {
                  service: "Tire Replacement",
                  vehicle: "Honda Civic 2019",
                  date: "Jan 20, 2024",
                  time: "11:30 AM",
                  center: "TireMax Center"
                }
              ].map((appointment, index) => (
                <div 
                  key={index}
                  className="p-4 border rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{appointment.service}</h4>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Car className="h-3 w-3 mr-1" />
                        {appointment.vehicle}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{appointment.center}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">{appointment.date}</p>
                      <p className="text-xs text-gray-500">{appointment.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link href="/dashboard/appointments">
                <Button variant="outline" className="w-full mt-4 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 group">
                  View All Appointments
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Quality Section */}
      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8">
          <div className="text-center">
            <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Service Quality Guarantee</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We partner with the most trusted service centers to ensure your vehicle gets the best care possible. 
              Every service comes with our quality guarantee and customer satisfaction promise.
            </p>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">4.9</p>
                <p className="text-sm text-gray-500">Average Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">98%</p>
                <p className="text-sm text-gray-500">Satisfaction Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">1k+</p>
                <p className="text-sm text-gray-500">Happy Customers</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 