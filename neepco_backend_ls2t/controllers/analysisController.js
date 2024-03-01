import { query } from "express";
import db from "../config/connect.js";
import async from "async";
export const categoryAnalysis = (req, res, err) => {

    async.parallel(categoryTasks,(error,data)=>{
        if(error){
            res.status(502).json({
                status:false,
                message:error
            })
        }else{
            res.status(201).json({
                status:true,
                //Bar Graph- X-axis: Categories, Y-axis:Cost Of Procurement(in lakhs);
                top5categoriesBarGraph:data[0],
                //Pie Chart- Percentage of Products vs Services procured for respective year
                productVsServicesPieChart:data[1],
            })
        }
    })
}

export const growthAnalysis=(req,res,error)=>{
    async.parallel(growthTasks,(error,data)=>{
        if(error){
            res.status(502).json({
                success:false,
                message:error
            })
        }else{
            res.status(201).json({
                success:true,
                //Bar Graph- Num of procurements done per year
                barGraph:data[0],
                //Pie Chart- Procurments completed vs pending vs cancelled
                pieChart:data[1]
            })
        }
    })
}

export const costAnalysis=(req,res,err)=>{
    async.parallel(costTasks,(error,data)=>{
        if(error){
            res.status(502).json({
                success:false,
                message:error
            })
        }else{
            res.status(201).json({
                success:true,
                //Bar graph- Total procurement cost over each year;
                barGraph:data[0],
                //Line Graph - Monthly procurement cost of particular year (Provided for all years ,Filter according to requirements)
                lineGraph:data[1]
            })
        }
    })
}

export const supplierAnalysis=(req,res,err)=>{
    async.parallel(supplierTasks,(error,data)=>{
        if(error){
            res.status(502).json({
                status:false,
                message:error,
            })
        }else{
            res.status(201).json({
                success:true,
                // Bar Graph- Vendors vs Cost of Procurement done with them.
                vendorVsProBarGraph:data[0],
                // Pie Chart - Number of procurements done on Gem vs CPPP vs Others
                gemVsCpppVsOthersPieChart:data[1],
            })
        }
    })
}
export const budgetAnalysis=(req,res,err)=>{
    
    async.parallel(budgetTasks,(error,data)=>{
        if(error){
            res.status(502).json({
                statues:false,
                message:error

            })
        }else{
            // console.log(data);
            res.status(201).json({
                pieChartForMSEvsSC_STvsWomenvsOther:{
                    mse:data[0][0].mse,
                    mse_sc_st:data[0][1].mse_sc_st,
                    mse_sc_st_women:data[0][2].mse_sc_st_women,
                    others:data[0][3].others-(data[0][0].mse+data[0][1].mse_sc_st)
                },
                projectVsCostBarGraph:{
                    data:data[1],
                },
                //Double bar graph with categories on X-axis and Cost on Y-axis with 1st bar being allocated budget for that category and 2nd bar being Actual Invested Cost
                doubleBarGraph:{
                    data:data[2],
                },
                pieChartBudgDistr:{
                    data:data[3],
                },
                //Line graph of budget allocated vs procurement cost over years.
                lineGraph:{
                    data:data[4],
                }


            })
            // res.status(201).json({
            //     success:true,
            //     //piechar shows how much percentage of procurement done by NEEPCO under like MSME,MSME SC/ST
            //     piechart:data[0],
            //     // bar graph Project name- x-axis   vs cost of project (y-axis) 
            //     bargraph:data[1],
            //     //Double Bar Graph :Top 5 only- Categories on X-axis , Cost on y ……Bar 1-Allocated budget ,Bar 2- Actual invested Cost
            //     doublebargraph:data[2],
            //     //line graph as current letter if want to change we can change Actual budget vs procurement cost over time
            //     linegraph:data[3],
            //     //pie chart Percentage Distribution of Budget across top 5 Categories
            //     pie_chart:data[4]



            // })
        }
    })
}
const categoryTasks=[
    function(callback){
        const org_id=1;
        let query = "select category,sum(amount) as cost from procurement_details where org_id=? group by category order by sum(amount) desc limit 5";
        db.query(query,[org_id], (error, data) => {
            if (error) {
                return callback(error);
            }
            callback(null,data);
        })
    },
    function(callback){
        const org_id=1;
        let query = "select type,sum(quantity) as quantity from procurement_details where org_id=? group by type";
            db.query(query,[org_id], (error, data) => {
                if (error) {
                    return callback(error);
                }
                return callback(null,data);
            })
    }
]

const growthTasks=[
    function(callback){
        const org_id=1;
        let query= "select year(created_at) as year,count(*) as num_of_procurements from procurement_details where org_id=? group by year(created_at)";
        db.query(query,[org_id],(err,data)=>{
            if(err){
                return callback(err);
            }
            return callback(null,data);
        })
    },
    function(callback){
        const org_id=1;
        let query=" select (select count(*) from procurement_details where org_id=? and is_cancelled=True) as cancelled, count(case when payment_status=1 then payment_status end) completed, count(case when payment_status=0 then payment_status end) as pending from procurement_details where org_id=? and is_cancelled=False";
        db.query(query,[org_id,org_id],(err,data)=>{
            if(err){
                return callback(err);
            }
            return callback(null,data);
            
        })
    }
]

const costTasks=[
    function(callback){
        const org_id=1;
        let query="select year(created_at) as year,sum(amount) as Cost_of_Procurement from procurement_details where org_id=? group by year(created_at)";
        db.query(query,[org_id],(err,data)=>{
            if(err){
                return callback(err);
            }
            return callback(null,data);
        })
    },
    function(callback){
        const org_id=1;
        let query="select year(created_at),month(created_at),sum(amount) as Cost_of_Procurement from procurement_details where org_id=? group by year(created_at),month(created_at)";
        db.query(query,[org_id],(err,data)=>{
            if(err){
                return callback(err);
            }
            return callback(null,data);
        })
    }
]

const supplierTasks=[
    function(callback){
        const org_id=1;
        let query="select v.cmpny_name,sum(amount) as cost from vendor_info as v inner join procurement_details as p on v.id=p.vendor_id where v.org_id=? and p.org_id=? group by v.cmpny_name";
        db.query(query,[org_id,org_id],(err,data)=>{
            if(err){
                return callback(err);
            }
            return callback(null,data);
        })
    },
    function(callback){
        const org_id=1;
        let query="select year(created_at),portal,count(*) as num_of_procurements from procurement_details where org_id=? group by portal,year(created_at)";
        db.query(query,[org_id],(err,data)=>{
            if(err){
                return callback(err);
            }
            return callback(null,data);
        })
    },
    // function(callback){

    // }

]
const budgetTasks=[
    //1 -BudgetAnalysis
    function (callback){
        let query=`select count(*) as mse from vendor_info where is_mse=1 AND social_category != 'SC' AND social_category != 'ST'`;
        const ans=[];
        db.query(query,(er,data)=>{
            if(er){
                return callback(er)
            }else{
                ans.push(data[0]),
                query=`select count(*) as mse_sc_st from vendor_info where is_mse=1 and (social_category='SC' or social_category='ST')`;
                db.query(query,(er1,data1)=>{
                    if(er1){
                        return callback(er1)
                    }else{
                        ans.push(data1[0])
                        query=`select count(*) as mse_sc_st_women from vendor_info where is_mse=1 and (social_category='SC' or social_category='ST') and mse_gender='Female'`;
                        db.query(query,(er2,data2)=>{
                            if(er2){
                                return callback(er2);
                            }
                            ans.push(data2[0]);
                            query=`select count(*) as others from vendor_info`;
                            db.query(query,(er3,data3)=>{
                                if(er3){
                                    return callback(er3);
                                }
                                ans.push(data3[0])
                                // console.log(ans)s
                                return callback(null,ans);
                            })
                        })
                        // return callback(null,ans)
                    }
                })
                
            }

        })


    },
    //2 - budgetanalysis 
    function(callback){
        let query="select project as project_name ,sum(amount) as costofProject,year(created_at) as year from procurement_details group by project,year(created_at)"
        db.query(query,(err,data)=>{
            if(err){
                return callback(err);

            }
            console.log(data);
            return callback(null,data);
        })

    },
    //3 -budget analysis Double Bar Graph
    function(callback){
        let query=`SELECT
        category,
        SUM(total_budget) AS AllocatedBudget,
        (
            SELECT SUM(amount)
            FROM procurement_details pd
            WHERE pd.project = bc.category AND pd.payment_status = 1
        ) AS ActualInvestedCost
    FROM (
        SELECT category, SUM(budget_total) AS total_budget
        FROM budget_table
        WHERE year = EXTRACT(YEAR FROM CURRENT_DATE())
        GROUP BY category
        ORDER BY total_budget DESC
        LIMIT 5
    ) AS bc
    GROUP BY category
    ORDER BY AllocatedBudget DESC;
    `
        db.query(query,(err,data)=>{
            if(err){
                return callback(err);

            }
            console.log(data);
            return callback(null,data);
        })
    },
// 4 -budget analysispie chart -Percentage Distribution of Budget across top 5 Categories—
    function(callback){
        const query=`select year,category,sum(budget_total) as AllocatedBudget from budget_table group by category,year order by sum(budget_total) DESC limit 5`
        db.query(query,(err,data)=>{
            if(err){
                return callback(err);
            }
            console.log(data);
            return callback(null,data);
        })
    },


    // 5 -budget analysis Actual budget vs procurement cost over time query  graph suitable i think line 


    function(callback){
        const query=`SELECT
        budget_subquery.year,
        COALESCE(actual_budget, 0) AS actual_budget,
        COALESCE(procurement_cost, 0) AS procurement_cost
    FROM (
        SELECT
            year AS year,
            SUM(b.budget_total) AS actual_budget
        FROM
            budget_table b
        GROUP BY
            year
    ) AS budget_subquery
    LEFT JOIN (
        SELECT
            YEAR(p.end_date) AS year,
            SUM(p.amount) AS procurement_cost
        FROM
            procurement_details p
        GROUP BY
            YEAR(p.end_date)
    ) AS procurement_subquery ON budget_subquery.year = procurement_subquery.year
    ORDER BY
        budget_subquery.year;
    `
        db.query(query,(err,data)=>{
            if(err){
                return callback(err);
            }
            console.log(data);
            return callback(null,data);
        })
    },
]


    //         WHEN is_mse AND social_category != 'SC' AND social_category != 'ST' THEN 'MSE'
    //         WHEN is_mse AND social_category = 'SC' AND MSE_gender = 'Male' THEN 'MSE SC/ST'
    //         WHEN is_mse AND social_category = 'ST' AND MSE_gender = 'Male' THEN 'MSE SC/ST'
    //         WHEN is_mse AND social_category = 'SC' AND MSE_gender = 'Female' THEN 'MSE SC/ST Own women'
    //         WHEN is_mse AND social_category = 'ST' AND MSE_gender = 'Female' THEN 'MSE SC/ST Own women'
    //         ELSE 'Others'
const budgets1=[
        function(callback){
            const query=`select count(*) as mse from vendor_info where is_mse AND social_category != 'SC' AND social_category != 'ST'`;
            db.query(query,(er,data)=>{
                if(er){
                    return callback(er)
                }
                return callback(null,data)
            })
        },
        function(callback){
            let query=`select count(*) as mse_sc/st from vendor_info where is mse and mse_gender="Male" and (social_category="SC" or social_category="ST")`;
            db.query(query,(er,data)=>{
                if(er){
                    return callback(er)
                }
                return callback(null,data)
            })
        }
]