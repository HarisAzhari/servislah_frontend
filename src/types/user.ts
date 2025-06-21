export interface User {
  id: string;
  email: string;
  password: string;
  phone: string;
  role: "USER" | "ADMIN" | "MECHANIC";
  status: "ACTIVE" | "INACTIVE";
  platform: "CREDENTIAL" | "GOOGLE" | "FACEBOOK";
  profile: UserProfile | null;
  subscription: UserSubscription | null;
  tokens: any;
  permissions: any;
  vehicles: any;
  appointments: any;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  address: string;
  preferred_language: string;
  notification_preferences: string;
  created_at: string;
  updated_at: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  is_active: boolean;
  start_date: string;
  end_date: string;
  subscription_type: "FREE" | "PREMIUM" | "ENTERPRISE";
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  platform: "CREDENTIAL" | "GOOGLE" | "FACEBOOK";
}

export interface UpdateUserRequest {
  phone?: string;
  profile: {
    first_name: string;
    last_name: string;
  };
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface UserResponse {
  user: User;
}

export interface LoginResponse {
  user_id: string;
  email: string;
  backend_tokens: {
    access_token: string;
    refresh_token: string;
  };
} 