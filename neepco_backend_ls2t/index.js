import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import inviteRoute from './routes/webRouter.js';
import procure from "./routes/procureRoute.js"
import vendor from "./routes/vendorRoute.js";
import budget from "./routes/createbudgetroute.js";
import analysis from "./routes/analysisRoute.js";
import schedule from "node-schedule";
import {GemprcFetch,Gem_crac_Fetch, Cpp_prcFetch, Cpp_crac_Fetch, GempaoFetch, CpppaoFetch} from "./utils/apifetch.js"
const app = express();


app.use((req, res, next) => {
    
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);


app.use(cookieParser());

app.use('/api/invite',inviteRoute);
app.use('/api/employee',inviteRoute);
app.use('/api',procure)
app.use('/api',vendor)
app.use('/api',analysis)
app.use('/api/auth',authRoutes);
app.use('/api',budget);


app.listen(1508, () => {
    schedule.scheduleJob("* * * * *",()=>{
        GemprcFetch();
        Gem_crac_Fetch();
        Cpp_prcFetch();
        Cpp_crac_Fetch();
        GempaoFetch();
        CpppaoFetch();
    })    
    console.log("API working!");
});
