export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'CLIENT' | 'FREELANCER';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
  };
  token: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  userType: string;
}
