import mongoose from "mongoose";

import { StaffModel } from "../models/staff-schema";

import {
  CreateStaffInterface,
  StaffResponseInterface,
  UpdateStaffInterface,
} from "../interfaces/staff-services-interface";
import { IStaffDocument } from "../interfaces/models-interface";

import { ROLE_PERMISSION_CONST } from "../constants/role-permission-const";

export class StaffServices {
  static async create(
    staffData: CreateStaffInterface
  ): Promise<StaffResponseInterface> {
    const rolePermissions = ROLE_PERMISSION_CONST[staffData.role];

    const newStaff = new StaffModel({
      ...staffData,
      permissionLevel: rolePermissions.level,
      permissions: staffData.permissions || rolePermissions.permissions,
      loginHourRestriction: staffData.loginHourRestriction || false,
    });

    const savedStaff = await newStaff.save();
    return this.toResponse(savedStaff);
  }

  static async findAll(): Promise<StaffResponseInterface[]> {
    const staff = await StaffModel.find({}).sort({ createdAt: -1 });
    return staff.map(this.toResponse);
  }

  static async findById(id: string): Promise<StaffResponseInterface | null> {
    const staff = await StaffModel.findById(id);
    return staff ? this.toResponse(staff) : null;
  }

  static async findByEmail(email: string): Promise<IStaffDocument | null> {
    return StaffModel.findOne({ email: email.toLowerCase() });
  }

  static async update(
    id: string,
    updateData: UpdateStaffInterface
  ): Promise<StaffResponseInterface | null> {
    const staff = await StaffModel.findById(id);
    if (!staff) return null;

    if (updateData.role && updateData.role !== staff.role) {
      const rolePermissions = ROLE_PERMISSION_CONST[updateData.role];
      updateData.permissionLevel = rolePermissions.level;
      if (!updateData.permissions) {
        updateData.permissions = rolePermissions.permissions;
      }
    }

    const updatedStaff = await StaffModel.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    return updatedStaff ? this.toResponse(updatedStaff) : null;
  }

  static async delete(id: string): Promise<boolean> {
    const result = await StaffModel.findByIdAndDelete(id);
    return !!result;
  }

  static async emailExists(
    email: string,
    excludeId?: string
  ): Promise<boolean> {
    const query: any = { email: email.toLowerCase() };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const staff = await StaffModel.findOne(query);
    return !!staff;
  }

  static async updateLastLogin(id: string): Promise<void> {
    await StaffModel.findByIdAndUpdate(id, { lastLogin: new Date() });
  }

  private static toResponse(staff: IStaffDocument): StaffResponseInterface {
    return {
      id: (staff._id as mongoose.Types.ObjectId).toString(),
      title: staff.title,
      name: staff.name,
      gdcNumber: staff.gdcNumber,
      email: staff.email,
      phone: staff.phone,
      ipRestriction: staff.ipRestriction,
      role: staff.role,
      permissionLevel: staff.permissionLevel,
      permissions: staff.permissions,
      loginHourRestriction: staff.loginHourRestriction,
      loginHours: staff.loginHours,
      lastLogin: staff.lastLogin,
      createdAt: staff.createdAt,
      updatedAt: staff.updatedAt,
    };
  }
}
