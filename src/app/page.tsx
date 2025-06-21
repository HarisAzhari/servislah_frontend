import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Clean branding section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#363DFF] to-[#4F46E5] relative overflow-hidden">
        {/* Custom bezier shapes */}
        <div className="absolute inset-0">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 400 600" fill="none">
            <path d="M0,100 C150,200 250,0 400,150 L400,0 L0,0 Z" fill="url(#gradient1)" opacity="0.1"/>
            <path d="M0,300 C200,250 300,400 400,300 L400,600 L0,600 Z" fill="url(#gradient2)" opacity="0.15"/>
            <circle cx="80" cy="120" r="2" fill="white" opacity="0.3" className="animate-pulse"/>
            <circle cx="320" cy="180" r="1.5" fill="white" opacity="0.4" className="animate-pulse" style={{animationDelay: '1s'}}/>
            <circle cx="150" cy="400" r="1" fill="white" opacity="0.5" className="animate-pulse" style={{animationDelay: '2s'}}/>
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'white', stopOpacity: 0.2}}/>
                <stop offset="100%" style={{stopColor: 'white', stopOpacity: 0.05}}/>
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'white', stopOpacity: 0.1}}/>
                <stop offset="100%" style={{stopColor: 'white', stopOpacity: 0.3}}/>
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
                Welcome Back!
              </h1>
              <p className="text-white/80 mb-6 text-sm">
                Ready to take care of your vehicle?
              </p>
            </div>

            <p className="text-lg text-white/95 mb-8 leading-relaxed opacity-0 animate-[fadeIn_0.8s_ease-out_0.6s_forwards]">
              Continue managing your vehicle services with ease
            </p>

            {/* What you can do */}
            <div className="space-y-4 text-left opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
              <div className="flex items-start space-x-3 hover:bg-white/10 rounded-lg p-2 transition-all duration-300 hover:scale-105">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-medium block transition-colors duration-300 hover:text-white">View upcoming appointments</span>
                  <span className="text-white/70 text-sm">Never miss a service date</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 hover:bg-white/10 rounded-lg p-2 transition-all duration-300 hover:scale-105">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-medium block transition-colors duration-300 hover:text-white">Book new services</span>
                  <span className="text-white/70 text-sm">Quick and hassle-free booking</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 hover:bg-white/10 rounded-lg p-2 transition-all duration-300 hover:scale-105">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-white font-medium block transition-colors duration-300 hover:text-white">Track maintenance history</span>
                  <span className="text-white/70 text-sm">Keep your vehicle in top condition</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
