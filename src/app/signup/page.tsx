import { SignUpForm } from "@/components/signup-form";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Clean branding section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#363DFF] to-[#4F46E5] relative overflow-hidden">
        {/* Custom bezier shapes */}
        <div className="absolute inset-0">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 400 600" fill="none">
            <path d="M0,150 C200,50 300,250 400,100 L400,0 L0,0 Z" fill="url(#gradient3)" opacity="0.12"/>
            <path d="M0,350 C150,450 350,250 400,400 L400,600 L0,600 Z" fill="url(#gradient4)" opacity="0.18"/>
            <circle cx="100" cy="200" r="1.5" fill="white" opacity="0.4" className="animate-pulse"/>
            <circle cx="300" cy="150" r="2" fill="white" opacity="0.3" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
            <circle cx="200" cy="450" r="1" fill="white" opacity="0.5" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
            <defs>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'white', stopOpacity: 0.25}}/>
                <stop offset="100%" style={{stopColor: 'white', stopOpacity: 0.05}}/>
              </linearGradient>
              <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'white', stopOpacity: 0.15}}/>
                <stop offset="100%" style={{stopColor: 'white', stopOpacity: 0.25}}/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
                    <div className="text-center max-w-md">
            {/* Company logo */}
            <div className="mb-8 opacity-0 animate-[fadeInDown_0.8s_ease-out_0.2s_forwards]">
              <Image
                src="/White Logo.png"
                alt="ServisLah Logo"
                width={120}
                height={60}
                className="mx-auto"
              />
            </div>

            {/* Clean heading */}
            <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome to ServisLah!
              </h1>
              <p className="text-white/80 mb-6 text-sm">
                Your vehicle deserves the best care
              </p>
            </div>

            <p className="text-lg text-white/95 mb-8 leading-relaxed opacity-0 animate-[fadeIn_0.8s_ease-out_0.6s_forwards]">
              Join thousands of satisfied vehicle owners who trust us with their rides
            </p>

            {/* Why choose us */}
            <div className="space-y-4 text-left opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
              <div className="flex items-start space-x-3 hover:bg-white/10 rounded-lg p-2 transition-all duration-300 hover:scale-105">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-medium block transition-colors duration-300 hover:text-white">Easy appointment booking</span>
                  <span className="text-white/70 text-sm">Schedule services in just a few clicks</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 hover:bg-white/10 rounded-lg p-2 transition-all duration-300 hover:scale-105">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-medium block transition-colors duration-300 hover:text-white">Complete service history</span>
                  <span className="text-white/70 text-sm">Keep track of all your vehicle maintenance</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 hover:bg-white/10 rounded-lg p-2 transition-all duration-300 hover:scale-105">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-medium block transition-colors duration-300 hover:text-white">Trusted service network</span>
                  <span className="text-white/70 text-sm">Connect with verified service centers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
} 