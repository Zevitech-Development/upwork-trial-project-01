"use client"

import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Eye, EyeOff, Clock } from "lucide-react"
import type { StaffFormData } from "@/interfaces/staff-form-interfaces"
import { ROLES } from "@/constants/staff-data"

interface StaffInfoCardProps {
  formData: StaffFormData
  errors: Record<string, string>
  onInputChange: (field: keyof StaffFormData, value: string | boolean) => void
}

const StaffInfoCard: React.FC<StaffInfoCardProps> = ({ formData, errors, onInputChange }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Staff Information
        </CardTitle>
        <CardDescription>Enter the basic information for the staff member</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Dr., Mr., Ms., etc."
              value={formData.title}
              onChange={(e) => onInputChange("title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gdcNumber">GDC Number</Label>
            <Input
              id="gdcNumber"
              placeholder="General Dental Council number"
              value={formData.gdcNumber}
              onChange={(e) => onInputChange("gdcNumber", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => onInputChange("phone", e.target.value)}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="ipRestriction">IP Restriction</Label>
            <Input
              id="ipRestriction"
              placeholder="e.g., 192.168.1.0/24"
              value={formData.ipRestriction}
              onChange={(e) => onInputChange("ipRestriction", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Optional: Restrict access to specific IP addresses
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role *</Label>
          <Select value={formData.role} onValueChange={(value) => onInputChange("role", value)}>
            <SelectTrigger className={errors.role ? "border-red-500" : ""}>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password || ""}
                onChange={(e) => onInputChange("password", e.target.value)}
                className={errors.password ? "border-red-500" : ""}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={formData.confirmPassword || ""}
                onChange={(e) => onInputChange("confirmPassword", e.target.value)}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>
        </div>

        {/* Login Hour Restrictions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="loginHourRestriction"
              checked={formData.loginHourRestriction || false}
              onChange={(e) => onInputChange("loginHourRestriction", e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <Label htmlFor="loginHourRestriction" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Enable login hour restrictions
            </Label>
          </div>
          
          {formData.loginHourRestriction && (
            <div className="grid grid-cols-2 gap-4 pl-6">
              <div className="space-y-2">
                <Label htmlFor="loginStartHour">Start Time</Label>
                <Input
                  id="loginStartHour"
                  type="time"
                  value={formData.loginStartHour || "09:00"}
                  onChange={(e) => onInputChange("loginStartHour", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loginEndHour">End Time</Label>
                <Input
                  id="loginEndHour"
                  type="time"
                  value={formData.loginEndHour || "17:00"}
                  onChange={(e) => onInputChange("loginEndHour", e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default StaffInfoCard