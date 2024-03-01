import {Router} from "express";
const procure=Router()
import {CPP_fetch_new, GeM_fetch_new} from "../utils/apifetch.js"
import {addProcurement, cancelProcurement, getAllProcurements, getCategories, getProcurementById, updateProcurementByConsignee, updateProcurementByPAO} from "../controllers/procureContoller.js"

procure.get("/fetchGeM",GeM_fetch_new)
procure.get("/fetchCPP",CPP_fetch_new)
procure.post('/addprocure',addProcurement);
procure.get('/addprocure',getCategories);
procure.get('/allprocurements',getAllProcurements);
procure.get("/getProcurement/:id",getProcurementById);
procure.put("/updateprocureCN/:id",updateProcurementByConsignee);
procure.put("/updateprocurePAO/:id",updateProcurementByPAO);
procure.put("/cancelProcurement/:id",cancelProcurement)

export default procure;