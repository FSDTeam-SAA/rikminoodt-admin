export interface AdminUser {
  _id: string
  name: string
  email: string
  role: string
  profileImage?: string
  refreshToken?: string
}

export interface BackendResponse<T = any> {
  statusCode: number
  success: boolean
  message: string
  data: T
  responseTime?: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface LoginResponseData {
  user: AdminUser
  accessToken: string
}

export interface ForgetPasswordDto {
  email: string
}

export interface VerifyCodeDto {
  email: string
  otp: string
}

export interface ResetPasswordDto {
  email: string
  newPassword: string
}

export interface ChangePasswordDto {
  oldPassword: string
  newPassword: string
}
