"use client";
import React, { useState, useRef } from "react";
import {
  Star,
  Camera,
  Video,
  Upload,
  X,
  Send,
  ArrowLeft,
  Heart,
  ThumbsUp,
  MessageCircle,
  CheckCircle,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
}

const ReviewPage: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Mock service center data - replace with actual data from URL params or API
  const serviceCenter = {
    name: "AutoCare Premium Service",
    service: "Oil Change & Engine Maintenance",
    appointmentDate: "March 15, 2024",
    vehicle: "2022 Honda Civic",
  };

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleStarHover = (starValue: number) => {
    setHoverRating(starValue);
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const preview = URL.createObjectURL(file);
        const newMedia: MediaFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview,
          type: file.type.startsWith("image/") ? "image" : "video",
        };
        setMediaFiles((prev) => [...prev, newMedia]);
      } else {
        toast.error("Please upload only images or videos");
      }
    });
  };

  const removeMedia = (id: string) => {
    setMediaFiles((prev) => {
      const updated = prev.filter((media) => media.id !== id);
      // Clean up object URLs to prevent memory leaks
      const removed = prev.find((media) => media.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.preview);
      }
      return updated;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please provide a star rating");
      return;
    }

    if (comment.trim().length < 10) {
      toast.error("Please write at least 10 characters in your review");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(
        "🎉 Review submitted successfully! Thank you for your feedback!"
      );

      // Redirect back to appointments or dashboard
      setTimeout(() => {
        router.push("/dashboard/appointments");
      }, 1500);
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "Rate your experience";
    }
  };

  const getRatingColor = (stars: number) => {
    switch (stars) {
      case 1:
        return "text-red-500";
      case 2:
        return "text-orange-500";
      case 3:
        return "text-yellow-500";
      case 4:
        return "text-blue-500";
      case 5:
        return "text-green-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 -my-8">
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24 lg:pb-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm rounded-2xl mt-3 sm:mt-4 border border-white/20">
          <div className="px-4 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-[#363DFF] to-[#4F46E5] rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Share Your Experience
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Help others by reviewing your service experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Review Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Details Card */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Service Completed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Service Center:
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {serviceCenter.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Service:
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {serviceCenter.service}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Date:
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {serviceCenter.appointmentDate}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Vehicle:
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {serviceCenter.vehicle}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Star Rating */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Rate Your Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="flex justify-center items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => handleStarHover(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full p-1"
                      >
                        <Star
                          className={`w-10 h-10 transition-colors duration-200 ${
                            star <= (hoverRating || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p
                      className={`text-xl font-semibold ${getRatingColor(
                        rating || hoverRating
                      )}`}
                    >
                      {getRatingText(rating || hoverRating)}
                    </p>
                    {rating > 0 && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                      >
                        {rating} star{rating !== 1 ? "s" : ""}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Add Photos & Videos
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share images or videos of your experience (optional)
                </p>
              </CardHeader>
              <CardContent>
                {/* Upload Area */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
                    isDragging
                      ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-center gap-2">
                      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <ImageIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <Video className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Drag & drop your files here, or{" "}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                      >
                        browse
                      </button>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Supports: JPG, PNG, MP4, MOV (max 10MB each)
                    </p>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />

                {/* Media Preview */}
                {mediaFiles.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {mediaFiles.map((media) => (
                      <div key={media.id} className="relative group">
                        <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                          {media.type === "image" ? (
                            <Image
                              src={media.preview}
                              alt="Preview"
                              width={200}
                              height={200}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <video
                              src={media.preview}
                              className="w-full h-full object-cover"
                              controls={false}
                              muted
                            />
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                        </div>
                        <button
                          onClick={() => removeMedia(media.id)}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {media.type === "video" && (
                          <div className="absolute bottom-2 left-2">
                            <Badge
                              variant="secondary"
                              className="bg-black/50 text-white text-xs"
                            >
                              <Video className="w-3 h-3 mr-1" />
                              Video
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Comment Section */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Write Your Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your detailed experience... What did you like? What could be improved? How was the staff? Any recommendations for other customers?"
                  className="min-h-[120px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20 transition-colors resize-none"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Minimum 10 characters
                  </p>
                  <p
                    className={`text-xs ${
                      comment.length >= 10 ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {comment.length}/500
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 shadow-lg">
              <CardContent className="pt-6">
                <Button
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting || rating === 0 || comment.trim().length < 10
                  }
                  className="w-full h-12 bg-gradient-to-r from-[#363DFF] to-[#4F46E5] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting Review...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Submit Review
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips Card */}
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Review Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <ThumbsUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>Be specific about what you liked or didn't like</p>
                </div>
                <div className="flex items-start gap-2">
                  <Camera className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>Photos help other customers see the quality</p>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>Rate based on overall experience</p>
                </div>
                <div className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>Mention staff helpfulness and service quality</p>
                </div>
              </CardContent>
            </Card>

            {/* Review Guidelines */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white text-sm">
                  Review Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <p>• Be honest and constructive</p>
                <p>• Avoid personal attacks</p>
                <p>• Focus on the service experience</p>
                <p>• Keep it relevant and helpful</p>
                <p>• No spam or fake content</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
