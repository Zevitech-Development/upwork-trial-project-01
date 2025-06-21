import type { StaffFormData } from "@/interfaces/staff-form-interfaces"

export const getPermissionLevelColor = (level: number) => {
  switch (level) {
    case 1:
      return "bg-blue-50 text-blue-700 border-blue-200"
    case 2:
      return "bg-green-50 text-green-700 border-green-200"
    case 3:
      return "bg-yellow-50 text-yellow-700 border-yellow-200"
    case 4:
      return "bg-red-50 text-red-700 border-red-200"
    default:
      return "bg-gray-50 text-gray-700 border-gray-200"
  }
}

export const validateForm = (
  formData: StaffFormData,
  setErrors: (errors: Record<string, string>) => void
): boolean => {
  const newErrors: Record<string, string> = {}
  
  if (!formData.name.trim()) newErrors.name = "Name is required"
  if (!formData.email.trim()) newErrors.email = "Email is required"
  else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
  if (!formData.phone.trim()) newErrors.phone = "Phone is required"
  if (!formData.role) newErrors.role = "Role is required"
  
  // Password validation
  if (!formData.password) newErrors.password = "Password is required"
  else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
  
  if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm password"
  else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords don't match"
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}