// Log environment information for debugging
console.log('🔧 Config initialization:');
console.log('   🌍 NODE_ENV:', process.env.NODE_ENV);
console.log('   🔗 NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('   🏠 Window location (if available):', typeof window !== 'undefined' ? window.location.href : 'Not available (SSR)');

// Environment configuration
export const config = {
  // API Configuration - always use the Railway URL
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://servislahserver-production.up.railway.app/api/v1',
  
  // App Configuration
  appName: 'ServisLah',
  appVersion: '1.0.0',
  
  // Feature Flags
  features: {
    enableNotifications: true,
    enableGeolocation: true,
    maxVehicleImages: 5,
  }
} as const 

// Log the final config for debugging
console.log('📋 Final config values:');
console.log('   🎯 apiBaseUrl:', config.apiBaseUrl);
console.log('   📱 appName:', config.appName);
console.log('   🔢 appVersion:', config.appVersion); 