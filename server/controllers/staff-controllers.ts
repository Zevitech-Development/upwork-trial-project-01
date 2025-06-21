import { Request, Response } from "express";

import { StaffServices } from "../services/staff-services";

import {
  SuccessResponseHandler,
  ErrorResponseHandler,
} from "../utils/response-handler";
import {
  CreateStaffValidator,
  UpdateStaffValidator,
} from "../validators/form-validator";

// CREATE STAFF FUNCTION
export const CreateStaffFunction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { error, value } = CreateStaffValidator.validate(req.body);
    if (error) {
      res
        .status(400)
        .json(
          ErrorResponseHandler("Validation failed", error.details[0].message)
        );
      return;
    }

    const emailExists = await StaffServices.emailExists(value.email);
    if (emailExists) {
      res.status(409).json(ErrorResponseHandler("Email already exists"));
      return;
    }

    const newStaff = await StaffServices.create(value);
    console.log(`Welcome email sent to: ${newStaff.email}`);

    res
      .status(201)
      .json(
        SuccessResponseHandler(newStaff, "Staff member created successfully")
      );
  } catch (error) {
    console.error("Create staff error:", error);
    res.status(500).json(ErrorResponseHandler("Internal server error"));
  }
};

// GET ALL STAFF FUNCTION
export const GetAllStaffFunction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const staff = await StaffServices.findAll();
    res.json(
      SuccessResponseHandler(staff, "Staff members retrieved successfully")
    );
  } catch (error) {
    console.error("Get all staff error:", error);
    res.status(500).json(ErrorResponseHandler("Internal server error"));
  }
};

// GET STAFF BY ID FUNCTION
export const GetStaffByIdFunction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const staff = await StaffServices.findById(id);

    if (!staff) {
      res.status(404).json(ErrorResponseHandler("Staff member not found"));
      return;
    }

    res.json(
      SuccessResponseHandler(staff, "Staff member retrieved successfully")
    );
  } catch (error) {
    console.error("Get staff by ID error:", error);
    res.status(500).json(ErrorResponseHandler("Internal server error"));
  }
};

// UPDATE STAFF FUNCTION
export const UpdateStaffFunction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { error, value } = UpdateStaffValidator.validate(req.body);
    if (error) {
      res
        .status(400)
        .json(
          ErrorResponseHandler("Validation failed", error.details[0].message)
        );
      return;
    }

    if (value.email) {
      const emailExists = await StaffServices.emailExists(value.email, id);
      if (emailExists) {
        res.status(409).json(ErrorResponseHandler("Email already exists"));
        return;
      }
    }

    const updatedStaff = await StaffServices.update(id, value);

    if (!updatedStaff) {
      res.status(404).json(ErrorResponseHandler("Staff member not found"));
      return;
    }

    res.json(
      SuccessResponseHandler(updatedStaff, "Staff member updated successfully")
    );
  } catch (error) {
    console.error("Update staff error:", error);
    res.status(500).json(ErrorResponseHandler("Internal server error"));
  }
};

// DELETE STAFF FUNCTION
export const DeleteStaffFunction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await StaffServices.delete(id);

    if (!deleted) {
      res.status(404).json(ErrorResponseHandler("Staff member not found"));
      return;
    }

    res.json(SuccessResponseHandler(null, "Staff member deleted successfully"));
  } catch (error) {
    console.error("Delete staff error:", error);
    res.status(500).json(ErrorResponseHandler("Internal server error"));
  }
};
