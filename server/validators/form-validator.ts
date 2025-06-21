import Joi from "joi";

import { AVAILABLE_PERMISSION_CONST } from "../constants/available-permissions-const";
import { ROLE_PERMISSION_CONST } from "../constants/role-permission-const";

const roles = Object.keys(ROLE_PERMISSION_CONST);

export const CreateStaffValidator = Joi.object({
  title: Joi.string().allow("").max(20),
  name: Joi.string().required().min(2).max(100),
  gdcNumber: Joi.string().allow("").max(20),
  email: Joi.string().email().required(),
  phone: Joi.string().required().min(10).max(20),
  ipRestriction: Joi.string()
    .allow("")
    .pattern(/^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$/),
  role: Joi.string()
    .valid(...roles)
    .required(),
  password: Joi.string().min(6).required(),
  permissions: Joi.array().items(
    Joi.string().valid(...AVAILABLE_PERMISSION_CONST)
  ),
  loginHourRestriction: Joi.boolean().default(false),
  loginHours: Joi.object({
    start: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    end: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  }).when("loginHourRestriction", {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

export const UpdateStaffValidator = Joi.object({
  title: Joi.string().allow("").max(20),
  name: Joi.string().min(2).max(100),
  gdcNumber: Joi.string().allow("").max(20),
  email: Joi.string().email(),
  phone: Joi.string().min(10).max(20),
  ipRestriction: Joi.string()
    .allow("")
    .pattern(/^(\d{1,3}\.){3}\d{1,3}(\/\d{1,2})?$/),
  role: Joi.string().valid(...roles),
  permissions: Joi.array().items(
    Joi.string().valid(...AVAILABLE_PERMISSION_CONST)
  ),
  loginHourRestriction: Joi.boolean(),
  loginHours: Joi.object({
    start: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    end: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  }),
});
