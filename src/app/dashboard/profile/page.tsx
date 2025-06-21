"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Edit3, Save, Camera, Crown, Shield, Calendar, Clock } from "lucide-react"
import { useUser } from "@/contexts/UserContext"
import { userService } from "@/lib/services/userService"
import { ApiError } from "@/lib/api"
import { toast } from "sonner"

const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const { user, refreshUser } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: user?.profile?.first_name || "",
      last_name: user?.profile?.last_name || "",
      phone: user?.phone || "",
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    if (!user?.id) return

    setIsLoading(true)
    try {
      await userService.updateUser(user.id, {
        phone: data.phone,
        profile: {
          first_name: data.first_name,
          last_name: data.last_name,
        },
      })
      
      await refreshUser()
      setIsEditing(false)
      toast.success("Profile updated successfully! 🎉")
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message)
      } else {
        toast.error("Failed to update profile 😔")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Handle cases where profile is null
  const displayName = user?.profile?.first_name && user?.profile?.last_name 
    ? `${user.profile.first_name} ${user.profile.last_name}`
    : user?.email?.split('@')[0] || 'Welcome User'
  
  const userInitials = user?.profile?.first_name && user?.profile?.last_name
    ? `${user.profile.first_name[0]}${user.profile.last_name[0]}`
    : (user?.email?.slice(0, 2) || 'U').toUpperCase()

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'ADMIN':
        return <Crown className="h-4 w-4" />
      case 'MECHANIC':
        return <Shield className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleBadge = () => {
    const role = user?.role || 'USER'
    const colorMap = {
      'ADMIN': 'bg-gradient-to-r from-[#363DFF] to-purple-600',
      'MECHANIC': 'bg-gradient-to-r from-[#363DFF] to-blue-600',
      'USER': 'bg-gradient-to-r from-[#363DFF] to-indigo-600'
    }
    
    return (
      <Badge className={`${colorMap[role as keyof typeof colorMap]} text-white shadow-md`}>
        {getRoleIcon()}
        <span className="ml-1">{role}</span>
      </Badge>
    )
  }

  const getStatusBadge = () => {
    const status = user?.status || 'INACTIVE'
    return (
      <Badge 
        variant={status === 'ACTIVE' ? "default" : "secondary"}
        className={status === 'ACTIVE' ? "bg-green-500 text-white" : "bg-gray-500 text-white"}
      >
        {status === 'ACTIVE' ? '🟢' : '🔴'} {status}
      </Badge>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your beautiful profile... ✨</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="space-y-8">
        {/* Enhanced Header */}
        <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#363DFF] via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-gray-700 mt-2 text-lg font-medium">Manage your account and personal information 💖</p>
        </div>

      {/* Enhanced Profile Card */}
      <Card className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200/60 bg-white">
        <CardHeader className="pb-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-[#363DFF]/20 shadow-lg">
                  <AvatarImage src={user.profile?.profile_picture || "/placeholder-avatar.jpg"} />
                  <AvatarFallback className="bg-gradient-to-br from-[#363DFF] to-purple-600 text-white text-2xl font-bold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                  <Camera className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold">{displayName}</CardTitle>
                <CardDescription className="text-lg">{user.email}</CardDescription>
                <div className="flex items-center gap-3">
                  {getRoleBadge()}
                  {getStatusBadge()}
                </div>
              </div>
            </div>
            <Button
              onClick={() => {
                if (isEditing) {
                  setIsEditing(false)
                  form.reset({
                    first_name: user.profile?.first_name || "",
                    last_name: user.profile?.last_name || "",
                    phone: user.phone || "",
                  })
                } else {
                  setIsEditing(true)
                }
              }}
              variant={isEditing ? "outline" : "default"}
              className="gap-2 h-12 px-6"
              disabled={isLoading}
            >
              {isEditing ? (
                <>Cancel</>
              ) : (
                <>
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">First Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEditing || isLoading}
                          className="h-12 transition-all duration-300"
                          placeholder="Enter your first name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEditing || isLoading}
                          className="h-12 transition-all duration-300"
                          placeholder="Enter your last name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-base font-semibold text-gray-700">Email Address</label>
                  <Input value={user.email} disabled className="mt-2 h-12 bg-gray-50" />
                  <p className="text-sm text-gray-500 mt-2">📧 Email cannot be changed</p>
                </div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEditing || isLoading}
                          className="h-12 transition-all duration-300"
                          placeholder="Enter your phone number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {isEditing && (
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-[#363DFF] to-indigo-600 hover:from-[#363DFF]/90 hover:to-indigo-700 gap-2 h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save className="h-5 w-5" />
                    )}
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Enhanced Account Details */}
      <Card className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards] shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200/60 bg-white">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-2xl text-gray-800">Account Information</CardTitle>
          <CardDescription className="text-gray-600 font-medium">Your account details and platform information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-[#363DFF]/10 to-indigo-100/50 rounded-xl border border-[#363DFF]/10">
              <div className="flex items-center justify-center w-12 h-12 bg-[#363DFF]/20 rounded-full mx-auto mb-3">
                <User className="h-6 w-6 text-[#363DFF]" />
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">Account Role</p>
              <p className="font-bold text-gray-900">{user.role}</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-100/50 rounded-xl border border-emerald-200/50">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mx-auto mb-3">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">Platform</p>
              <p className="font-bold text-gray-900">{user.platform}</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-100/50 rounded-xl border border-purple-200/50">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">Member Since</p>
              <p className="font-bold text-gray-900">{new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <Separator />

          {/* Subscription Section - Handle null subscription */}
          <div>
            <p className="text-lg font-semibold text-gray-700 mb-4">Subscription Status</p>
            {!user.subscription ? (
              <div className="text-center p-8 bg-gradient-to-br from-[#363DFF]/10 to-purple-100/50 rounded-xl border-2 border-dashed border-[#363DFF]/30">
                <Crown className="h-12 w-12 text-[#363DFF] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Subscription</h3>
                <p className="text-gray-700 mb-4 font-medium">Upgrade to unlock premium features and exclusive benefits!</p>
                <Button className="bg-gradient-to-r from-[#363DFF] to-purple-600 hover:from-[#363DFF]/90 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade Now
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-bold text-lg">{user.subscription.subscription_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-bold text-lg">
                    {user.subscription.is_active ? "✅ Active" : "❌ Inactive"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-bold text-lg">
                    {new Date(user.subscription.end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-[#363DFF]/5 to-indigo-50/50 rounded-xl border border-[#363DFF]/10">
              <div className="flex items-center justify-center w-12 h-12 bg-[#363DFF]/20 rounded-full">
                <Calendar className="h-5 w-5 text-[#363DFF]" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Account Created</p>
                <p className="font-bold text-gray-900">{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-5 bg-gradient-to-r from-emerald-50/50 to-green-50/50 rounded-xl border border-emerald-200/50">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full">
                <Clock className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Last Updated</p>
                <p className="font-bold text-gray-900">{new Date(user.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
} 