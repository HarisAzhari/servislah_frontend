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
  Bell,
  Settings,
  Moon,
  Sun
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
import { useAuthTanstack } from "@/lib/tanstack/auth-tanstack"
import { NavigationLoadingProvider, useNavigationLoading } from "@/contexts/NavigationLoadingContext"
import { MiniCarLoading } from "@/components/mini-car-loading"
import { useDarkMode } from "@/contexts/DarkModeContext"
import MobileBottomNav from "@/components/mobile-bottom-nav"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { 
    name: "Appointments", 
    href: "/dashboard/appointments", 
    icon: Calendar,
    badge: "2",
    description: "Manage bookings"
  },
  { 
    name: "Vehicles", 
    href: "/dashboard/vehicles", 
    icon: Car,
    badge: null,
    description: "Your fleet"
  },
  { 
    name: "Service Centers", 
    href: "/dashboard/service-centers", 
    icon: MapPin,
    badge: null,
    description: "Find services"
  },
  { 
    name: "Profile", 
    href: "/dashboard/profile", 
    icon: User,
    badge: null,
    description: "Account details"
  },
  { 
    name: "Settings", 
    href: "/dashboard/settings", 
    icon: Settings,
    badge: null,
    description: "Preferences"
  },
]

interface NavigationLinkProps {
  item: {
    name: string
    href: string
    icon: React.ElementType
    badge?: string | null
    description?: string
  }
  isActive: boolean
  index: number
  onMobileMenuClose: () => void
  isCollapsed?: boolean
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ item, isActive, index, onMobileMenuClose, isCollapsed = false }) => {
  const { loadingNavItem, setLoadingNavItem } = useNavigationLoading()
  const isThisItemLoading = loadingNavItem === item.href
  
  const handleClick = () => {
    // Only show loading if we're navigating to a different page
    if (!isActive) {
      setLoadingNavItem(item.href)
    }
    onMobileMenuClose()
  }
  
  if (isCollapsed) {
    return (
      <div className="relative group">
        <Link
          href={item.href}
          className={`
            flex items-center justify-center w-12 h-12 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden mx-auto
            ${isActive
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110'
            }
          `}
          onClick={handleClick}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <item.icon className={`h-5 w-5 transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
          {isThisItemLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <MiniCarLoading className="opacity-80" />
            </div>
          )}
        </Link>
        
        {/* Tooltip */}
        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 dark:bg-gray-700 text-white text-sm px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
          {item.name}
          <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
        </div>
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className={`
        flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden
        ${isActive
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-[1.02]'
        }
      `}
      onClick={handleClick}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center">
        <item.icon className={`h-5 w-5 mr-3 transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
        {isThisItemLoading ? 'Loading' : item.name}
      </div>
      
      <div className="flex items-center">
        {isActive && !isThisItemLoading && (
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        )}
        {isThisItemLoading && (
          <MiniCarLoading className="opacity-80" />
        )}
      </div>
    </Link>
  )
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  // const { user, isLoading: userLoading, logout } = useUser()

  // Smooth loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const {
    logoutMutation,
    user,
    isLoading: userLoading,
  } = useAuthTanstack()

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  // Show loading if user data is still loading
  if (userLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
        {/* Background animated elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-indigo-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-20 w-1 h-1 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="flex flex-col items-center space-y-8 relative z-10">
          {/* Epic car animation container */}
          <div className="relative w-32 h-20 mb-4">
            {/* Animated road */}
            <div className="absolute bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-full overflow-hidden shadow-lg">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-80 animate-[roadShine_2s_linear_infinite]"></div>
              {/* Road markings */}
              <div className="absolute top-1/2 left-1/4 w-4 h-0.5 bg-white opacity-60 animate-[roadMarkings_1.5s_linear_infinite]"></div>
              <div className="absolute top-1/2 right-1/4 w-4 h-0.5 bg-white opacity-60 animate-[roadMarkings_1.5s_linear_infinite]" style={{ animationDelay: '0.75s' }}></div>
            </div>

            {/* Speed lines behind car */}
            <div className="absolute top-4 left-4 opacity-60">
              <div className="flex space-x-2">
                <div className="w-6 h-1 bg-blue-400/70 rounded animate-[speedLine_1s_linear_infinite]" style={{ animationDelay: '0s' }}></div>
                <div className="w-4 h-1 bg-blue-300/60 rounded animate-[speedLine_1s_linear_infinite]" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-1 bg-blue-200/50 rounded animate-[speedLine_1s_linear_infinite]" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>

            {/* Epic racing car SVG with enhanced animations */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-[carBounce_0.8s_ease-in-out_infinite_alternate]">
              <svg width="64" height="40" viewBox="0 0 64 40" fill="none" className="animate-[carShine_3s_ease-in-out_infinite] drop-shadow-lg">
                <defs>
                  <linearGradient id="dashboardCarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
                    <stop offset="30%" style={{ stopColor: '#1D4ED8', stopOpacity: 1 }} />
                    <stop offset="70%" style={{ stopColor: '#1E40AF', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#1E3A8A', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="windowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#87CEEB', stopOpacity: 0.9 }} />
                    <stop offset="100%" style={{ stopColor: '#4FC3F7', stopOpacity: 0.7 }} />
                  </linearGradient>
                  <filter id="dashboardGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Car shadow */}
                <ellipse cx="32" cy="38" rx="20" ry="2" fill="#000000" opacity="0.2" className="animate-[shadowPulse_0.8s_ease-in-out_infinite_alternate]" />

                {/* Car body */}
                <path d="M16 16 L48 16 L56 24 L56 32 L52 32 L52 28 L12 28 L12 32 L8 32 L8 24 L16 16 Z" fill="url(#dashboardCarGradient)" filter="url(#dashboardGlow)" />

                {/* Car top */}
                <path d="M20 8 L44 8 L48 16 L16 16 L20 8 Z" fill="url(#dashboardCarGradient)" opacity="0.95" />

                {/* Windows with reflection */}
                <path d="M22 10 L42 10 L45 15 L19 15 L22 10 Z" fill="url(#windowGradient)" />
                <path d="M22 10 L32 10 L32 15 L19 15 L22 10 Z" fill="#FFFFFF" opacity="0.3" />

                {/* Front wheel */}
                <circle cx="44" cy="30" r="5" fill="#2D3748" className="animate-[wheelSpin_0.4s_linear_infinite]" />
                <circle cx="44" cy="30" r="3" fill="#4A5568" />
                <circle cx="44" cy="30" r="1" fill="#E2E8F0" />

                {/* Back wheel */}
                <circle cx="20" cy="30" r="5" fill="#2D3748" className="animate-[wheelSpin_0.4s_linear_infinite]" />
                <circle cx="20" cy="30" r="3" fill="#4A5568" />
                <circle cx="20" cy="30" r="1" fill="#E2E8F0" />

                {/* Headlight with glow */}
                <circle cx="56" cy="20" r="3" fill="#FBBF24" className="animate-[headlightPulse_1.5s_ease-in-out_infinite]" />
                <circle cx="56" cy="20" r="1.5" fill="#FEF3C7" className="animate-[headlightPulse_1.5s_ease-in-out_infinite]" />

                {/* Car details */}
                <rect x="18" y="18" width="28" height="2" fill="#1E40AF" opacity="0.8" rx="1" />
                <rect x="22" y="21" width="20" height="1" fill="#3B82F6" opacity="0.6" rx="0.5" />
              </svg>
            </div>

            {/* Enhanced exhaust smoke animation */}
            <div className="absolute top-6 -right-4">
              <div className="w-2 h-2 bg-gray-400 rounded-full opacity-70 animate-[smoke1_1.5s_ease-out_infinite]"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full opacity-50 animate-[smoke2_1.7s_ease-out_infinite]"></div>
              <div className="w-1 h-1 bg-gray-200 rounded-full opacity-30 animate-[smoke3_1.9s_ease-out_infinite]"></div>
            </div>
          </div>

          {/* Enhanced loading text */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent animate-[textShine_2.5s_ease-in-out_infinite]">
              Loading your dashboard
            </h2>
            <div className="flex items-center justify-center space-x-1">
              <span className="text-gray-600 text-lg animate-[textPulse_1.5s_ease-in-out_infinite]">
                Getting things ready
              </span>
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-[dotBounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}></div>
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-[dotBounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-[dotBounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-full animate-[progressBar_2.5s_ease-in-out_infinite] shadow-lg"></div>
          </div>
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
    <NavigationLoadingProvider>
      <DashboardLayoutContent 
        children={children} 
        user={user} 
        displayName={displayName} 
        userInitials={userInitials}
        handleLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        pathname={pathname}
      />
    </NavigationLoadingProvider>
  )
}

interface DashboardLayoutContentProps {
  children: React.ReactNode
  user: any
  displayName: string
  userInitials: string
  handleLogout: () => void
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
  isSidebarCollapsed: boolean
  setIsSidebarCollapsed: (collapsed: boolean) => void
  pathname: string
}

const DashboardLayoutContent: React.FC<DashboardLayoutContentProps> = ({
  children,
  user,
  displayName,
  userInitials,
  handleLogout,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  pathname
}) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800/30">
      {/* Sidebar is removed on mobile; hide old mobile toggle button */}
      <div className="hidden">
        <Button variant="outline" size="icon" />
      </div>

      {/* Sidebar with enhanced animations - FIXED POSITIONING (hidden on mobile) */}
      <div className={`
        fixed inset-y-0 left-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl transform transition-all duration-500 ease-out border-r border-gray-200/50 dark:border-gray-700/50
        ${isMobileMenuOpen ? 'translate-x-0 scale-100' : '-translate-x-full scale-95'}
        lg:translate-x-0 lg:scale-100
        ${isSidebarCollapsed ? 'lg:w-16' : 'lg:w-64'}
        w-64 hidden lg:block
      `}>
        <div className="flex flex-col h-full">
          {/* Clean Professional Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200/50 dark:border-gray-700/50 relative">
            <div className={`flex items-center space-x-3 group transition-all duration-300 ${isSidebarCollapsed ? 'lg:justify-center' : ''}`}>
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300">
                <img
                  src="/Main Logo.png"
                  alt="ServisLah"
                  className="h-5 w-5 object-contain"
                />
              </div>
              <span className={`text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 ${isSidebarCollapsed ? 'lg:hidden' : ''}`}>ServisLah</span>
            </div>
            
            {/* Toggle Button */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden lg:flex absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
            >
              <div className={`transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`}>
                <svg className="w-3 h-3 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </button>
          </div>

          {/* Quick Stats */}
          <div className={`px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 ${isSidebarCollapsed ? 'lg:hidden' : ''}`}>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">2</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Upcoming</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-green-600 dark:text-green-400">3</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Vehicles</div>
              </div>
            </div>
          </div>

          {/* Clean Navigation */}
          <nav className={`flex-1 py-6 space-y-2 transition-all duration-300 ${isSidebarCollapsed ? 'px-2' : 'px-4'}`}>
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <NavigationLink
                  key={item.name}
                  item={item}
                  isActive={isActive}
                  index={index}
                  onMobileMenuClose={() => setIsMobileMenuOpen(false)}
                  isCollapsed={isSidebarCollapsed}
                />
              )
            })}
          </nav>

          {/* Clean User section */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`w-full h-auto p-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-blue-900/50 transition-all duration-300 rounded-xl group ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
                  <Avatar className={`ring-2 ring-transparent group-hover:ring-blue-200 dark:group-hover:ring-blue-700 transition-all duration-300 ${isSidebarCollapsed ? 'h-8 w-8' : 'h-10 w-10 mr-3'}`}>
                    <AvatarImage src={user?.profile?.profile_picture || "/placeholder-avatar.jpg"} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className={`text-left transition-all duration-300 ${isSidebarCollapsed ? 'hidden' : ''}`}>
                    <p className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{displayName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-blue-900/50 transition-all duration-200">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-blue-900/50 transition-all duration-200">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 dark:hover:from-red-900/50 dark:hover:to-red-800/50 transition-all duration-200">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main content with enhanced layout - PROPER MARGIN FOR FIXED SIDEBAR */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-500 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Enhanced Top bar */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-1 flex lg:hidden">
                {/* Settings shortcut on the left for mobile */}
                <Link
                  href="/dashboard/settings"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full text-gray-600 hover:text-[#363DFF] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Settings"
                >
                  <Settings className="h-5 w-5" />
                </Link>
              </div>

              <div className="flex items-center space-x-4 ml-auto">
                {/* Enhanced notification bell */}
                <Button variant="ghost" size="icon" className="relative hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-blue-900/50 transition-all duration-300 hover:scale-105 group">
                  <Bell className="h-5 w-5 group-hover:animate-pulse" />
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-bounce">
                    3
                  </Badge>
                </Button>

                <div className="hidden lg:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-blue-900/50 transition-all duration-300 rounded-xl group">
                        <Avatar className="h-8 w-8 ring-2 ring-transparent group-hover:ring-blue-200 transition-all duration-300">
                          <AvatarImage src={user?.profile?.profile_picture || "/placeholder-avatar.jpg"} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">{userInitials}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium hidden md:block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{displayName}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings" className="w-full">
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-blue-900/50 transition-all duration-200">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 dark:hover:from-red-900/50 dark:hover:to-red-800/50 transition-all duration-200">
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
          <div className="px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>

      {/* Enhanced Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm z-30 lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Bottom navigation for mobile (outside scroll area) */}
      <MobileBottomNav />
    </div>
  )
} 