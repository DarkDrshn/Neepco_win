import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Dashboard,
  DashboardEmp,
  DashboardAdmin,
  Auth,
} from "@/layouts";
import {

  DashboardSuper,
  
} from "@/layouts/dashboardSuperAdmin";
import { MainPage } from "./layouts/mainpage";
import { NavbarWeb } from "./topbar/Navbar";
import { PreNavbar } from "./topbar/Prenavbar";
import Error from "./Error";
import { BudgetCreate } from "./pages/dashboard";
import { ManualPurchase } from "./pages/dashboard/purchase_order/manualPurchase";
import { FetchedGem } from "./pages/dashboard/purchase_order/fetchedGem";
import { FetchedCpp } from "./pages/dashboard/purchase_order/fetchedCpp";

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<MainPage />} />
      <Route path="/dashboard/*" element={<Dashboard />} />

      <Route path="/dashboardemp/*" element={<DashboardEmp />} />
      <Route path="/dashboardAdmin/*" element={<DashboardAdmin />} />
      <Route path="/dashboardSuperAdmin/*" element={<DashboardSuper />} />
      <Route path="/auth/*" element={<Auth />} />

      <Route path="/dashboardAdmin/budgetcreate" element={<BudgetCreate />} />
      <Route path="/dashboardemp/createpurchase_manual" element={<ManualPurchase />}/>
      <Route path="/dashboardemp/fetched_Gem" element={<FetchedGem />}/>
      <Route path="/dashboardemp/fetched_Cpp" element={<FetchedCpp />}/>

      <Route path="*" element={<Error />} />
    </Routes>
  );
};

function App() {
  return (
    <>
      <PreNavbar />
      <Routing />
    </>
  );
}

export default App;
