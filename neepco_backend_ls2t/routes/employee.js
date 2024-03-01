import express from "express";
import { getAll,getOne,updateOne,updateOwn,changePassword } from "../controllers/employee.js";

const router = express.Router();

router.post("/getall", getAll);
router.post("/getone", getOne);
router.post("/updateOne",updateOne);
router.post("/updateOwn", updateOwn);
router.post("/changePassword", changePassword);



export default router;