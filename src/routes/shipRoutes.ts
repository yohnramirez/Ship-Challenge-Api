import { Router } from "express";
import {
  getStatus,
  getRepairBay,
  postTeapot,
} from "../controllers/shipController";

const router = Router();

router.get("/status", getStatus);
router.get("/repair-bay", getRepairBay);
router.post("/teapot", postTeapot);

export default router;
