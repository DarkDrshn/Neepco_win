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
import Org_users from "./pages/dashboard/org_users";

import Dashbs from "./pages/dashboard/dashbs";
import Budget from "./pages/dashboard/budget/budget";

import CreateAdmin from "./pages/dashboard/organization/createAdmin";
import CreateUsers from "./pages/dashboard/organization/createUsers";
import OrgEmployess from "./pages/dashboard/organization/orgEmployess";

import Vendors from "./pages/dashboard/Vendors/vendors";
import MsmeVendors from "./pages/dashboard/Vendors/msmeVendors";

import Expenses from "./pages/dashboard/expenses";
  
  const icon = {
    className: "w-5 h-5 text-inherit",
  };
  
  export const routes_superadmin = [
    {
      layout: "dashboardSuperAdmin",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "Dashboards",
          path: "/home",
          element: <Dashbs />,
  
        },
        {
          icon: <HomeIcon {...icon} />,
          name: "Budgets",
          path: "/budget",
          element: <Budget />,
        },
     
      ],
    },
    {
        title: "Organisation and Users",
        layout: "dashboardSuperAdmin",
        pages: [
          {
            icon: <ArrowRightOnRectangleIcon {...icon} />,
            name: "Create Admins",
            path: "/createadmins",
            element: <CreateAdmin />,
          },
          {
            icon: <UserPlusIcon {...icon} />,
            name: "Admins / Employees",
            path: "/orgemployess",
            element: <OrgEmployess/>,
          },
        ],
      },
      {
        title: "Vendor Management",
        layout: "dashboardSuperAdmin",
        pages: [
          {
            icon: <ArrowRightOnRectangleIcon {...icon} />,
            name: "All Vendors",
            path: "/vendors",
            element: <Vendors />,
          },
          {
            icon: <UserPlusIcon {...icon} />,
            name: "MSME Vendors",
            path: "/msmevendors",
            element: <MsmeVendors/>,
          },
        ],
      },
      {
        title: "Payment and Accounting",
        layout: "dashboardSuperAdmin",
        pages: [
          {
            icon: <ArrowRightOnRectangleIcon {...icon} />,
            name: "Expenses",
            path: "/expenses",
            element: <Expenses />,
          },
        ],
      },
  ];
  
  export default routes_superadmin;
  