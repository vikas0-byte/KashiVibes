export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User; // Use User interface instead of inline type
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  avatar?: string;
  createdAt?: Date; // Make this optional
}