"use client"

import React from "react"

interface MiniCarLoadingProps {
  className?: string
}

export const MiniCarLoading: React.FC<MiniCarLoadingProps> = ({ className = "" }) => {
  return (
    <div className={`relative w-8 h-4 ${className}`}>
      {/* Mini road */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 rounded-full overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60 animate-[roadShine_1s_linear_infinite]"></div>
      </div>

      {/* Mini car */}
      <div className="absolute top-0 left-0 animate-[miniCarMove_1.5s_linear_infinite]">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="drop-shadow-sm">
          <defs>
            <linearGradient id="miniCarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#1E40AF', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          {/* Car body */}
          <path d="M4 4 L12 4 L14 6 L14 8 L13 8 L13 7 L3 7 L3 8 L2 8 L2 6 L4 4 Z" fill="url(#miniCarGradient)" />
          
          {/* Car top */}
          <path d="M5 2 L11 2 L12 4 L4 4 L5 2 Z" fill="url(#miniCarGradient)" />
          
          {/* Window */}
          <path d="M5.5 2.5 L10.5 2.5 L11.5 3.5 L4.5 3.5 L5.5 2.5 Z" fill="#87CEEB" opacity="0.8" />
          
          {/* Wheels */}
          <circle cx="11" cy="7.5" r="1.5" fill="#2D3748" className="animate-[wheelSpin_0.2s_linear_infinite]" />
          <circle cx="5" cy="7.5" r="1.5" fill="#2D3748" className="animate-[wheelSpin_0.2s_linear_infinite]" />
          <circle cx="11" cy="7.5" r="0.8" fill="#4A5568" />
          <circle cx="5" cy="7.5" r="0.8" fill="#4A5568" />
          
          {/* Headlight */}
          <circle cx="14" cy="5" r="0.8" fill="#FBBF24" className="animate-[headlightPulse_1s_ease-in-out_infinite]" />
        </svg>
      </div>

      {/* Exhaust smoke */}
      <div className="absolute top-1 -right-1">
        <div className="w-1 h-1 bg-gray-400 rounded-full opacity-50 animate-[miniSmoke_1s_ease-out_infinite]"></div>
      </div>


    </div>
  )
} 