import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import emp_routes from "@/routes_emp";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export function DashboardEmp() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={emp_routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="xl:ml-72">

        <DashboardNavbar />
      </div>
      <div className="px-8 py-4 xl:ml-72">
        <Configurator />
        <Routes>
          {emp_routes.map(
            ({ layout, pages }) =>
              layout === "dashboardemp" &&
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

DashboardEmp.displayName = "/src/layout/dashboardEmp.jsx";

export default DashboardEmp;
