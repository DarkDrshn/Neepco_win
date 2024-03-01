import  db  from "../config/connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginAdmin = (req, res) => {

    // const auth = req.headers.authorization;
    // const token = auth.split(" ")[1];
    // const token = req.cookies.accessToken;
    // console.log(req.userInfo);
    
    // if(token) return res.status(406).json("Already Logged in !!");
    const q = "SELECT * FROM org_admin WHERE email_id = ?";
    console.log(req.body);
    
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        
        if (data.length == 0) return res.status(404).json("hye is Not Registered..!!");

        const checkPassword = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!checkPassword)
            return res.status(400).json("Wrong Password!");


        const { password, ...others } = data[0];
        others["role"]="admin";
        
        const token = jwt.sign({ 
            id: data[0].id,
            name: data[0].name,
            state_zone: data[0].state_zone,
            department: data[0].department,
            email_id: data[0].email_id,
            is_super: data[0].is_super,
            role: "admin",          
         }, "secretkey");
        // const token = jwt.sign({ id: data[0].id }, "secretkey");
        res
        .status(200)
        .json({
            others,"accessToken":token
        });
    });
};

export const loginSuperAdmin = (req, res) => {

    // const auth = req.headers.authorization;
    // const token = auth.split(" ")[1];
    // const token = req.cookies.accessToken;
    // console.log(req.userInfo);
    
    // if(token) return res.status(406).json("Already Logged in !!");
    const q = "SELECT * FROM org_admin WHERE email_id = ?";
    console.log(req.body);
    
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        
        if (data.length == 0) return res.status(404).json("hye is Not Registered..!!");

        const checkPassword = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!checkPassword)
            return res.status(400).json("Wrong Password!");


        const { password, ...others } = data[0];
        others["role"]="admin";
        
        const token = jwt.sign({ 
            id: data[0].id,
            name: data[0].name,
            state_zone: data[0].state_zone,
            department: data[0].department,
            email_id: data[0].email_id,
            is_super: data[0].is_super,
            role: "admin",          
         }, "secretkey");
        // const token = jwt.sign({ id: data[0].id }, "secretkey");
        res
        .status(200)
        .json({
            others,"accessToken":token
        });
    });
};

export const loginEmp = (req, res) => {
    // const token = req.cookies.accessToken;
    // console.log(token);
    // if(token) return res.status(406).json("Already Logged in !!");
    
    const q = "SELECT * FROM org_emp WHERE email_id = ?";
    console.log(req.body);
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("Email is Not Registered..!!");

        const checkPassword = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!checkPassword)
            return res.status(400).json("Wrong Password!");

        // const token = jwt.sign({ id: data[0].id }, "secretkey");
        
        const { password, ...others } = data[0];
        others["role"]="emp";
        
        const token = jwt.sign({ 
            id:data[0].id,
            name: data[0].name,
            designation: data[0].designation,
            email_id: data[0].email_id,
            phone_no: data[0].phone_no,
            org_id: data[0].id,
            GSTIN: data[0].GSTIN,
            buyer_ryts: data[0].buyer_ryts,
            consignee_ryts: data[0].consignee_ryts,
            pao_ryts: data[0].pao_ryts,
            role:"emp",
         }, "secretkey");
         res
         .status(200)
         .json({
             others,"accessToken":token
         });
    });
};


export const logout = (req, res) => {
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out.");
};