"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, MapPin, Car, User as UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  name: string
  href: string
  icon: React.ElementType
}

const items: NavItem[] = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Centers", href: "/dashboard/service-centers", icon: MapPin },
  { name: "Vehicles", href: "/dashboard/vehicles", icon: Car },
  { name: "Profile", href: "/dashboard/profile", icon: UserIcon },
]

export function MobileBottomNav() {
  const pathname = usePathname()

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
        <ul className="flex items-center justify-between max-w-5xl mx-auto w-[calc(100%-24px)] sm:w-[calc(100%-40px)] px-6 md:px-8 h-20 rounded-2xl md:rounded-2xl bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 translate-y-[-16px] shadow-lg pointer-events-auto">
          {items.map((item) => {
            const isHome = item.href === "/dashboard"
            const isActive = isHome
              ? pathname === "/dashboard"
              : pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = item.icon
            return (
              <li key={item.name} className="flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-center py-3",
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
              </li>
            )
          })}
        </ul>
    </nav>
  )
}

export default MobileBottomNav

