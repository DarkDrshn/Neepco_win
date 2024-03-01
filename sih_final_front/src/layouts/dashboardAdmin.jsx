import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";

import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes_dashadmin from "@/routes_admin";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { Dashboard } from ".";

export function DashboardAdmin() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes_dashadmin}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className=" xl:ml-72">
        <DashboardNavbar />
      </div>
      <div className="p-4 xl:ml-72">
        <Configurator />
        {/*         <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton> */}
        <Routes>
          {routes_dashadmin.map(
            ({ layout, pages }) =>
              layout === "dashboardAdmin" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        
          

        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

DashboardAdmin.displayName = "/src/layout/dashboardAdmin.jsx";

export default DashboardAdmin;
