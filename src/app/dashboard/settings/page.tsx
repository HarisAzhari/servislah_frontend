"use client"

import { useState } from "react"
import { User, Bell, Shield, Globe, Moon, Sun, Monitor, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@/contexts/UserContext"
import { useDarkMode } from "@/contexts/DarkModeContext"

export default function SettingsPage() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false
  })
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    allowAnalytics: true
  })

  const { user } = useUser()

  const displayName = user?.profile?.first_name && user?.profile?.last_name 
    ? `${user.profile.first_name} ${user.profile.last_name}`
    : user?.email?.split('@')[0] || 'User'
  
  const userInitials = user?.profile?.first_name && user?.profile?.last_name
    ? `${user.profile.first_name[0]}${user.profile.last_name[0]}`
    : displayName.slice(0, 2).toUpperCase()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <TabsTrigger value="account" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center space-x-2">
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span>Account Information</span>
              </CardTitle>
              <CardDescription>
                Update your account details and profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20 ring-4 ring-blue-100">
                  <AvatarImage src={user?.profile?.profile_picture || "/placeholder-avatar.jpg"} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-lg">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold dark:text-white">{displayName}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                  <Button variant="outline" size="sm" className="hover:bg-blue-50">
                    Change Profile Picture
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                  <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-md dark:text-white">
                    {user?.profile?.first_name || 'Not set'}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                  <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-md dark:text-white">
                    {user?.profile?.last_name || 'Not set'}
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-md dark:text-white">
                    {user?.email}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Update Profile
                </Button>
                <Button variant="outline">
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>
                Control how you receive notifications and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {Object.entries({
                  email: { label: 'Email Notifications', desc: 'Receive appointment reminders and updates via email' },
                  push: { label: 'Push Notifications', desc: 'Get real-time notifications on your device' },
                  sms: { label: 'SMS Notifications', desc: 'Receive important updates via text message' },
                  marketing: { label: 'Marketing Communications', desc: 'Get promotional offers and service updates' }
                }).map(([key, { label, desc }]) => (
                  <div key={key} className="flex items-center justify-between p-4 rounded-lg border border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium dark:text-white">{label}</span>
                        {notifications[key as keyof typeof notifications] && (
                          <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">Active</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                    </div>
                    <Button
                      variant={notifications[key as keyof typeof notifications] ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                      className={notifications[key as keyof typeof notifications] 
                        ? "bg-green-600 hover:bg-green-700" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }
                    >
                      {notifications[key as keyof typeof notifications] ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Privacy & Security</span>
              </CardTitle>
              <CardDescription>
                Manage your privacy settings and data preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium dark:text-white">Profile Visibility</span>
                    <select 
                      value={privacy.profileVisibility}
                      onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
                      className="px-3 py-1 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 dark:text-white"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Control who can see your profile information</p>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium dark:text-white">Show Email Address</span>
                      {privacy.showEmail ? <Eye className="h-4 w-4 text-green-600" /> : <EyeOff className="h-4 w-4 text-gray-400" />}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Allow others to see your email address</p>
                  </div>
                  <Button
                    variant={privacy.showEmail ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPrivacy(prev => ({ ...prev, showEmail: !prev.showEmail }))}
                    className={privacy.showEmail ? "bg-green-600 hover:bg-green-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"}
                  >
                    {privacy.showEmail ? 'Visible' : 'Hidden'}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                  <div className="space-y-1">
                    <span className="font-medium dark:text-white">Analytics & Tracking</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Help us improve by sharing anonymous usage data</p>
                  </div>
                  <Button
                    variant={privacy.allowAnalytics ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPrivacy(prev => ({ ...prev, allowAnalytics: !prev.allowAnalytics }))}
                    className={privacy.allowAnalytics ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"}
                  >
                    {privacy.allowAnalytics ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
              </div>

              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium text-red-600 dark:text-red-400">Danger Zone</h4>
                <div className="p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="font-medium text-red-800 dark:text-red-300">Delete Account</span>
                      <p className="text-sm text-red-600 dark:text-red-400">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="h-5 w-5 text-blue-600" />
                <span>Appearance</span>
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium dark:text-white">Theme Preference</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'light', label: 'Light', icon: Sun },
                      { value: 'dark', label: 'Dark', icon: Moon }
                    ].map(({ value, label, icon: Icon }) => {
                      const isActive = (value === 'light' && !isDarkMode) || (value === 'dark' && isDarkMode)
                      return (
                        <button
                          key={value}
                          onClick={toggleDarkMode}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            isActive 
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50 dark:border-blue-400' 
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                          }`}
                        >
                          <Icon className={`h-6 w-6 mx-auto mb-2 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                          <span className={`text-sm font-medium ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                            {label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <label className="text-sm font-medium dark:text-white">Interface Density</label>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">Compact</Button>
                    <Button variant="default" size="sm">Comfortable</Button>
                    <Button variant="outline" size="sm">Spacious</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <label className="text-sm font-medium dark:text-white">Language</label>
                  <select className="w-full px-3 py-2 border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 dark:text-white">
                    <option value="en">English</option>
                    <option value="ms">Bahasa Malaysia</option>
                    <option value="zh">中文</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 