import { httpClient } from './httpClient'

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
  const method = options.method || 'GET';
  
  try {
    let response: Response;
    
    if (method === 'GET') {
      // Use the httpClient for GET requests
      response = await httpClient.get(url, {
        headers: options.headers as Record<string, string> || {},
      });
    } else {
      // Use fetch directly for POST, PUT, PATCH, DELETE requests
      const headers = {
        ...getAuthHeaders(),
        ...(options.headers || {}),
      };
      
      response = await fetch(url, {
        method,
        headers,
        body: options.body,
        ...options,
      });
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