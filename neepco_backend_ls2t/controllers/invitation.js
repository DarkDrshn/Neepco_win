import  db  from "../config/connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import adminMailer from '../mail/inviteOrg.js';
import empMailer from '../mail/inviteEmp.js';
import passwordGenerator from 'generate-password';


function validateEmail(email) {
    var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

export const invitationToAdmin = (req,res) => {

    // const token = req.cookies.accessToken;
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        
        // db.query("SELECT * FROM org_admin WHERE id=?",[userInfo.id], (err,data) => {
        //     if (err) return res.status(500).json(err);
        //     if(data.length==1) return res.status(401).json(" Not Authorized to Invite");
        // });
        if(userInfo.role=="emp" || userInfo.is_super==0) return res.status(401).json({
            success:false,
            message:"You are not Authorized !!"
        });

        
        console.log(req.body);
        if(req.body.email == "") return res.status(409).json("Please Enter a Email ID !!!");

        if(validateEmail(req.body.email)){
            const q1="SELECT department FROM org_admin WHERE email_id = ?";

            db.query(q1, [req.body.email], (err,data) => {
                console.log(data);
                if(err){
                    console.log(err);
                    return res.status(500).json(err);
                }
                else if(data.length){ 
                    return res.status(409).json(`Email has been already Registered by ${data[0].department} Department !!!`);
                }
                else{
                    const hashedPass = passwordGenerator.generate({
                        length: 16,
                        numbers: true,
                        symbols: false,
                        lowercase:true,
                        uppercase: true,
                        strict:true,
                        excludeSimilarCharacters:true,// "1lIOo0", //read karne confusion nahi hoga
                    })
                    // console.log(hashedPass)
                    const salt = bcrypt.genSaltSync(10);
                    const hashedPassword = bcrypt.hashSync(hashedPass, salt);
                    adminMailer(req.body.email, hashedPass);

                    const q = `INSERT INTO org_admin (name, state_zone, department, email_id, password) VALUES (?, ?, ?, ?, ?)`;
                    db.query(q, [req.body.name, req.body.state_zone, req.body.department, req.body.email, hashedPassword], (err,data) => {
                        if (err){
                            console.log(err);
                            return res.status(500).json('Cannot Add in Database');
                        }
                        return res.status(200).send({ "message": "Organisation Registered!!" });
                    });  
                }
            });
 
        }
        else{
            return res.status(409).json("Please Enter a Valid Email ID !!!");
        }
    });
}


export const invitationToEmp = (req,res) => {


    console.log('inside invitation to employee');
    // const token = req.cookies.accessToken;
    // const token = localStorage.getItem('accessToken');

    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token)
      return res
        .status(400)
        .json({ status: false, message: "you are not authorized" });

    // if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        if(userInfo.role=="emp") return res.status(401).json({
            success:false,
            message:"You are not Authorized !!"
        });

        // db.query("SELECT * FROM org_admin WHERE id=?",[userInfo.id], (err,data) => {
        //     if (err) return res.status(500).json(err);
        //     if(data.length==1) return res.status(401).json(" Not Authorized to Invite");
        // });

        
        console.log(req.body);
        if(req.body.email == "") return res.status(409).json("Please Enter a Email ID !!!");

        if(validateEmail(req.body.email)){
            const q1="SELECT department FROM org_admin WHERE id=(SELECT org_id FROM org_emp WHERE email_id=? ) ";

            db.query(q1, [req.body.email], (err,data) => {
                console.log(data);
                if(err){
                    console.log(err);
                    return res.status(500).json(err);
                }
                else if(data.length){ 
                    return res.status(409).json(`Email has been already Registered by ${data[0].department} Department !!!`);
                }
                else{
                    const hashedPass = passwordGenerator.generate({
                        length: 16,
                        numbers: true,
                        symbols: false,
                        lowercase:true,
                        uppercase: true,
                        strict:true,
                        excludeSimilarCharacters:true,// "1lIOo0", //read karne confusion nahi hoga
                    })
                    const salt = bcrypt.genSaltSync(10);
                    const hashedPassword = bcrypt.hashSync(hashedPass, salt);
                    empMailer(req.body.email, hashedPass);

                    const q = `INSERT INTO org_emp (name, designation, email_id, phone_no, password, org_id, GSTIN, buyer_ryts, consignee_ryts, pao_ryts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                    db.query(q, [req.body.name, req.body.designation, req.body.email, req.body.phone, hashedPassword, userInfo.id, req.body.gstin, req.body.buyer, req.body.consignee, req.body.pao], (err,data) => {
                        if (err){
                            console.log(err);
                            return res.status(500).json('Cannot Add in Database');
                        }
                        return res.status(200).send({ "message": "Employee Registered!!" });
                    });  
                }
            });
 
        }
        else{
            return res.status(409).json("Please Enter a Valid Email ID !!!");
        }
    });
};
