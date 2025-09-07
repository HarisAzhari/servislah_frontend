"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Calendar,
  MapPin,
  Shield,
  Clock,
  Star,
  CheckCircle,
  Users,
  Wrench,
  Heart,
} from "lucide-react";

export default function LandscapePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="flex items-center justify-center">
          <Car className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ServisLah
          </span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            href="#how-it-works"
          >
            How It Works
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 transition-colors"
            href="/login"
          >
            Login
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="w-fit bg-blue-50 text-blue-700 border-blue-200"
                >
                  🚗 Car Service Made Simple
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
                  Book Your Car Service in
                  <span className="block text-blue-600 dark:text-blue-400">
                    Just a Few Clicks
                  </span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Register your car, find trusted service centers nearby, and
                  book appointments seamlessly. Your car deserves the best care,
                  and we make it effortless to get it.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Car className="mr-2 h-4 w-4" />
                    Start Booking Now
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-950"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 fill-red-400 text-red-400 mr-1" />
                  <span>10k+ Happy Customers</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
                  <Image
                    src="/black-isolated-car_23-2151852894-removebg-preview.png"
                    alt="Car Service Illustration"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                    priority
                  />
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-2 animate-bounce">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Getting your car serviced has never been this simple. Follow
                these easy steps and you're all set!
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <div className="bg-blue-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  Register Your Car
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Add your vehicle details to your profile. Make, model, year -
                  we'll keep track of everything.
                </p>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                >
                  Step 1
                </Badge>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <div className="bg-green-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  Find Service Centers
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Browse trusted service centers near you. Read reviews, compare
                  prices, and choose the best fit.
                </p>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                >
                  Step 2
                </Badge>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
              <CardContent className="flex flex-col items-center space-y-4 p-6">
                <div className="bg-purple-600 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-center">Book & Relax</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Select your preferred date and time. Sit back and let us
                  handle the rest. Easy as that!
                </p>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                >
                  Step 3
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                Why Choose ServisLah?
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We've built the ultimate car service platform with features that
                make your life easier.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-2">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">24/7 Booking</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Book appointments anytime, anywhere. Our platform never
                    sleeps, so you don't have to wait.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 dark:bg-green-900 rounded-lg p-2">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Trusted Partners</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    All service centers are verified and reviewed. Your car is
                    in safe hands with our trusted partners.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-2">
                  <Wrench className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Expert Service</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    From routine maintenance to complex repairs, our network
                    covers all your automotive needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
                <Card className="relative bg-white dark:bg-gray-800 shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Service Quality
                        </span>
                        <span className="text-sm font-bold text-green-600">
                          99.8%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                          style={{ width: "99.8%" }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Customer Satisfaction
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                          98.5%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                          style={{ width: "98.5%" }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Booking Success
                        </span>
                        <span className="text-sm font-bold text-purple-600">
                          99.9%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full"
                          style={{ width: "99.9%" }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                Ready to Get Started?
              </h2>
              <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of satisfied customers who trust ServisLah for
                their car service needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Car className="mr-2 h-4 w-4" />
                  Create Account
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Sign In Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-900">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 ServisLah. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
