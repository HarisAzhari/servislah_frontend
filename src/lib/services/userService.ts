import { apiRequest } from '@/lib/api';
import { 
  User, 
  CreateUserRequest, 
  UpdateUserRequest, 
  ApiResponse, 
  UserResponse,
  LoginResponse 
} from '@/types/user';

export const userService = {
  // 1) GET All Users
  getAllUsers: async (): Promise<ApiResponse<{ users: User[] }>> => {
    return apiRequest<ApiResponse<{ users: User[] }>>('/users');
  },

  // 2) GET User by ID
  getUserById: async (userId: string): Promise<ApiResponse<UserResponse>> => {
    return apiRequest<ApiResponse<UserResponse>>(`/users/${userId}`);
  },

  // 3) GET User by Email
  getUserByEmail: async (email: string): Promise<ApiResponse<UserResponse>> => {
    return apiRequest<ApiResponse<UserResponse>>(`/users/${email}`);
  },

  // 4) POST Create User (Sign up)
  createUser: async (userData: CreateUserRequest): Promise<ApiResponse<UserResponse>> => {
    return apiRequest<ApiResponse<UserResponse>>('/users/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // 5) PATCH Update User
  updateUser: async (userId: string, userData: UpdateUserRequest): Promise<ApiResponse<UserResponse>> => {
    return apiRequest<ApiResponse<UserResponse>>(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  },

  // 6) DELETE User
  deleteUser: async (userId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/users/${userId}`, {
      method: 'DELETE',
    });
  },

  // Login functionality (already exists but let's add it here for completeness)
  login: async (email: string, password: string): Promise<ApiResponse<LoginResponse>> => {
    return apiRequest<ApiResponse<LoginResponse>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        platform: 'CREDENTIAL',
      }),
    });
  },

  // Get current user from token
  getCurrentUser: async (): Promise<ApiResponse<UserResponse>> => {
    const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
    if (!userId) {
      throw new Error('No user ID found');
    }
    return userService.getUserById(userId);
  },
}; 