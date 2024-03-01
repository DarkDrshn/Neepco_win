import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const getOne = (req, res) => {
    // const token = req.cookies.accessToken;
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        db.query("SELECT * FROM org_emp WHERE id=? OR email_id=?;", [req.body.find, req.body.find], (err, data) =>{
            if (err) return res.status(500).json(err);
            if(data.lenghth==0) return res.status(404).json("No Employee with this Creadentials");
            const { password, ...info } = data[0];
            return res.json(info);
        })
    });
};

export const getAll = (req, res) => {
    // const token = req.cookies.accessToken;
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        db.query("SELECT * FROM org_emp WHERE org_id=? ;", [userInfo.id], (err, data) =>{
            if (err) return res.status(500).json(err);
            if(data.lenghth==0) return res.status(404).json("No Employee Registered Yett");
            const { password, ...info } = data[0];
            return res.status(200).json(info);
        })        
    });
};

export const updateOne = (req, res) => {
    // const token = req.cookies.accessToken;
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");


        db.query("UPDATE org_emp SET buyer_ryts = ?, consignee_ryts = ?, pao_ryts = ? WHERE id = ?", [req.body.buyer, req.body.consignee, req.body.pao, req.body.user_id], (err, data) =>{
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Updated!");
            return res.status(403).json("Cannot be Update Now !!");
        });        
    });
};

export const updateOwn = (req, res) => {
    // const token = req.cookies.accessToken;
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        db.query("UPDATE org_emp SET name = ?, designation = ?, phone_no=?, GSTIN=? WHERE id=?", [req.body.name, req.body.designation, req.body.phone_no, req.body.gstin, userInfo.id], (err, data) =>{
            if (err) return res.status(500).json(err);
            if(data.affectedRows>0) return res.status(200).json("Updated !!");
            return res.status(403).json("You can update only your Profile!");
            
        }) ;
        
    });
}

export const changePassword = (req, res) => {
    // const token = req.cookies.accessToken;
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");


        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        db.query("UPDATE org_emp SET password=? WHERE id=?", [hashedPassword, userInfo.id], (err, data) =>{
            if (err) return res.status(500).json(err);
            if(data.affectedRows>0) return res.status(200).json("Updated !!");
            return res.status(403).json("You can update only your Profile!");
            
        }) ;
        
    });
} 