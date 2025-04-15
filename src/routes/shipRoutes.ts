import { Router } from "express";
import {
  getStatus,
  getRepairBay,
  postTeapot,
  getPhaseChange
} from "../controllers/shipController";

const router: Router = Router();

router.get("/status", getStatus);
router.get("/repair-bay", getRepairBay);
router.post("/teapot", postTeapot);
router.get("/phase-change-diagram", getPhaseChange);

export default router;
