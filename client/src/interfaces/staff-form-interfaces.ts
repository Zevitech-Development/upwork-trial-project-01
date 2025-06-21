/* eslint-disable @typescript-eslint/no-explicit-any */
export interface StaffFormData {
  title: string
  name: string
  gdcNumber: string
  email: string
  phone: string
  ipRestriction: string
  role: string
  password?: string
  confirmPassword?: string
  loginHourRestriction?: boolean
  loginStartHour?: string
  loginEndHour?: string
}

export interface Permission {
  id: string
  label: string
  description: string
}

export interface RolePermissions {
  level: number
  permissions: string[]
}

// Add API types
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}

export interface StaffMember {
  id: string
  title: string
  name: string
  gdcNumber: string
  email: string
  phone: string
  ipRestriction?: string
  role: string
  permissionLevel: number
  permissions: string[]
  loginHourRestriction: boolean
  loginHours?: {
    start: string
    end: string
  }
  lastLogin?: string
  createdAt: string
  updatedAt: string
}

export interface CreateStaffRequest {
  title: string
  name: string
  gdcNumber: string
  email: string
  phone: string
  ipRestriction?: string
  role: string
  password: string
  permissions?: string[]
  loginHourRestriction?: boolean
  loginHours?: {
    start: string
    end: string
  }
}

export interface UpdateStaffRequest {
  title?: string
  name?: string
  gdcNumber?: string
  email?: string
  phone?: string
  ipRestriction?: string
  role?: string
  permissions?: string[]
  permissionLevel?: number
  loginHourRestriction?: boolean
  loginHours?: {
    start: string
    end: string
  }
}