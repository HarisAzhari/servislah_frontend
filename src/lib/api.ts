const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://servislahserver-production.up.railway.app/api/v1';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const getAuthHeaders = (): HeadersInit => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Handle redirects explicitly
    if (response.status === 307 || response.status === 308) {
      const redirectUrl = response.headers.get('Location');
      if (redirectUrl) {
        console.log(`Redirecting from ${url} to ${redirectUrl}`);
        const newResponse = await fetch(redirectUrl, config);
        if (!newResponse.ok) {
          const errorData = await newResponse.json().catch(() => ({ message: 'Unknown error' }));
          throw new ApiError(newResponse.status, errorData.message || `HTTP ${newResponse.status}`);
        }
        return await newResponse.json();
      }
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new ApiError(response.status, errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('API Error:', error);
    throw new ApiError(0, 'Network error or server unavailable');
  }
}; 