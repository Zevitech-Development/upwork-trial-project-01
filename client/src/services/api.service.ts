import type { StaffFormData, ApiResponse, StaffMember, CreateStaffRequest, UpdateStaffRequest } from "@/interfaces/staff-form-interfaces"

// Add these missing interfaces


class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  async createStaff(staffData: StaffFormData): Promise<ApiResponse<StaffMember>> {
    const payload: CreateStaffRequest = {
      title: staffData.title,
      name: staffData.name,
      gdcNumber: staffData.gdcNumber,
      email: staffData.email,
      phone: staffData.phone,
      ipRestriction: staffData.ipRestriction,
      role: staffData.role,
      password: staffData.password!,
      loginHourRestriction: staffData.loginHourRestriction || false,
      loginHours: staffData.loginHourRestriction ? {
        start: staffData.loginStartHour || '09:00',
        end: staffData.loginEndHour || '17:00'
      } : undefined
    }

    return this.request<StaffMember>('/api/staff', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }

  async getAllStaff(): Promise<ApiResponse<StaffMember[]>> {
    return this.request<StaffMember[]>('/api/staff')
  }

  async getStaffById(id: string): Promise<ApiResponse<StaffMember>> {
    return this.request<StaffMember>(`/api/staff/${id}`)
  }

  async updateStaff(id: string, staffData: UpdateStaffRequest): Promise<ApiResponse<StaffMember>> {
    return this.request<StaffMember>(`/api/staff/${id}`, {
      method: 'PUT',
      body: JSON.stringify(staffData),
    })
  }

  async deleteStaff(id: string): Promise<ApiResponse<null>> {
    return this.request<null>(`/api/staff/${id}`, {
      method: 'DELETE',
    })
  }

  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request<{ status: string; timestamp: string }>('/health')
  }
}

export const apiService = new ApiService()