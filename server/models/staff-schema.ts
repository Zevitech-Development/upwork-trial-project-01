import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

import { IStaffDocument } from "../interfaces/models-interface";
import { StaffRoleEnum } from "../enums/staff-role-enum";
import { StaffPermissionEnum } from "../enums/staff-permission-enum";

const StaffSchema = new Schema<IStaffDocument>(
  {
    title: {
      type: String,
      default: "",
      maxlength: 20,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    gdcNumber: {
      type: String,
      default: "",
      maxlength: 20,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    ipRestriction: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      required: true,
      enum: Object.values(StaffRoleEnum),
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    permissionLevel: {
      type: Number,
      required: true,
      min: 0,
      max: 4,
    },

    permissions: [
      {
        type: String,
        enum: Object.values(StaffPermissionEnum),
      },
    ],

    loginHourRestriction: {
      type: Boolean,
      default: false,
    },

    loginHours: {
      start: {
        type: String,
        match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      },
      end: {
        type: String,
        match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      },
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

StaffSchema.index({ email: 1 });
StaffSchema.index({ role: 1 });

// HASH PASSWORD BEFORE SAVING
StaffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12");
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// COMPARE PASSWORD METHOD
StaffSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const StaffModel = mongoose.model<IStaffDocument>("Staff", StaffSchema);
