import { readdirSync } from "fs";
import db from "../config/connect.js"
import jwt from "jsonwebtoken";


export const addProcurement=async(req,res,err)=>{

    // const userId = req.query.userId;
    // const token = req.cookies.accessToken;

    const auth = req.headers.authorization;
    console.log(auth);
    const token = auth.split(" ")[1];

    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        db.query("SELECT * FROM org_emp where id=?",[userInfo.id], (err,data) =>{
            if (err) return res.status(500).json(err);
            if(data.length==0 || data[0].buyer_ryts != 1) return res.status(401).json("You Don't Have Rights of Buyer !!");
        });

        db.query("select * from procurement_details where portal_id=?", [req.body.portal_id], (err, data) => {
            if (err) return res.status(500).json(err);
            if(data.length!=0) return res.status(409).json("Procurement Already exists on Portal !!");
        })
    
        const org_id=userInfo.org_id;
        const buyer_id=userInfo.id;
        const product=req.body.product;
        const type=req.body.type;
        const category=req.body.category;
        const description=req.body.description;
        const quantity=req.body.quantity;
        const unit=req.body.unit;
        const amount=req.body.amount;
        const prj=req.body.project;
        const portal=req.body.portal;
        const portal_id=req.body.portal_id
        let vendor_id=null;

        // Add Vendor Data 
        const comp=req.body.comp_name;
        const ph_no=req.body.contact_no;
        const email_id=req.body.email_id;
        const address=req.body.address;
        const regis_no=req.body.registration_no;
        const social_category=req.body.social_category;
        const gender=req.body.gender;
        const gst_in=req.body.GST_in;
        const start_date=req.body.start_date;
        const end_date=req.body.end_date;

        let query="SELECT id,GSTIN,count_prev_procure from vendor_info where GSTIN=?";
        db.query(query,[gst_in],(error,data)=>{
            if(error){
                return res.status(500).json({
                    message:error,
                })
            }
            else if(data.length==0 || gst_in==0){
                let insertVendor="INSERT INTO vendor_info (cmpny_name,email,contact,address,registration_no,social_category,mse_gender,GSTIN,type,count_prev_procure) VALUES(?,?,?,?,?,?,?,?,?,?)";
                db.query(insertVendor,[comp,email_id,ph_no,address,regis_no,social_category,gender,gst_in,type,1],(error1,result)=>{
                    if(error1){
                        return res.status(502).json({
                            message:error1,
                        })
                        // throw err;
                    }
                    else{
                        vendor_id=result.insertId;
                        console.log(vendor_id)
                        //Add Procurement Data
                        insert_helper(org_id,buyer_id,vendor_id,product,type,category,description,quantity,unit,amount,prj,portal,portal_id,start_date,end_date);
                    }
                    
                })
            }else{
                vendor_id=data[0].id;
                const count_prev_procure=data[0].count_prev_procure+1;
                let updateCount="Update vendor_info set email=?,contact=?,address=? where id=?";
                db.query(updateCount,[email_id,ph_no,address,vendor_id],(error3,result)=>{
                    if(error3){
                        return res.status(501).json({
                            success:false,
                            message:"Vendor procure count couldn't be updated",
                            error3,
                        })
                    }else{
                        insert_helper(org_id,buyer_id,vendor_id,product,type,category,description,quantity,unit,amount,prj,portal,portal_id,start_date,end_date);
                    }
                })

            }
        });

        const insert_helper=(org_id,buyer_id,vendor_id,product,type,category,description,quantity,unit,amount,prj,portal,portal_id,start_date,end_date)=>{
            let insertProcure="INSERT INTO procurement_details(org_id,buyer_id,vendor_id,product,type,category,description,quantity,unit,amount,project,portal,portal_id,start_date,end_date)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            db.query(insertProcure,[org_id,buyer_id,vendor_id,product,type,category,description,quantity,unit,amount,prj,portal,portal_id,start_date,end_date],(err1,data)=>{
                if(err1){
                    console.log("hello")
                    return res.status(400).json({
                        success:true,
                        message:err1,
                    })
                }
                else{
                    if(req.body.others==true){
                        let query3="insert into categories (categoryName,type) values(?,?)";
                        db.query(query3,(error1,data)=>{
                            if(error1){
                                return res.status(502).json({
                                    success:false,
                                    "message":"Category couldn't be inserted",
                                    error1
                                })
                            }else{
                                return res.status(200).json({
                                    success:true,
                                    message:"Data Inserted",
                                    data,
                                })
                            }
                        })
                    }else{
                        return res.status(200).json({
                            success:true,
                            message:"Data Inserted",
                            data,
                        })
                    }
                }
            })
        }
    });
}
// To send all categories on addProcurement form
export const getCategories=(req,res,err)=>{
    const query="SELECT categoryName from categories";
    db.query(query,[],(error,data)=>{
        if(error){
            return res.status(502).json({
                success:false,
                message:error,
            })
        }else{
            return res.status(201).json({
                categories:data,
            })
        }
    });
};


export const getProcurementById=(req,res,err)=>{
    // const token = req.cookies.accessToken;
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        let query="select * from procurement_details where id=?";
        db.query(query,[req.params.id],(error,data)=>{
            if(error){
                res.status(502).json({
                    success:false,
                    message:"No data exists",
                    error,
                })
            }else{
                query="select * from vendor_info where id=?";
                db.query(query,[data[0].vendor_id],(error1,data1)=>{
                    if(error1){
                        res.status(502).json({
                            success:false,
                            message:"Vendor not found",
                            error1,
                        })
                    }else{
                        res.status(201).json({
                            success:true,
                            details:data,
                            vendor:data1,
                        })
                    }
                })
            }
        })

    });

}
export const updateProcurementByConsignee=(req,res,err)=>{
    // const token = req.cookies.accessToken;
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const user_id=req.query.userId;

        let userquery="SELECT consignee_ryts from org_emp where id=?";
        db.query(userquery,[user_id],(error,user)=>{
            if(error){
                return res.status(502).json({
                    message:"user doesn't exists"
                })
            }else {
                console.log(user)
                console.log(user[0].consignee_ryts)
                if(user[0].consignee_ryts==1){
                    const procure_id=req.params.id;
                    const remarks=req.body.remarks;
                    const prc_status=req.body.prc_status;
                    const crac_status=req.body.crac_status;
                    const prc_file=req.body.prc;
                    const crac_file=req.body.crac;
                    let query="UPDATE procurement_details set consignee_id=?,remarks=?, prc_status=?, crac_status=?, prc_file_path=?, crac_file_path=? where id=?";
                    db.query(query,[user_id,remarks,prc_status,crac_status,prc_file,crac_file,procure_id],(err,data)=>{
                        if(err){
                            return res.status(500).json({
                                success:false,
                                message:err,
                            })
                        }
                        else{
                            return res.status(201).json({
                                success:true,
                                message:"Data Updated By Consignee"
                            })
                        }
                    })
                }else{
                    return res.status(500).json({
                        success:false,
                        message:"Consignee Rights required"
                    })
                }
                
            }
            // console.log(user)
        })
    });
}

export const updateProcurementByPAO=(req,res,err)=>{

    // const token = req.cookies.accessToken;
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const user_id=req.query.userId;

        let userquery="SELECT pao_ryts from org_emp where id=?";
        db.query(userquery,[user_id],(error,user)=>{
            if(error){
                return res.status(500).json({
                    message:"user doesn't exists"
                })
            }else {
                if(user[0].pao_ryts==1){
                    const procure_id=req.params.id;
                    const payment_status=req.body.payment_status;
                    const payment_invoice=req.body.payment_invoice;
                    const payment_method=req.body.payment_method;
                    const transaction_id=req.body.transaction_id;
                    const invoice_doc=req.body.invoice_doc;
                    let query="UPDATE procurement_details set pao_id=?, payment_status=?, payment_invoice=?, payment_method=?, transaction_id=?,invoice_doc=? where id=?";
                    db.query(query,[user_id,payment_status,payment_invoice,payment_method,transaction_id,invoice_doc,procure_id],(err,data)=>{
                        if(err){
                            return res.status(500).json({
                                success:false,
                                message:err,
                            })
                        }
                        else{
                            if(payment_status==1){
                                query=`select vendor_id from procurement_details where id=${procure_id}`;
                                db.query(query,(err1,data1)=>{
                                    if(err1){
                                        return res.status(402).json({
                                            success:false,
                                            message:"vendor not found",
                                            err1,
                                        })
                                    }
                                    query=`Update vendor_info set count_prev_procure=count_prev_procure+1 where id=${data1[0].id}`;
                                    db.query(query,(err2,data2)=>{
                                        if(err2){
                                            return res.status(402).json({
                                                success:false,
                                                message:"Cant update vendor procurement count",
                                                err2,
                                            })
                                        }
                                        return res.status(201).json({
                                            success:true,
                                            message:"Data updated successfully",
                                            data2
                                        })
                                    })
                                })
                            }
                            return res.status(201).json({
                                success:true,
                                message:"Data Updated By PAO"
                            })
                        }
                    })
                }
            }
        })
    });
}

export const getAllProcurements=(req,res,err)=>{
    // const token = req.cookies.accessToken;
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        // const user_id=req.query.userId;
        // let org_id=1;
        // db.query("SELECT org_id FROM org_emp WHERE id=?",[userInfo.id], (err,data)=>{
        //     if (err) return res.status(500).json(err);
        //     if(data.length==0) return res.status(404).json("Not Existing");
        //     org_id=data[0].org_id;
        // });


        //let query="SELECT id,buyer_id,consignee_id,pao_id,vendor_id,product,type,category,description,quantity,unit,amount,project,remarks,prc_status,prc_file_path,crac_status,crac_file_path,payment_status,payment_invoice,payment_method,transaction_id,created_at,is_cancelled,cancellation_remark,portal,portal_id,invoice_doc,start_date,end_date,allocated_budget from procurement_details where org_id=?";
        let query="SELECT * FROM procurement_details WHERE org_id=?";
        db.query(query,[userInfo.org_id],(err,data)=>{
            if(err){
                return res.status(200).json({
                    success:false,
                    message:err,
                })
            }else{
                return res.status(201).json({
                    success:true,
                    data,
                })
            }
        })
    });
}

export const cancelProcurement=(req,res,err)=>{
    // const token = req.cookies.accessToken;
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const procure_id=req.body.id;
        const cancellation_remark=req.body.cancellation_remark;
        let query="UPDATE procurement_details set is_cancelled=?,cancellation_remark=? where id=?";
        db.query(query,[true,cancellation_remark,procure_id],(err,data)=>{
            if(err){
                return res.status(501).json({
                    success:false,
                    message:err,
                })
            }else{
                return res.status(201).json({
                    success:true,
                    message:"Procurement Cancelled Successfully",
                })
            }
        })
    });
}
