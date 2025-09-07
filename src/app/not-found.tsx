"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#363DFF] to-[#4F46E5] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 400 600"
          fill="none"
        >
          <path
            d="M0,100 C150,200 250,0 400,150 L400,0 L0,0 Z"
            fill="url(#gradient1)"
            opacity="0.15"
          />
          <path
            d="M0,300 C200,250 300,400 400,300 L400,600 L0,600 Z"
            fill="url(#gradient2)"
            opacity="0.2"
          />
          <circle
            cx="80"
            cy="120"
            r="3"
            fill="white"
            opacity="0.4"
            className="animate-pulse"
          />
          <circle
            cx="320"
            cy="180"
            r="2"
            fill="white"
            opacity="0.5"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <circle
            cx="150"
            cy="400"
            r="1.5"
            fill="white"
            opacity="0.6"
            className="animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <circle
            cx="250"
            cy="450"
            r="2.5"
            fill="white"
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDelay: "3s" }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "white", stopOpacity: 0.3 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "white", stopOpacity: 0.1 }}
              />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "white", stopOpacity: 0.2 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "white", stopOpacity: 0.4 }}
              />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating road lines animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-0 w-16 h-1 bg-white/20 rounded-full animate-[roadMarkings_3s_ease-in-out_infinite]"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-1/2 left-0 w-12 h-1 bg-white/15 rounded-full animate-[roadMarkings_3s_ease-in-out_infinite]"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-0 w-10 h-1 bg-white/10 rounded-full animate-[roadMarkings_3s_ease-in-out_infinite]"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center text-white">
        {/* Animated Logo */}
        <div className="mb-8 opacity-0 animate-[fadeInDown_1s_ease-out_0.2s_forwards]">
          <Image
            src="/White Logo.png"
            alt="ServisLah Logo"
            width={100}
            height={50}
            className="mx-auto opacity-90"
          />
        </div>

        {/* 404 with car animation */}
        <div className="relative mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards]">
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-4 relative">
            4
            <div className="inline-block relative mx-4">
              <span className="text-8xl md:text-9xl">0</span>
              {/* Animated car inside the 0 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <Image
                    src="/black-isolated-car_23-2151852894-removebg-preview.png"
                    alt="Car"
                    width={60}
                    height={30}
                    className="filter invert brightness-0 opacity-80 animate-[carBounce_2s_ease-in-out_infinite_alternate]"
                  />
                  {/* Exhaust smoke */}
                  <div className="absolute -left-8 top-4 w-2 h-2 bg-white/30 rounded-full animate-[smoke1_2s_ease-out_infinite]"></div>
                  <div
                    className="absolute -left-6 top-3 w-1.5 h-1.5 bg-white/20 rounded-full animate-[smoke2_2.5s_ease-out_infinite]"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute -left-4 top-2 w-1 h-1 bg-white/10 rounded-full animate-[smoke3_3s_ease-out_infinite]"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>
            </div>
            4
          </h1>
        </div>

        {/* Error message with animation */}
        <div className="max-w-lg mx-auto mb-8 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! Lost on the Road
          </h2>
          <p className="text-white/90 text-lg mb-2">
            Looks like this page took a wrong turn! 🚗💨
          </p>
          <p className="text-white/70 text-base">
            Don't worry, we'll get you back on track to manage your vehicle
            services.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
          <Link
            href="/"
            className="group px-8 py-4 bg-white text-[#363DFF] font-semibold rounded-xl hover:bg-white/95 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/dashboard"
            className="group px-8 py-4 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border border-white/30 flex items-center gap-3"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l6-3v13l-6 3z"
              />
            </svg>
            Go to Dashboard
          </Link>
        </div>

        {/* Fun animated text */}
        <div className="mt-12 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
          <p className="text-white/60 text-sm">
            Even the best GPS can get confused sometimes!
            <span className="inline-block animate-bounce ml-2">🗺️</span>
          </p>
        </div>

        {/* Loading dots animation for fun */}
        <div className="mt-8 flex justify-center space-x-2 opacity-0 animate-[fadeIn_1s_ease-out_1.2s_forwards]">
          <div className="w-2 h-2 bg-white/40 rounded-full animate-[dotBounce_1.4s_ease-in-out_infinite]"></div>
          <div
            className="w-2 h-2 bg-white/40 rounded-full animate-[dotBounce_1.4s_ease-in-out_infinite]"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-white/40 rounded-full animate-[dotBounce_1.4s_ease-in-out_infinite]"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
