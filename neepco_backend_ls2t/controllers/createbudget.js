import { error } from "console";
import db from "../config/connect.js";
import exp from "constants";
import jwt from "jsonwebtoken";
export const budgetcreation = (req, res) => {
    const {
        org_id,
        desc_name,
        category,
        is_small_scale,
        source,
        quantity,
        quantity_unit,
        budget_total,
        budget_other_mse,
        budget_mse_scst_inc_entrep,
        budget_mse_scst_own_entrep,
        budget_mse_scst_women,
        year,
        gross_amt,
        net_amt,
    
    } = req.body;
    console.log(req.body);

    // budget division as per the rule

    // const mse_avail_budget=0.25*total_budget;
    // const mse_scst_avail_budget=0.04*mse_avail_budget;
    // const not_mse_avail_budget=0.03*mse_avail_budget;
    const sql = "INSERT INTO budget_table(org_id,desc_name,category,is_small_scale, source,quantity,quantity_unit,budget_total,budget_other_mse,budget_mse_scst_inc_entrep,budget_mse_scst_own_entrep,budget_mse_scst_women,year,gross_amt,net_amt) VALUES ?";
    const values = [
        [org_id,desc_name, category,is_small_scale,source,quantity,quantity_unit,budget_total,budget_other_mse,budget_mse_scst_inc_entrep,budget_mse_scst_own_entrep,budget_mse_scst_women ,year,gross_amt, net_amt]
    ]
    db.query(sql, [values], (error, result) => {
        if (error) {
            console.error("Error Creating budget", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.status(201).json({ message: "Budget created successfully" });
        }
    });
};






export const updatebudget = (req, res) => {
    const {
        org_id,
        desc_name,
        category,
        is_small_scale,
        source,
        quantity,
        quantity_unit,
        budget_total,
        budget_other_mse,
        budget_mse_scst_inc_entrep,
        budget_mse_scst_own_entrep,
        budget_mse_scst_women,
        year,
        gross_amt,
        net_amt,
    
    } = req.body;

    // Budget division as per the rules 

    // const  mse_avail_budget=0.25*total_budget;
    // const mse_scst_avail_budget=0.04* mse_avail_budget
    // const not_mse_avail_budget=0.03* mse_avail_budget
    const sql = `UPDATE  budget_table
                SET 
                    org_id=?,
                    desc_name=?,
                    category=?,
                    is_small_scale=?,
                    source=?,
                    quantity=?,
                    quantity_unit=?,
                    budget_total=?,
                    budget_other_mse=?,
                    budget_mse_scst_inc_entrep=?,
                    budget_mse_scst_own_entrep=?,
                    budget_mse_scst_women=?,
                    year=?,
                    gross_amt=?,
                    net_amt=?,
                WHERE 
                    id=?`;

    const values = [org_id,desc_name, category, is_small_scale,source,quantity,quantity_unit,budget_total,budget_other_mse,budget_mse_scst_inc_entrep,budget_mse_scst_own_entrep,budget_mse_scst_women,year, gross_amt, net_amt,req.params.id];
    db.query(sql,values, (error, result) => {
        if (error) {
            console.error("Error while updating budget", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.status(200).json({ message: "Budget updated successfully" });
        }
    });

};


export const getBudget=(req,res)=>{
    // const token = req.cookies.accessToken;
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json("Not logged in!");

// ACCESS DATA
  // console.log(adminId);

    jwt.verify(token, "secretkey", (err, userInfo) => {
    const query=`Select * from budget_table`;
    db.query(query,(error,result)=>{
        if (error){
            console.error("Error fetching budget data",error);
            return res.status(500).json({ error: "Internal server error" });
        }else{
            return res.status(201).json({ message: "All budget data fetched successfully" ,
            data:result
         });
            
        }

    });
});
};







