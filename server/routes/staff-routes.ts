import { Router } from "express";

import {
  CreateStaffFunction,
  GetAllStaffFunction,
  GetStaffByIdFunction,
  UpdateStaffFunction,
  DeleteStaffFunction,
} from "../controllers/staff-controllers";

const StaffRouter = Router();

StaffRouter.post("/", CreateStaffFunction);
StaffRouter.get("/", GetAllStaffFunction);
StaffRouter.get("/:id", GetStaffByIdFunction);
StaffRouter.put("/:id", UpdateStaffFunction);
StaffRouter.delete("/:id", DeleteStaffFunction);

export default StaffRouter;
