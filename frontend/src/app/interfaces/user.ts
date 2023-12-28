export interface userLogin {
  email: string;
  password: string;
}

export interface userResponse {
  token?: string;
  id: number;
  fullName: string
  email: string;
}