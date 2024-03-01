import React from "react";
import {
  Navbar,
  Typography,
  ListItemPrefix,
  Collapse,
  IconButton,
} from "@material-tailwind/react/";
import {LanguageIcon,} from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import '../index.css';
import { Link } from "react-router-dom";

function NavList() {
  return (
    <>
      <ul className="my-2 flex flex-wrap flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        {/* <Typography
          as="li"
          variant="small"
          color="black"
          className="p-1 font-medium"
        >
          <a
            href="/"
            className="flex items-center hover:text-blue-500 transition-colors"
          >
            Sitemap 
          </a>
        </Typography>
        <Typography
        as="li"
        variant="small"
        color="black"
        className="p-1 font-medium">
          <a
            href="/"
            className="flex items-center hover:text-blue-500 transition-colors"
          >
            Skip Back To Homepage
          </a>
        </Typography>


        
        <Typography
        as="li"
        variant="small"
        color="black"
        className="p-1 font-medium">
          <a
            href="/"
            className="flex items-center hover:text-blue-500 transition-colors lang-bg"
          >
            A+
          </a>
        </Typography>
        <Typography
        as="li"
        variant="small"
        color="black"
        className="p-1 font-medium">
          <a
            href="/"
            className="flex items-center hover:text-blue-500 transition-colors lang-bg"
          >
           A
          </a>
        </Typography>
        <Typography
        as="li"
        variant="small"
        color="black"
        className="p-1 font-medium">
          <a
            href="/"
            className="flex items-center hover:text-blue-500 transition-colors lang-bg"
          >
            A-
          </a>
        </Typography> */}
        
        {/* <Typography className="flex items-end gap-4">
          

        
            <IconButton size="sm">
              <i className="text-xs" /> A-
            </IconButton>
            <IconButton size="md">
              <i className="text-sm" /> A
            </IconButton>
            <IconButton size="lg">
              <i className="text-lg" /> A+
            </IconButton>
        </Typography> */}
        <li>
          <div className="basis-100% flex">
            <div id="google_element">
              </div>
          </div>
          </li>
         <ListItemPrefix>
              <LanguageIcon className="h-5 w-5" />
          </ListItemPrefix>
      </ul>
    </>
  );
}

export function PreNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-3xl px-6 py-1 top-nav">
      <div className="flex items-center justify-between text-black">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        ></Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
