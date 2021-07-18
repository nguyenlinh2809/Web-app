export interface RegistrationUser {
  nickName: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  country: string;
}

export interface UserDetail {
  nickName: string;
  password: string;
  email: string;
  phone: string;
  country: string;
}

export interface UserResponse {
  msg: string;
  data: UserDetail;
}

export interface UserLogin {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface Country {
  code: string;
  name: string;
}
