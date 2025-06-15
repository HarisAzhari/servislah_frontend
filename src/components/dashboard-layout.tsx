"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Calendar, 
  Car, 
  MapPin, 
  User, 
  Plus, 
  Menu, 
  X,
  LogOut,
  Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/contexts/UserContext"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Vehicles", href: "/dashboard/vehicles", icon: Car },
  { name: "Service Centers", href: "/dashboard/service-centers", icon: MapPin },
  { name: "Profile", href: "/dashboard/profile", icon: User },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const { user, isLoading: userLoading, logout } = useUser()

  // Smooth loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleLogout = () => {
    logout()
  }

  // Show loading if user data is still loading
  if (userLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Car className="h-12 w-12 text-blue-600 animate-bounce" />
            <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-blue-200 animate-ping"></div>
          </div>
          <p className="text-gray-600 animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Get user display name
  const displayName = user?.profile?.first_name && user?.profile?.last_name 
    ? `${user.profile.first_name} ${user.profile.last_name}`
    : user?.email?.split('@')[0] || 'User'
  
  const userInitials = user?.profile?.first_name && user?.profile?.last_name
    ? `${user.profile.first_name[0]}${user.profile.last_name[0]}`
    : displayName.slice(0, 2).toUpperCase()



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex">
      {/* Mobile menu button with better animation */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="backdrop-blur-sm bg-white/80 border-white/20 hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <div className="relative w-4 h-4">
            <Menu className={`h-4 w-4 absolute transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
            <X className={`h-4 w-4 absolute transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
          </div>
        </Button>
      </div>

      {/* Sidebar with enhanced animations */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white/95 backdrop-blur-xl shadow-xl transform transition-all duration-500 ease-out
        ${isMobileMenuOpen ? 'translate-x-0 scale-100' : '-translate-x-full scale-95'}
        lg:translate-x-0 lg:scale-100 lg:relative border-r border-gray-200/50
      `}>
        <div className="flex flex-col h-full">
          {/* Logo with pulse animation */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200/50">
            <div className="flex items-center space-x-2 group">
              <Car className="h-8 w-8 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">ServisLah</span>
            </div>
          </div>

          {/* Navigation with staggered animations */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105' 
                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-blue-600 hover:scale-[1.02]'
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <item.icon className={`h-5 w-5 mr-3 transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  {item.name}
                  {isActive && (
                    <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              )
            })}
            
            <Separator className="my-6 opacity-50" />
            
            {/* Enhanced Book Appointment Button */}
            <Link href="/dashboard/appointments/create">
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Book Appointment
              </Button>
            </Link>
          </nav>

          {/* Enhanced User section */}
          <div className="p-4 border-t border-gray-200/50">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 rounded-xl group">
                  <Avatar className="h-10 w-10 mr-3 ring-2 ring-transparent group-hover:ring-blue-200 transition-all duration-300">
                    <AvatarImage src={user?.profile?.profile_picture || "/placeholder-avatar.jpg"} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium group-hover:text-blue-600 transition-colors duration-300">{displayName}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-gray-200/50 bg-white/95 backdrop-blur-sm">
                <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-200">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main content with enhanced layout */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Enhanced Top bar */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-1 lg:hidden"></div>
              
              <div className="flex items-center space-x-4 ml-auto">
                {/* Enhanced notification bell */}
                <Button variant="ghost" size="icon" className="relative hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 hover:scale-105 group">
                  <Bell className="h-5 w-5 group-hover:animate-pulse" />
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-bounce">
                    3
                  </Badge>
                </Button>
                
                <div className="hidden lg:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 rounded-xl group">
                        <Avatar className="h-8 w-8 ring-2 ring-transparent group-hover:ring-blue-200 transition-all duration-300">
                          <AvatarImage src={user?.profile?.profile_picture || "/placeholder-avatar.jpg"} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">{userInitials}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium hidden md:block group-hover:text-blue-600 transition-colors duration-300">{displayName}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 border-gray-200/50 bg-white/95 backdrop-blur-sm">
                      <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-200">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Page content with smooth entry animation */}
        <main className="flex-1 overflow-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>

      {/* Enhanced Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
} 