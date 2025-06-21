"use client"

import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Code, Eye, EyeOff } from "lucide-react"
import type { StaffFormData } from "@/interfaces/staff-form-interfaces"

interface ApiPreviewProps {
  formData: StaffFormData
  selectedPermissions: string[]
  permissionLevel: number
}

const ApiPreview: React.FC<ApiPreviewProps> = ({ formData, selectedPermissions, permissionLevel }) => {
  const [showApiDetails, setShowApiDetails] = useState(false)

  const generateApiCall = () => {
    const method = "POST"
    const endpoint = "/api/staff"
    
    const payload = {
      title: formData.title,
      name: formData.name,
      gdcNumber: formData.gdcNumber,
      email: formData.email,
      phone: formData.phone,
      ipRestriction: formData.ipRestriction,
      role: formData.role,
      permissionLevel,
      permissions: selectedPermissions
    }

    return { method, endpoint, payload }
  }

  const apiCall = generateApiCall()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            <CardTitle>API Preview</CardTitle>
          </div>
          <button
            onClick={() => setShowApiDetails(!showApiDetails)}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            {showApiDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <CardDescription>API call that will be made on submit</CardDescription>
      </CardHeader>
      
      <CardContent>
        {showApiDetails ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs rounded font-mono bg-green-100 text-green-800">
                {apiCall.method}
              </span>
              <code className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                {apiCall.endpoint}
              </code>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Payload:</h4>
              <pre className="text-xs bg-gray-50 p-3 rounded-lg overflow-x-auto border max-h-64 overflow-y-auto">
                {JSON.stringify(apiCall.payload, null, 2)}
              </pre>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <Code className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Click the eye icon to view API details</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ApiPreview