"use client"

import { useState } from "react"
import { MapPin, Phone, Car, Search, Filter, Navigation, Mail, Clock, Star, ChevronRight, Loader2, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useGetServiceCenters } from "@/lib/tanstack/service-center.tanstack"
import { ServiceCenter } from "@/types/service-center"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

// Helper function to calculate average rating
const calculateAverageRating = (reviews: ServiceCenter['reviews']) => {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Number((total / reviews.length).toFixed(1));
};

export default function ServiceCentersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "email" | "created" | "rating">("name")

  const {
    data: serviceCenters,
    isLoading,
    error,
    refetch
  } = useGetServiceCenters();

  const router = useRouter();

  // Filter and sort service centers
  const filteredAndSortedCenters = serviceCenters
    ?.filter((center: ServiceCenter) =>
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.sort((a: ServiceCenter, b: ServiceCenter) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "email":
          return a.email.localeCompare(b.email)
        case "created":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case "rating":
          return calculateAverageRating(b.reviews) - calculateAverageRating(a.reviews)
        default:
          return 0
      }
    })

  const totalCount = serviceCenters?.length ?? 0
  const activeCount = serviceCenters?.filter(center => center.operating_hours?.some(hour => hour.is_active))?.length ?? 0
  const verifiedCount = serviceCenters?.filter(center => center.image)?.length ?? 0
  const totalReviews = serviceCenters?.reduce((acc, center) => acc + (center.reviews?.length ?? 0), 0) ?? 0

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleRefresh = () => {
    setSearchTerm("")
    refetch()
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <Card className="w-full max-w-lg mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="p-4 bg-red-100 rounded-full mb-6">
              <MapPin className="h-16 w-16 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Error Loading Service Centers</h3>
            <p className="text-gray-600 text-center max-w-md mb-6">
              {error instanceof Error ? error.message : "An unexpected error occurred"}
            </p>
            <Button onClick={() => refetch()} className="bg-[#363DFF]">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="space-y-8">
        {/* Professional Header */}
        <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-2">
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                Service Centers
              </h1>
              <p className="text-gray-600 text-base">
                Manage and discover certified automotive service providers
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="h-9 px-4 text-sm font-medium border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                ) : (
                  <Search className="h-3.5 w-3.5 mr-2" />
                )}
                Refresh
              </Button>
              <Button
                size="sm"
                className="h-9 px-4 text-sm font-medium bg-[#363DFF] hover:bg-[#363DFF]/90 shadow-sm transition-colors"
              >
                <Navigation className="h-3.5 w-3.5 mr-2" />
                Locate Centers
              </Button>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
        </div>

        {/* Professional Search and Controls */}
        <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.15s_forwards]">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search service centers..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 h-9 text-sm border-gray-300 focus:border-[#363DFF] focus:ring-[#363DFF]/20 transition-colors"
              />
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 px-4 text-sm font-medium border-gray-300 hover:bg-gray-50 transition-colors">
                    <Filter className="h-3.5 w-3.5 mr-2" />
                    Sort: {
                      sortBy === "name" ? "Name" :
                        sortBy === "email" ? "Email" :
                          sortBy === "rating" ? "Rating" :
                            "Date"
                    }
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setSortBy("name")} className="text-sm">
                    Sort by Name
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("email")} className="text-sm">
                    Sort by Email
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("rating")} className="text-sm">
                    Sort by Rating
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("created")} className="text-sm">
                    Sort by Date Created
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Professional Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Centers</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{totalCount}</p>
              </div>
              <div className="h-12 w-12 bg-[#363DFF]/10 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-[#363DFF]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{totalReviews}</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified Centers</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{verifiedCount}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Today</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{activeCount}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#363DFF]" />
          </div>
        )}

        {/* Service Centers List */}
        {!isLoading && (
          <div className="space-y-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
            {filteredAndSortedCenters?.length === 0 ? (
              <Card className="border-dashed border-2 border-gray-300 bg-white">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="p-4 bg-gray-100 rounded-full mb-6">
                    <MapPin className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">No service centers found</h3>
                  <p className="text-gray-600 text-center max-w-md">
                    Try adjusting your search terms or refresh to see all available centers.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedCenters?.map((center, index) => {
                  const averageRating = calculateAverageRating(center.reviews);
                  const reviewCount = center.reviews?.length ?? 0;

                  return (
                    <div
                      key={center.id}
                      className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                      style={{ animationDelay: `${0.7 + (index * 0.1)}s` }}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          {/* Left Section - Main Info */}
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="relative flex-shrink-0">
                              <Avatar className="h-16 w-16 border-2 border-gray-100">
                                <AvatarImage src={center.image} alt={center.name} className="object-cover" />
                                <AvatarFallback className="bg-[#363DFF] text-white text-lg font-semibold">
                                  {center.name.split(' ').map(word => word[0]).join('').toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-500 border-2 border-white rounded-full"></div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    {center.name}
                                  </h3>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                      <Phone className="h-4 w-4 text-gray-400" />
                                      <span>{center.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Mail className="h-4 w-4 text-gray-400" />
                                      <span>{center.email}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                    {center.operating_hours?.some(hour => hour.is_active) ? 'Active' : 'Inactive'}
                                  </Badge>
                                  <div className="flex items-center space-x-2">
                                    <div className="flex">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className={cn(
                                            "h-4 w-4",
                                            star <= averageRating
                                              ? "fill-amber-400 text-amber-400"
                                              : "fill-gray-200 text-gray-200"
                                          )}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                      {averageRating.toFixed(1)}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      ({reviewCount})
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Professional Info Grid */}
                              <div className="grid grid-cols-4 gap-4 mb-4">
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <p className="text-xs font-medium text-gray-500 mb-1">Established</p>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {new Date(center.created_at).getFullYear()}
                                  </p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <p className="text-xs font-medium text-gray-500 mb-1">Service Type</p>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {center.specializations?.length ? 'Specialized' : 'Full Service'}
                                  </p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <p className="text-xs font-medium text-gray-500 mb-1">Availability</p>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {center.operating_hours?.some(hour => hour.is_active) ? 'Open Today' : 'Closed'}
                                  </p>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <p className="text-xs font-medium text-gray-500 mb-1">Recent Reviews</p>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {center.reviews?.slice(-3).length ?? 0} new
                                  </p>
                                </div>
                              </div>

                              {/* Recent Reviews Preview */}
                              {center.reviews && center.reviews.length > 0 && (
                                <div className="mt-4 space-y-2">
                                  <h4 className="text-sm font-medium text-gray-900">Recent Reviews</h4>
                                  <div className="space-y-2">
                                    {center.reviews.slice(-2).map((review) => (
                                      <div key={review.id} className="flex items-start space-x-2 text-sm">
                                        <Avatar className="h-6 w-6">
                                          <AvatarImage src={review.user?.avatar} />
                                          <AvatarFallback className="text-xs">
                                            {review.user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() ?? 'U'}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-gray-900 font-medium truncate">
                                            {review.user?.name ?? 'Anonymous'}
                                          </p>
                                          <p className="text-gray-500 line-clamp-1">{review.comment}</p>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                          <span className="text-sm font-medium text-gray-900">{review.rating}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right Section - Professional Actions */}
                          <div className="flex items-center space-x-3 ml-6">
                            <Button
                              onClick={() => router.push(`/dashboard/appointments/create?service_center_id=${center.id}`)}
                              size="sm"
                              className="bg-[#363DFF] hover:bg-[#363DFF]/90 text-white px-4 h-9 text-sm font-medium"
                            >
                              <Car className="h-4 w-4 mr-2" />
                              Book Service
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="px-4 h-9 text-sm font-medium border-gray-300 hover:bg-gray-50"
                              onClick={() => window.open(`tel:${center.phone}`, '_self')}
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Call
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="px-3 h-9 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 