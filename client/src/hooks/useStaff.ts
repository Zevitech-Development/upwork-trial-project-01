import { useState } from 'react'
import type { StaffFormData } from '@/interfaces/staff-form-interfaces'
import { apiService } from '@/services/api.service'

export const useStaff = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const createStaff = async (staffData: StaffFormData): Promise<boolean> => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    
    try {
      const response = await apiService.createStaff(staffData)
      if (response.success) {
        setSuccess('Staff member created successfully!')
        return true
      } else {
        setError(response.message || 'Failed to create staff')
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return false
    } finally {
      setLoading(false)
    }
  }

  const clearMessages = () => {
    setError(null)
    setSuccess(null)
  }

  return {
    loading,
    error,
    success,
    createStaff,
    clearMessages
  }
}