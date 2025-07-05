"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"

interface NavigationLoadingContextType {
  loadingNavItem: string | null
  setLoadingNavItem: (navItem: string | null) => void
}

const NavigationLoadingContext = createContext<NavigationLoadingContextType | undefined>(undefined)

export const useNavigationLoading = () => {
  const context = useContext(NavigationLoadingContext)
  if (!context) {
    throw new Error("useNavigationLoading must be used within a NavigationLoadingProvider")
  }
  return context
}

export const NavigationLoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loadingNavItem, setLoadingNavItem] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Clear loading state when navigation completes (when pathname actually changes)
    if (loadingNavItem) {
      setLoadingNavItem(null)
    }
  }, [pathname])

  return (
    <NavigationLoadingContext.Provider value={{ loadingNavItem, setLoadingNavItem }}>
      {children}
    </NavigationLoadingContext.Provider>
  )
} 