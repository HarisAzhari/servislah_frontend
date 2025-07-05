"use client"

import { Calendar, Car, MapPin, Clock, Plus, ArrowRight, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useUser } from "@/contexts/UserContext"

export default function DashboardPage() {
  const { user } = useUser()

  // Get user first name for welcome message
  const userName = user?.profile?.first_name || user?.email?.split('@')[0] || 'there'

  return (
    <div className="space-y-8">
      {/* Welcome Header with smooth animation */}
      <div className="animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-gray-900 dark:from-white to-blue-600 dark:to-blue-400 bg-clip-text">
          Welcome back, {userName}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">Here&apos;s what&apos;s happening with your vehicles today</p>
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
            className="hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700 group border-l-4 border-l-transparent hover:border-l-blue-500 dark:bg-gray-800 dark:border-gray-700"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
                </div>
                <stat.icon className={`h-8 w-8 text-${stat.color}-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} />
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
            className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group border-0 bg-gradient-to-br from-white dark:from-gray-800 to-gray-50/50 dark:to-gray-700/50 dark:border-gray-700"
            style={{ animationDelay: `${(index + 3) * 150}ms` }}
          >
            <Link href={action.href}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 dark:text-white text-lg">
                  <action.icon className={`h-5 w-5 mr-2 text-${action.color}-600 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} />
                  {action.title}
                </CardTitle>
                <CardDescription className="group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 dark:text-gray-400 text-sm">
                  {action.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{action.info}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="animate-in fade-in slide-in-from-left-4 duration-700 delay-500 hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center dark:text-white">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Recent Activity
            </CardTitle>
            <CardDescription className="dark:text-gray-300">Your latest appointments and updates</CardDescription>
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
                  className="flex items-center justify-between border-b dark:border-gray-700 pb-4 last:border-b-0 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 -mx-2 px-2 py-2 rounded-lg transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`h-3 w-3 bg-${activity.color}-500 rounded-full animate-pulse`}></div>
                    <div>
                      <p className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 dark:text-white">{activity.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">{activity.description}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</p>
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
        <Card className="animate-in fade-in slide-in-from-right-4 duration-700 delay-600 hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center dark:text-white">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Upcoming Services
            </CardTitle>
            <CardDescription className="dark:text-gray-300">Your scheduled appointments</CardDescription>
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
                  className="p-3 border dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{appointment.service}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 flex items-center mt-1">
                        <Car className="h-3 w-3 mr-1" />
                        {appointment.vehicle}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{appointment.center}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400">{appointment.date}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{appointment.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link href="/dashboard/appointments">
                <Button variant="outline" className="w-full mt-3 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 group h-8 text-sm">
                  View All Appointments
                  <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Quality Section */}
      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all duration-300 dark:bg-gray-800">
        <CardContent className="p-8">
          <div className="text-center">
            <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Service Quality Guarantee</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              We partner with the most trusted service centers to ensure your vehicle gets the best care possible. 
              Every service comes with our quality guarantee and customer satisfaction promise.
            </p>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">4.9</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Average Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">98%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Satisfaction Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">1k+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Happy Customers</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 