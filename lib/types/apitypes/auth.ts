export interface LoginRequest {
    userName: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
  }
  
  export interface RegisterRequest {
    email: string;
    password: string;
    fullName: string;
  }
  
  export interface RegisterResponse {
    userId: string;
  }