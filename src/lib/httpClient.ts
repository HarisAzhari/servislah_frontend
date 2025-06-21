/// Singleton HTTP client that automatically handles redirects
class HttpClientSingleton {
  // Singleton instance
  private static _instance: HttpClientSingleton;

  // Factory constructor returns singleton instance
  static getInstance(): HttpClientSingleton {
    if (!HttpClientSingleton._instance) {
      HttpClientSingleton._instance = new HttpClientSingleton();
    }
    return HttpClientSingleton._instance;
  }

  // Private constructor for singleton
  private constructor() {
    console.log('🔧 HttpClient singleton initialized');
  }

  // Helper method to get auth headers
  private getAuthHeaders(): Record<string, string> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
    
    console.log('🔑 Auth headers prepared:', {
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      headers: Object.keys(headers)
    });
    
    return headers;
  }

  // Helper method to make a GET request with redirect handling
  async get(
    url: string,
    {
      headers = {},
      maxRedirects = 5,
    }: {
      headers?: Record<string, string>;
      maxRedirects?: number;
    } = {}
  ): Promise<Response> {
    console.log('🚀 HttpClient.get() called with:');
    console.log('   📍 Original URL:', url);
    console.log('   📋 Custom headers:', headers);
    console.log('   🔄 Max redirects:', maxRedirects);
    
    const mergedHeaders = { ...this.getAuthHeaders(), ...headers };
    console.log('   📝 Final headers:', Object.keys(mergedHeaders));

    let redirectCount = 0;
    let currentUrl = url;

    // Validate URL format
    try {
      if (currentUrl.startsWith('/')) {
        console.log('⚠️  WARNING: Relative URL detected, this might cause issues:', currentUrl);
      } else {
        new URL(currentUrl); // Test if it's a valid absolute URL
        console.log('✅ Valid absolute URL detected');
      }
    } catch (error) {
      console.error('❌ Invalid URL format:', currentUrl, error);
    }

    while (redirectCount < maxRedirects) {
      console.log(`\n🔄 Attempt #${redirectCount + 1}:`);
      console.log('   🎯 Target URL:', currentUrl);
      console.log('   📊 Redirect count:', redirectCount);

      try {
        const response = await fetch(currentUrl, {
          method: 'GET',
          headers: mergedHeaders,
          redirect: 'manual', // Manual redirect handling
        });

        console.log('   📈 Response received:');
        console.log('      Status:', response.status);
        console.log('      Status Text:', response.statusText);
        console.log('      Headers:', Object.fromEntries(response.headers.entries()));
        
        // Special handling for status 0 (network error)
        if (response.status === 0) {
          console.error('❌ Network error detected (status 0)');
          console.log('   This usually indicates:');
          console.log('   - CORS issue');
          console.log('   - Network connectivity problem');
          console.log('   - Invalid URL');
          console.log('   - Server not reachable');
        }

        // If we get a redirect status code
        if ([301, 302, 303, 307, 308].includes(response.status)) {
          console.log('🔀 Redirect detected!');
          
          // Get the redirect location
          const location = response.headers.get('location');
          if (!location) {
            console.log('⚠️  Redirect without location header, returning response');
            return response; // No location header, can't redirect
          }

          console.log('   📍 Redirect location:', location);

          // Handle relative URLs
          if (location.startsWith('/')) {
            console.log('   🔗 Processing relative URL...');
            const originalUrl = new URL(currentUrl);
            const baseUrl = `${originalUrl.protocol}//${originalUrl.host}`;
            currentUrl = `${baseUrl}${location}`;
            console.log('   🏠 Base URL:', baseUrl);
            console.log('   🎯 New absolute URL:', currentUrl);
          } else {
            currentUrl = location;
            console.log('   ✅ Using absolute redirect URL:', currentUrl);
          }

          console.log(`   ➡️  Redirecting to: ${currentUrl} (Redirect #${redirectCount + 1})`);
          redirectCount++;
          continue;
        }

        // Not a redirect, return the response
        console.log('✅ Final response (no redirect needed)');
        return response;
        
      } catch (error) {
        console.error('❌ Fetch failed:', error);
        console.log('   URL that failed:', currentUrl);
        console.log('   Error details:', error);
        throw error;
      }
    }

    // Too many redirects
    const errorMessage = `Too many redirects: ${redirectCount}`;
    console.error('❌', errorMessage);
    throw new Error(errorMessage);
  }
}

/// A custom HTTP client that handles redirects manually
export class RedirectCapableClient {
  private maxRedirects: number;

  constructor({ maxRedirects = 5 }: { maxRedirects?: number } = {}) {
    this.maxRedirects = maxRedirects;
    console.log('🔧 RedirectCapableClient initialized with maxRedirects:', maxRedirects);
  }

  private getAuthHeaders(): Record<string, string> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
    
    console.log('🔑 RedirectClient auth headers:', {
      hasToken: !!token,
      headers: Object.keys(headers)
    });
    
    return headers;
  }

  /// Performs a GET request with manual redirect handling
  async get(
    url: string,
    { headers = {} }: { headers?: Record<string, string> } = {}
  ): Promise<Response> {
    console.log('🚀 RedirectCapableClient.get() called with:', url);
    
    const mergedHeaders = { ...this.getAuthHeaders(), ...headers };

    let redirectCount = 0;
    let currentUrl = url;

    while (redirectCount < this.maxRedirects) {
      // Print debug information
      console.log(`\n🔄 RedirectClient Attempt #${redirectCount + 1}: GET to ${currentUrl}`);

      try {
        // Perform the request
        const response = await fetch(currentUrl, {
          method: 'GET',
          headers: mergedHeaders,
          redirect: 'manual',
        });

        console.log(`   📈 Status code: ${response.status}`);

        // Check if it's a redirect
        if ([301, 302, 303, 307, 308].includes(response.status)) {
          // Get redirect location
          const location = response.headers.get('location');

          if (!location) {
            console.log('   ⚠️  Redirect without location header, returning response');
            return response;
          }

          console.log(`   📍 Redirect location: ${location}`);

          // Handle relative URLs
          if (location.startsWith('/')) {
            const originalUrl = new URL(currentUrl);
            const baseUrl = `${originalUrl.protocol}//${originalUrl.host}`;
            currentUrl = `${baseUrl}${location}`;
          } else {
            currentUrl = location;
          }

          console.log(`   ➡️  Redirecting to: ${currentUrl}`);
          redirectCount++;

          // Continue the loop
          continue;
        }

        // Not a redirect status, return the response
        console.log('   ✅ Final response from RedirectClient');
        return response;
        
      } catch (error) {
        console.error('   ❌ RedirectClient fetch failed:', error);
        throw error;
      }
    }

    const errorMessage = `Too many redirects (max: ${this.maxRedirects})`;
    console.error('❌', errorMessage);
    throw new Error(errorMessage);
  }
}

// Export singleton instance
export const httpClient = HttpClientSingleton.getInstance();

// Export factory function
export function createRedirectClient(maxRedirects = 5): RedirectCapableClient {
  return new RedirectCapableClient({ maxRedirects });
} 