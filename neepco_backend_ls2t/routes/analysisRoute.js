import {Router} from "express";
import { categoryAnalysis, costAnalysis, growthAnalysis, supplierAnalysis,budgetAnalysis } from "../controllers/analysisController.js";
const analysis=Router();

analysis.get("/categoryAnalysis",categoryAnalysis);
analysis.get("/growthAnalysis",growthAnalysis);
analysis.get("/costAnalysis",costAnalysis);
analysis.get("/supplierAnalysis",supplierAnalysis);
analysis.get("/budgetAnalysis",budgetAnalysis);

export default analysis;