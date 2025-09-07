"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Star,
  MapPin,
  Car,
  Filter,
  Search,
  Eye,
  Download,
  MessageSquare,
  ThumbsUp,
  Image as ImageIcon,
  Video,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock4,
  ArrowRight,
  History,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

// Mock data - replace with actual API calls
const mockBookingHistory = [
  {
    id: "1",
    serviceCenter: "AutoCare Premium Service",
    services: ["Oil Change", "Engine Maintenance"],
    vehicle: "2022 Honda Civic",
    date: "2024-03-15",
    time: "10:00 AM",
    status: "COMPLETED",
    totalPrice: 180,
    duration: 120,
    location: "Kuala Lumpur, Malaysia",
    image: "/placeholder-avatar.jpg",
  },
  {
    id: "2",
    serviceCenter: "Express Auto Care",
    services: ["Tire Rotation", "Brake Check"],
    vehicle: "2021 Toyota Camry",
    date: "2024-02-28",
    time: "2:00 PM",
    status: "COMPLETED",
    totalPrice: 95,
    duration: 90,
    location: "Selangor, Malaysia",
    image: "/placeholder-avatar.jpg",
  },
  {
    id: "3",
    serviceCenter: "Quick Fix Auto",
    services: ["AC Service"],
    vehicle: "2022 Honda Civic",
    date: "2024-02-10",
    time: "11:30 AM",
    status: "CANCELLED",
    totalPrice: 75,
    duration: 60,
    location: "Petaling Jaya, Malaysia",
    image: "/placeholder-avatar.jpg",
  },
  {
    id: "4",
    serviceCenter: "Premier Car Service",
    services: ["Full Service", "Detailing"],
    vehicle: "2021 Toyota Camry",
    date: "2024-01-20",
    time: "9:00 AM",
    status: "COMPLETED",
    totalPrice: 250,
    duration: 180,
    location: "Kuala Lumpur, Malaysia",
    image: "/placeholder-avatar.jpg",
  },
];

const mockReviewHistory = [
  {
    id: "1",
    bookingId: "1",
    serviceCenter: "AutoCare Premium Service",
    service: "Oil Change & Engine Maintenance",
    rating: 5,
    comment:
      "Excellent service! The staff was very professional and the work was completed on time. Highly recommend this place for any car maintenance needs.",
    date: "2024-03-16",
    hasMedia: true,
    mediaCount: 3,
    helpful: 12,
    vehicle: "2022 Honda Civic",
  },
  {
    id: "2",
    bookingId: "2",
    serviceCenter: "Express Auto Care",
    service: "Tire Rotation & Brake Check",
    rating: 4,
    comment:
      "Good service overall. The tire rotation was done properly and they found an issue with my brake pads that needed attention. Fair pricing.",
    date: "2024-03-01",
    hasMedia: false,
    mediaCount: 0,
    helpful: 8,
    vehicle: "2021 Toyota Camry",
  },
  {
    id: "3",
    bookingId: "4",
    serviceCenter: "Premier Car Service",
    service: "Full Service & Detailing",
    rating: 5,
    comment:
      "Amazing experience! My car looks brand new after their detailing service. The full service was comprehensive and they even provided a detailed report.",
    date: "2024-01-21",
    hasMedia: true,
    mediaCount: 5,
    helpful: 15,
    vehicle: "2021 Toyota Camry",
  },
];

const HistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [selectedTab, setSelectedTab] = useState("bookings");

  const getStatusConfig = (status: string) => {
    const configs = {
      COMPLETED: {
        color:
          "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
        icon: CheckCircle,
        iconColor: "text-green-500",
        borderColor: "border-l-green-500",
      },
      CANCELLED: {
        color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
        icon: XCircle,
        iconColor: "text-red-500",
        borderColor: "border-l-red-500",
      },
      PENDING: {
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
        icon: Clock4,
        iconColor: "text-yellow-500",
        borderColor: "border-l-yellow-500",
      },
    };
    return configs[status as keyof typeof configs] || configs.PENDING;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
    }).format(price);
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));
  };

  const filteredBookings = mockBookingHistory.filter((booking) => {
    const matchesSearch =
      booking.serviceCenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.services.some((service) =>
        service.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      booking.vehicle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || booking.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const filteredReviews = mockReviewHistory.filter((review) => {
    const matchesSearch =
      review.serviceCenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating =
      filterRating === "all" || review.rating.toString() === filterRating;

    return matchesSearch && matchesRating;
  });

  return (
    <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 -my-8">
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24 lg:pb-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm rounded-2xl mt-3 sm:mt-4 border border-white/20">
          <div className="px-4 py-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-[#363DFF] to-[#4F46E5] rounded-lg">
                  <History className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Service History
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    View your past bookings and reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search bookings, services, or reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-[#363DFF] focus:ring-[#363DFF]/20"
              />
            </div>

            {/* Status Filter (for bookings) */}
            {selectedTab === "bookings" && (
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48 h-11 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* Rating Filter (for reviews) */}
            {selectedTab === "reviews" && (
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-full sm:w-48 h-11 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <SelectValue placeholder="Filter by rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* Filter Button */}
            <Button
              variant="outline"
              className="h-11 px-4 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 border border-white/20">
              <TabsTrigger
                value="bookings"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#363DFF] data-[state=active]:to-[#4F46E5] data-[state=active]:text-white"
              >
                <BookOpen className="w-4 h-4" />
                Booking History ({filteredBookings.length})
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#363DFF] data-[state=active]:to-[#4F46E5] data-[state=active]:text-white"
              >
                <MessageSquare className="w-4 h-4" />
                Review History ({filteredReviews.length})
              </TabsTrigger>
            </TabsList>

            {/* Booking History Tab */}
            <TabsContent value="bookings" className="mt-6">
              <div className="space-y-4">
                {filteredBookings.map((booking) => {
                  const statusConfig = getStatusConfig(booking.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <Card
                      key={booking.id}
                      className={`group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-l-4 ${statusConfig.borderColor} shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] border border-white/20`}
                    >
                      {/* Hover Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                              <Car className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                {booking.serviceCenter}
                              </CardTitle>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {booking.vehicle}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusIcon
                              className={`w-4 h-4 ${statusConfig.iconColor}`}
                            />
                            <Badge className={statusConfig.color}>
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          {/* Date & Time */}
                          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-lg">
                            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Date & Time
                              </p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {new Date(booking.date).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-300">
                                {booking.time}
                              </p>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg">
                            <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Location
                              </p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {booking.location}
                              </p>
                            </div>
                          </div>

                          {/* Duration */}
                          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-lg">
                            <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Duration
                              </p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {booking.duration} mins
                              </p>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-lg">
                            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Total Price
                              </p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {formatPrice(booking.totalPrice)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Services */}
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Services:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {booking.services.map((service, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm rounded-full border border-blue-200 dark:border-blue-800"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <Eye className="w-3 h-3 mr-2" />
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <Download className="w-3 h-3 mr-2" />
                            Invoice
                          </Button>
                          {booking.status === "COMPLETED" && (
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                            >
                              Book Again
                              <ArrowRight className="w-3 h-3 ml-2" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {filteredBookings.length === 0 && (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No bookings found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Review History Tab */}
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <Card
                    key={review.id}
                    className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-l-4 border-l-yellow-500 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] border border-white/20"
                  >
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                            <Star className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                              {review.serviceCenter}
                            </CardTitle>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {review.service} • {review.vehicle}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            {getRatingStars(review.rating)}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      {/* Review Comment */}
                      <div className="mb-4">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          "{review.comment}"
                        </p>
                      </div>

                      {/* Media and Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Media Info */}
                          {review.hasMedia && (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <ImageIcon className="w-4 h-4 text-gray-500" />
                                <Video className="w-4 h-4 text-gray-500" />
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {review.mediaCount} files
                              </span>
                            </div>
                          )}

                          {/* Helpful Count */}
                          <div className="flex items-center gap-2">
                            <ThumbsUp className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {review.helpful} found helpful
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <Eye className="w-3 h-3 mr-2" />
                            View Full
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredReviews.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No reviews found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
