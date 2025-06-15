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
import { User, Edit3, Save, Camera } from "lucide-react"
import { useUser } from "@/contexts/UserContext"
import { userService } from "@/lib/services/userService"
import { ApiError } from "@/lib/api"
import { toast } from "sonner"

const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
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
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    if (!user?.id) return

    setIsLoading(true)
    try {
      await userService.updateUser(user.id, {
        profile: {
          first_name: data.first_name,
          last_name: data.last_name,
        },
      })
      
      await refreshUser()
      setIsEditing(false)
      toast.success("Profile updated successfully!")
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message)
      } else {
        toast.error("Failed to update profile")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const displayName = user?.profile?.first_name && user?.profile?.last_name 
    ? `${user.profile.first_name} ${user.profile.last_name}`
    : user?.email?.split('@')[0] || 'User'
  
  const userInitials = user?.profile?.first_name && user?.profile?.last_name
    ? `${user.profile.first_name[0]}${user.profile.last_name[0]}`
    : displayName.slice(0, 2).toUpperCase()

  const getSubscriptionBadge = () => {
    if (!user?.subscription) return null
    
    const isActive = user.subscription.is_active
    const type = user.subscription.subscription_type
    
    return (
      <Badge 
        variant={isActive ? "default" : "secondary"}
        className={`${
          isActive 
            ? type === 'PREMIUM' 
              ? 'bg-gradient-to-r from-purple-500 to-purple-600'
              : type === 'FREE'
              ? 'bg-gradient-to-r from-green-500 to-green-600'
              : 'bg-gradient-to-r from-blue-500 to-blue-600'
            : 'bg-gray-400'
        }`}
      >
        {type} {isActive ? '(Active)' : '(Inactive)'}
      </Badge>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-2">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20 ring-4 ring-blue-100">
                  <AvatarImage src={user.profile?.profile_picture || "/placeholder-avatar.jpg"} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <CardTitle className="text-2xl">{displayName}</CardTitle>
                <CardDescription className="text-base">{user.email}</CardDescription>
                <div className="mt-2">
                  {getSubscriptionBadge()}
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
                  })
                } else {
                  setIsEditing(true)
                }
              }}
              variant={isEditing ? "outline" : "default"}
              className="gap-2"
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
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEditing || isLoading}
                          className="transition-all duration-300"
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
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEditing || isLoading}
                          className="transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input value={user.email} disabled className="mt-1" />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <Input value={user.phone || "-"} disabled className="mt-1" />
                  <p className="text-xs text-gray-500 mt-1">Phone number management coming soon</p>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 gap-2"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Account Details */}
      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>Your account information and subscription details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-700">Account Status</p>
              <Badge 
                variant={user.status === 'ACTIVE' ? "default" : "secondary"}
                className={user.status === 'ACTIVE' ? "bg-green-500" : "bg-gray-500"}
              >
                {user.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Account Type</p>
              <p className="text-gray-900">{user.role}</p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Subscription Information</p>
            {user.subscription ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="font-medium">{user.subscription.subscription_type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="font-medium">
                    {user.subscription.is_active ? "Active" : "Inactive"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">End Date</p>
                  <p className="font-medium">
                    {new Date(user.subscription.end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No subscription information available</p>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Member Since</p>
              <p className="font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Last Updated</p>
              <p className="font-medium">{new Date(user.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 