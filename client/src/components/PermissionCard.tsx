"use client"

import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Shield } from "lucide-react"
import type { Permission, StaffFormData } from "@/interfaces/staff-form-interfaces"
import { PERMISSIONS } from "@/constants/staff-data"

interface PermissionCardProps {
  formData: StaffFormData
  selectedPermissions: string[]
  permissionLevel: number
  onPermissionToggle: (id: string) => void
  getPermissionLevelColor: (level: number) => string
}

const PermissionCard: React.FC<PermissionCardProps> = ({
  formData,
  selectedPermissions,
  permissionLevel,
  onPermissionToggle,
  getPermissionLevelColor,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Permission Management
        </CardTitle>
        <CardDescription>Configure access permissions based on the selected role</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {formData.role ? (
          <>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Permission Level:</span>
              <span className={`px-3 py-1 text-xs rounded-full border font-medium ${getPermissionLevelColor(permissionLevel)}`}>
                Level {permissionLevel}
              </span>
              <span className="text-sm text-muted-foreground">({formData.role})</span>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Granular Permissions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PERMISSIONS.map((permission: Permission) => (
                  <div key={permission.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                    <Checkbox
                      id={permission.id}
                      checked={selectedPermissions.includes(permission.id)}
                      onCheckedChange={() => onPermissionToggle(permission.id)}
                    />
                    <div className="space-y-1">
                      <Label htmlFor={permission.id} className="text-sm font-medium cursor-pointer">
                        {permission.label}
                      </Label>
                      <p className="text-xs text-muted-foreground">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Shield className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Select a role to configure permissions</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PermissionCard
