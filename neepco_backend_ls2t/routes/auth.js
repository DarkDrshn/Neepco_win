import express from "express";
import { loginAdmin, loginEmp, logout, loginSuperAdmin } from "../controllers/auth.js";

const router = express.Router();

router.post("/loginSuperAdmin", loginSuperAdmin);
router.post("/loginAdmin", loginAdmin);
router.post("/loginEmp", loginEmp);
router.post("/logout",logout);


export default router;