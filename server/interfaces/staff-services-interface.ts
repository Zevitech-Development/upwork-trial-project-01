import { StaffRoleEnum } from "../enums/staff-role-enum";

export interface StaffMemberInterface {
  id: string;
  title: string;
  name: string;
  gdcNumber: string;
  email: string;
  phone: string;
  ipRestriction?: string;
  role: StaffRoleEnum;
  password: string;
  permissionLevel: number;
  permissions: string[];
  loginHourRestriction: boolean;
  loginHours?: {
    start: string;
    end: string;
  };
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStaffInterface {
  title: string;
  name: string;
  gdcNumber: string;
  email: string;
  phone: string;
  ipRestriction?: string;
  role: StaffRoleEnum;
  password: string;
  permissions?: string[];
  loginHourRestriction?: boolean;
  loginHours?: {
    start: string;
    end: string;
  };
}

export interface UpdateStaffInterface {
  title?: string;
  name?: string;
  gdcNumber?: string;
  email?: string;
  phone?: string;
  ipRestriction?: string;
  role?: StaffRoleEnum;
  permissions?: string[];
  permissionLevel?: number;
  loginHourRestriction?: boolean;
  loginHours?: {
    start: string;
    end: string;
  };
}

export interface StaffResponseInterface {
  id: string;
  title: string;
  name: string;
  gdcNumber: string;
  email: string;
  phone: string;
  ipRestriction?: string;
  role: StaffRoleEnum;
  permissionLevel: number;
  permissions: string[];
  loginHourRestriction: boolean;
  loginHours?: {
    start: string;
    end: string;
  };
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
