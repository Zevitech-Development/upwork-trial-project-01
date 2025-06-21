import { Document } from "mongoose";

import { StaffRoleEnum } from "../enums/staff-role-enum";

export interface IStaffDocument extends Document {
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
  comparePassword(candidatePassword: string): Promise<boolean>;
}
