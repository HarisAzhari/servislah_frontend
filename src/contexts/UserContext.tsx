"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '@/types/user'
import { userService } from '@/lib/services/userService'

interface UserContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  refreshUser: () => Promise<void>
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await userService.getCurrentUser()
      if (response.status === 'success') {
        setUser(response.data.user)
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user data'
      setError(errorMessage)
      // If unauthorized, clear tokens
      if (err && typeof err === 'object' && 'status' in err && err.status === 401) {
        logout()
      }
    } finally {
      setIsLoading(false)
    }
  }

  const refreshUser = async () => {
    await fetchUser()
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_id')
    window.location.href = '/'
  }

  useEffect(() => {
    // Only fetch user if we have a token
    const token = localStorage.getItem('access_token')
    if (token) {
      fetchUser()
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, isLoading, error, refreshUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
} 