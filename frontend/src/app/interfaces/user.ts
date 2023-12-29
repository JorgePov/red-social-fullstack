export interface userLogin {
  email: string;
  password: string;
}

export interface userResponse {
  email: string;
  fullName: string;
  age: number;
  id: number;
  token?: string;
}

export interface userRegister {
  age: number;
  email: string;
  fullName: string;
  password: string;
}

export interface userUpdate {
  age: number;
  fullName: string;
}

export interface passwordChange {
  oldPassword: string;
  newPassword: string;
}
