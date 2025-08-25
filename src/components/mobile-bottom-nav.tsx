"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MapPin, Car, User as UserIcon, Plus, Calendar, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

type NavItem = {
  name: string
  href: string
  icon: React.ElementType
}

const items: NavItem[] = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Centers", href: "/dashboard/service-centers", icon: MapPin },
  { name: "Vehicles", href: "/dashboard/vehicles", icon: Car },
  { name: "Profile", href: "/dashboard/profile", icon: UserIcon },
]

type DropdownItem = {
  name: string
  href: string
  icon: React.ElementType
}

const dropdownItems: DropdownItem[] = [
  { name: "Book Appointment", href: "/dashboard/appointments/create", icon: Calendar },
  { name: "View Appointments", href: "/dashboard/appointments", icon: Calendar },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Close dropdown when clicking outside
  const handleDropdownClick = (href: string) => {
    setIsDropdownOpen(false)
    // Small delay to ensure dropdown closes before navigation
    setTimeout(() => {
      window.location.href = href
    }, 100)
  }

  // Close dropdown when clicking outside
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsDropdownOpen(false)
    }
  }

  return (
    <nav
      className={
        cn(
          "fixed inset-x-0 bottom-0 z-40 lg:hidden",
          "bg-transparent py-0 pointer-events-none",
          "[padding-bottom:env(safe-area-inset-bottom)]"
        )
      }
      aria-label="Bottom navigation"
    >
        <ul className="flex items-center justify-between max-w-5xl mx-auto w-[calc(100%-24px)] sm:w-[calc(100%-40px)] px-6 md:px-8 h-16 rounded-2xl md:rounded-2xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 translate-y-[-16px] shadow-lg pointer-events-auto">
          {/* Left side icons */}
          <div className="flex items-center space-x-4">
            {items.slice(0, 2).map((item) => {
              const isHome = item.href === "/dashboard"
              const isActive = isHome
                ? pathname === "/dashboard"
                : pathname === item.href || pathname.startsWith(item.href + "/")
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-center",
                    "text-gray-600 dark:text-gray-300",
                    isActive &&
                      "text-[#363DFF] dark:text-blue-400"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div
                    className={cn(
                      "relative flex h-10 w-10 items-center justify-center rounded-full",
                      isActive
                        ? "bg-[#363DFF]/10 dark:bg-blue-500/15 shadow"
                        : ""
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-6 w-6",
                        isActive ? "text-[#363DFF] dark:text-blue-400" : ""
                      )}
                    />
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Center "+" button with dropdown */}
          <div className="flex items-center justify-center relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center h-20 w-20 rounded-full bg-[#363DFF] dark:bg-blue-600 shadow-lg hover:bg-[#363DFF]/90 dark:hover:bg-blue-600/90 transition-colors -translate-y-1 border-6 border-white dark:border-gray-800"
            >
              <Plus className={cn("h-10 w-10 text-white transition-transform", isDropdownOpen && "rotate-45")} />
            </button>
            
            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10 p-2 min-w-[160px]">
                  {dropdownItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleDropdownClick(item.href)}
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors w-full text-left"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </button>
                    )
                  })}
                </div>
                {/* Arrow pointing down */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-900"></div>
                </div>
              </div>
            )}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {items.slice(2).map((item) => {
              const isHome = item.href === "/dashboard"
              const isActive = isHome
                ? pathname === "/dashboard"
                : pathname === item.href || pathname.startsWith(item.href + "/")
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-center",
                    "text-gray-600 dark:text-gray-300",
                    isActive &&
                      "text-[#363DFF] dark:text-blue-400"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div
                    className={cn(
                      "relative flex h-10 w-10 items-center justify-center rounded-full",
                      isActive
                        ? "bg-[#363DFF]/10 dark:bg-blue-500/15 shadow"
                        : ""
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-6 w-6",
                        isActive ? "text-[#363DFF] dark:text-blue-400" : ""
                      )}
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </ul>
    </nav>
  )
}

export default MobileBottomNav

