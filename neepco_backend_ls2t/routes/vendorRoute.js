import {Router} from "express";
const vendor=Router()
import { addVendor, getAllVendors, getVendorByGstIn, updateVendor } from "../controllers/vendorController.js";

vendor.post("/addVendor",addVendor);
vendor.get("/allVendors",getAllVendors);
vendor.put("/updateVendor/:id",updateVendor);
vendor.get("/vendorbyGst",getVendorByGstIn);

export default vendor;