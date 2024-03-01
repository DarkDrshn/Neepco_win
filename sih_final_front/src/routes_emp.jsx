import {
    HomeIcon,
    UserCircleIcon,
    TableCellsIcon,
    BellIcon,
    ArrowRightOnRectangleIcon,
    UserPlusIcon,
  } from "@heroicons/react/24/solid";
  import { Profile, Tables, Notifications } from "@/pages/dashboard";
  import ProcHome  from "@/pages/dashboard/procHome";
  import BudgetCreate from "./pages/dashboard/budget/budgetCreate";
  import { SignIn, SignUp } from "@/pages/auth";
  import CatDonut from "./pages/dashboard/catdonut";
import BudgetAnalysis from "./pages/dashboard/budgetanalysis";
import BarsOP from "./pages/dashboard/barsop";
import SuppDist from "./pages/dashboard/suppdist";
import Trend from "./pages/dashboard/trend";


import Purchase_Details from "./pages/dashboard/purchase_order/purchase";
import Create_Purchase from "./pages/dashboard/purchase_order/createpurchase";


import Dashbs from "./pages/dashboard/dashbs";
import Budget from "./pages/dashboard/budget/budget";

import Vendors from "./pages/dashboard/Vendors/vendors";
import MsmeVendors from "./pages/dashboard/Vendors/msmeVendors";

import Receipts from "./pages/dashboard/receipt/receipt";
import Invoices from "./pages/dashboard/expenses/Invoices";
import Expenses from "./pages/dashboard/expenses/Expenses";

  
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  
  export const emp_routes = [
    {
      layout: "dashboardemp",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "Dashboards",
          path: "/home",
          element: <Dashbs />,
  
        },
        {
          icon: <HomeIcon {...icon} />,
          name: "Budget",
          path: "/budget",
          element: <Budget/>,
         
        },

      ],
    },

    {
      title: "Procurement Process",
      layout: "dashboardemp",
      pages: [
        {
          icon: <ArrowRightOnRectangleIcon {...icon} />,
          name: "Purchase Details",
          path: "/PurchaseOrderDetails",
          element: <Purchase_Details/>,
        },
        {
          icon: <ArrowRightOnRectangleIcon {...icon} />,
          name: "Create Purchase",
          path: "/createPurchaseOrder",
          element: <Create_Purchase/>,
        },

        {
          icon: <ArrowRightOnRectangleIcon {...icon} />,
          name: "All Vendors",
          path: "/AllVendors",
          element: <Vendors/>,
        },
        {
          icon: <UserPlusIcon {...icon} />,
          name: "MSME Vendors",
          path: "/MSME_Vendors",
          element: <MsmeVendors />,
        },


        {
          icon: <UserPlusIcon {...icon} />,
          name: "Receipts",
          path: "/receipts",
          element: <Receipts />,
        },
        {
          icon: <ArrowRightOnRectangleIcon {...icon} />,
          name: "Invoices",
          path: "/invoices",
          element: <Invoices />,
        },
        {
          icon: <UserPlusIcon {...icon} />,
          name: "Expenses",
          path: "/expenses",
          element: <Expenses />,
        },
      ],
    },
  
   
  ];
  
  export default emp_routes;
  