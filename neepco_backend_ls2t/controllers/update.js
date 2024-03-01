import  db  from "../config/connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const updatePassword = (req, res) => {
    // const token = req.cookies.accessToken;
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const user_id=userInfo.id;

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);


        if(userInfo.role=="admin"){
            db.query("UPDATE org_admin SET password=? WHERE id=?", [hashedPassword, user_id], (err, data)=>{
                if(err){
                    return res.status(500).json({
                        success:false,
                        message:err,
                    })
                }
                else{
                    return res.status(201).json({
                        success:true,
                        message:"Password Reset"
                    })
                }
            })

        }
        else{
            db.query("UPDATE org_emp SET password=? WHERE id=?", [hashedPassword, user_id], (err, data)=>{
                if(err){
                    return res.status(500).json({
                        success:false,
                        message:err,
                    });
                }
                else{
                    return res.status(201).json({
                        success:true,
                        message:"Password Reset"
                    });
                }
            })
        }
    });

};

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

export const updateProfile=(req,res)=>{

    // const token = req.cookies.accessToken;
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        if(userInfo.role=="admin") return res.status(401).json({
            success:false,
            message:"You Are Not Authorized to Update Profile"
        })
        const user_id=req.query.userId;

        let userquery="SELECT pao_ryts from org_emp where id=?";
        db.query(userquery,[user_id],(error,user)=>{
            if(error){
                return res.status(500).json({
                    message:"user doesn't exists"
                })
            }else {
                if(user[0].pao_ryts==1){
                    let query="UPDATE procurement_details set pao_id=?, payment_status=?, payment_invoice=?, payment_method=?, transaction_id=?,invoice_doc=? where id=?";
                    db.query(query,[user_id,payment_status,payment_invoice,payment_method,transaction_id,invoice_doc,procure_id],(err,data)=>{
                        
                    })
                }
            }
        })
    });
}

