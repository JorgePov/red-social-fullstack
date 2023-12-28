export interface userLogin {
  email: string;
  password: string;
}

export interface userResponse {
  email: string;
  fullName: string;
  id: number;
  token?: string;
}

export interface userRegister {
  age: number;
  email: string;
  fullName: string;
  password: string;
}
