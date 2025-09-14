import express from "express";
import { registerTeam, verifyOTP, getTeamStatus } from "../controllers/teamController.js";

const router = express.Router();

router.post("/register", registerTeam);
router.post("/verify", verifyOTP);
router.get("/status/:id", getTeamStatus);

export default router;
