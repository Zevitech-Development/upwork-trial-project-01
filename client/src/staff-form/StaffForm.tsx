"use client"

import React, { useEffect, useState } from "react"
import { UserPlus, Save, Loader2, CheckCircle, XCircle } from "lucide-react"
import type { StaffFormData } from "@/interfaces/staff-form-interfaces"
import { getPermissionLevelColor, validateForm } from "@/utils/permissions"
import StaffInfoCard from "@/components/StaffInfoCard"
import PermissionCard from "@/components/PermissionCard"
import { Button } from "@/components/ui/button"
import { ROLE_PERMISSIONS, type Role } from "@/constants/staff-data"
import { cn } from "@/lib/utils"
import ApiPreview from "@/components/ApiPreview"
import { useStaff } from "@/hooks/useStaff"

const MessageAlert: React.FC<{
  type: 'success' | 'error'
  message: string
  onClose: () => void
}> = ({ type, message, onClose }) => {
  return (
    <div className={`flex items-center gap-2 p-4 rounded-lg border mb-6 ${
      type === 'success' 
        ? 'bg-green-50 border-green-200 text-green-800' 
        : 'bg-red-50 border-red-200 text-red-800'
    }`}>
      {type === 'success' ? (
        <CheckCircle className="h-5 w-5 text-green-600" />
      ) : (
        <XCircle className="h-5 w-5 text-red-600" />
      )}
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
    </div>
  )
}

export default function StaffForm() {
  const { createStaff, loading, error, success, clearMessages } = useStaff()
  
  const [formData, setFormData] = useState<StaffFormData>({
    title: "",
    name: "",
    gdcNumber: "",
    email: "",
    phone: "",
    ipRestriction: "",
    role: "",
    password: "",
    confirmPassword: "",
    loginHourRestriction: false,
    loginStartHour: "09:00",
    loginEndHour: "17:00",
  })

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [permissionLevel, setPermissionLevel] = useState<number>(0)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (formData.role && formData.role in ROLE_PERMISSIONS) {
      const rolePerms = ROLE_PERMISSIONS[formData.role as Role];
      setPermissionLevel(rolePerms.level);
      setSelectedPermissions(rolePerms.permissions);
    } else {
      setPermissionLevel(0);
      setSelectedPermissions([]);
    }
  }, [formData.role]);

  const handleInputChange = (field: keyof StaffFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    )
  }

  const resetForm = () => {
    setFormData({
      title: "",
      name: "",
      gdcNumber: "",
      email: "",
      phone: "",
      ipRestriction: "",
      role: "",
      password: "",
      confirmPassword: "",
      loginHourRestriction: false,
      loginStartHour: "09:00",
      loginEndHour: "17:00",
    })
    setSelectedPermissions([])
    setPermissionLevel(0)
    setErrors({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm(formData, setErrors)) {
      const success = await createStaff(formData)
      if (success) {
        resetForm()
        setTimeout(() => clearMessages(), 5000)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Modern Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <UserPlus className="h-6 w-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          </div>
          <p className="text-gray-600">Add or edit staff members and configure their access permissions</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <MessageAlert
            type="success"
            message={success}
            onClose={clearMessages}
          />
        )}

        {error && (
          <MessageAlert
            type="error"
            message={error}
            onClose={clearMessages}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Main Form (2/3 width) */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <StaffInfoCard
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  variant="default"
                  disabled={loading}
                  className={cn(
                    "flex items-center gap-2",
                    "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200",
                    loading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {loading ? "Creating..." : "Save Staff Member"}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Side - Permissions & API (1/3 width) */}
          <div className="space-y-6">
            <PermissionCard
              formData={formData}
              selectedPermissions={selectedPermissions}
              permissionLevel={permissionLevel}
              onPermissionToggle={handlePermissionToggle}
              getPermissionLevelColor={getPermissionLevelColor}
            />

            <ApiPreview
              formData={formData}
              selectedPermissions={selectedPermissions}
              permissionLevel={permissionLevel}
            />
          </div>
        </div>
      </div>
    </div>
  )
}