import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import axios from 'axios';


export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");


  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     // Call the backend /logout API route to clear the session or remove cookies
  //     await axios.post('http://localhost:1508/api/auth/logout');
  //     document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  //     console.log("Logout successful");

  //     // Redirect to the login page after successful logout
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error logging out:", error);
  //   }
  // };

//   const handleLogout = async () => {
//     try {
//         // Call the backend /logout API route to clear the session or remove cookies
//         await axios.post(`http://localhost:1508/api/auth/logout`);

//         // Clear the cookie on the client-side after receiving a successful response from the server
//         document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

//         console.log("Logout successful");

//         // Redirect to the login page after successful logout
//         navigate("/");
//     } catch (error) {
//         console.error("Error logging out:", error);

//         // Log the response data if available
//         if (error.response) {
//             console.error("Response data:", error.response.data);
//         }

//         // Log the request data if available
//         if (error.request) {
//             console.error("Request data:", error.request);
//         }
//     }
// };

const handleLogout = async () => {
  try {
      // Call the backend /logout API route to clear the session or remove cookies
      const response = await axios.post('http://localhost:1508/api/auth/logout');

      if (response.status === 200) {
          // Clear the cookie on the client-side after receiving a successful response from the server
          localStorage.removeItem('accessToken');
          localStorage.clear();


          console.log("Logout successful");
          navigate("/");
      } else {
          console.error("Logout failed. Server returned status:", response.status);
          console.error("Response data:", response.data);  // Log the response data
      }
  } catch (error) {
      console.error("Error logging out:", error);

      // Log the response data if available
      if (error.response) {
          console.error("Response data:", error.response.data);
      }

      // Log the request data if available
      if (error.request) {
          console.error("Request data:", error.request);
      }
  }
};

  

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={` transition-all shadow-md p-4 bg-[#ffffff]${
        fixedNavbar
          ? "sticky top-4 z-40  shadow-md shadow-blue-gray-500/5 "
          : ""
      }`}
      fullWidth
      blurred={fixedNavbar}

    >
      {/* <div>
        <Typography variant="h4" color="black"> Welcome! </Typography>
      </div> */}
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
         
        </div>
        
        <div className="flex items-center">
          
        {/* <a href='/'> */}

          <Button
            type="button"
            variant="gradient"
            fullWidth
            onClick={handleLogout}
            >Logout</Button>;
        {/* </a> */}
       
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden flex justify-end"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
        </div>
    
      </div>
      
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
