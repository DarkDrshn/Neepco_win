import db from "../config/connect.js";
import jwt from "jsonwebtoken";

export const addVendor=(req,res,err)=>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const user_id=req.query.userId;

        const company_name=req.body.company_name;
        const email=req.body.email;
        const contact=req.body.contact;
        const address=req.body.address;
        const registration_no=req.body.registration_no;
        const social_category=req.body.social_category;
        const mse_gender=req.body.mse_gender;
        const type=req.body.type;
        const GSTIN=req.body.GSTIN;
        const is_mse=req.body.is_mse;
        // console.log(email);

        let query="INSERT INTO vendor_info (cmpny_name,email,contact,address,registration_no,social_category,mse_gender,GSTIN,type,is_mse)VALUES(?,?,?,?,?,?,?,?,?,?)";
        db.query(query,[company_name,email,contact,address,registration_no,social_category,mse_gender,GSTIN,type,is_mse],(err,data)=>{
            if(err){
                return res.status(500).json({
                    status:false,
                    message:err
                })
            }else{
                return res.status(201).json({
                    status:true,
                    message:"Data inserted successfully"
                })
            }
        })
    });
}

export const updateVendor=(req,res,err)=>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const id=req.params.id;
        const company_name=req.body.company_name;
        const email=req.body.email;
        const contact=req.body.contact;
        const address=req.body.address;
        const registration_no=req.body.registration_no;
        const social_category=req.body.social_category;
        const mse_gender=req.body.mse_gender;
        const type=req.body.type;
        const GSTIN=req.body.GSTIN;
        const ratings=req.body.ratings;

        let query="UPDATE vendor_info set cmpny_name=?,email=?,contact=?,address=?,registration_no=?,social_category=?,mse_gender=?,type=?,GSTIN=?,ratings=? where id=?";
        db.query(query,[company_name,email,contact,address,registration_no,social_category,mse_gender,type,GSTIN,ratings,id],(err,result)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    message:"An Error Occured, Please try again later"
                })
            }else{
                return res.status(201).json({
                    success:true,
                    message:"Data updated successfully",
                })
            }
        });
    });
}

export const getAllVendors=(req,res,err)=>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        //const user_id=req.query.userId;

        const org_id=1;
        let query="SELECT cmpny_name,email,contact,address,registration_no,social_category,mse_gender,type,GSTIN,ratings,count_prev_procure from vendor_info where org_id=?";
        db.query(query,[org_id],(err,data)=>{
            if(err){
                return res.status(501).json({
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
    })
}

export const getVendorByGstIn=(req,res)=>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        if(userInfo.role=="admin"){
            return res.status(401).json({
                success:false,
                message:"Unauthorised access"
            })
        }
        console.log(req.body)
        const gst_in=req.body.gst_in;
        console.log(userInfo)
        let query=`select * from vendor_info where GSTIN=? and org_id=${userInfo.org_id} `;
        db.query(query,[gst_in],(err,data)=>{
            if(err){
                return res.status(502).json({
                    success:false,
                    err,
                })
            }
            console.log(data)
            return res.status(201).json({
                success:true,
                data
            })
        })
    })
    

}