import express from "express";
import { loginAdmin, getAllTeams, markQualified, exportCSV, sendCertificate } from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/teams", protectAdmin, getAllTeams);
router.put("/qualify/:id", protectAdmin, markQualified);
router.get("/export/csv", protectAdmin, exportCSV);
router.post("/certificate/:id", protectAdmin, sendCertificate);

export default router;
