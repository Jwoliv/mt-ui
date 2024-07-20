export interface LoginCredentialsRequest {
  username: string;
  password: string;
}

export interface SignUpCredentialsRequest {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
}
