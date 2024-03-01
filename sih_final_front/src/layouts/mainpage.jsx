import React from "react";
import { Carousel, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import "../index.css";

// import { TextCards } from "./MainPage/TextCards";
// import { TextCards2 } from "./MainPage/TextCards2";
// import { TextCards3 } from "./MainPage/TextCards3";
// import { TextCards4 } from "./MainPage/TextCards4";
// import { SectionOne } from "../pages/MainPage/SectionOneComp";
// import { SectionTwo } from "./MainPage/SectionTwoComp";
// import { LastSection } from "./MainPage/LastSection";
// import { CategoryCard } from "../pages/MainPage/CategorySection";
// import { Marquee } from "../pages/MainPage/Marquee";
// import { DocCategoryCard } from "../pages/MainPage/DocCategorySection";
import Footer from "../pages/Footer";
import { NavbarWeb } from "../topbar/Navbar";

// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// import {
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Checkbox,
// } from "@material-tailwind/react";

// import { CardBody, Card, CardHeader, Input } from "@material-tailwind/react";

export function MainPage() {
  return (
    <>
      <div className="w-full">
        <div>
        <NavbarWeb />

        </div>
        <section className="h-100 bg-[#f3f3f3] px-40 py-10 ">
          <div className="flex justify-center gap-12">
            <div className="flex flex-col justify-center">
              <Typography variant="h1" color="blue-gray">
                Welcome to NEEPCO Procurement & Payment Portal
              </Typography>
              <Typography
                variant="h4"
                color="blue-gray"
                className="mt-5 font-normal"
              >
                NEEPCO's Transparent Procurement & Payment Universe
              </Typography>
              <Typography variant="h5" color="blue-gray" className="font-light">
                Unlock the Power of Data
              </Typography>
              <div className="mt-5  hidden lg:flex">
                <a href="">
                  <Button className="bg-[#42a5f5] px-10" size="sm">
                    Login
                  </Button>
                </a>
              </div>{" "}
            </div>

            <div className="header_img relative">
              <img
                className="relative z-10 h-96 w-full "
                src="../img/Thermal (1).png"
                alt="nature image"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#42a5f5]/90">
          <div className="flex flex-col lg:flex-row p-5 lg:px-40">
            <div className="w-100 p-10 text-center text-white">
              <Typography variant="h4">Efficiency</Typography>
              <Typography variant="paragraph">
                We help you optimize procurement and finance management, saving
                both time and resources.
              </Typography>
            </div>
            <div className="w-100 p-10 text-center text-white">
              <Typography variant="h4">Accuracy</Typography>
              <Typography variant="paragraph">
                {" "}
                Our data analysis tools ensure precise decision-making and
                budget planning.
              </Typography>
            </div>
            <div className="w-100 p-10 text-center text-white">
              <Typography variant="h4">Security</Typography>
              <Typography variant="paragraph">
                We prioritize data security and compliance with all relevant
                regulations, so you can trust us with your sensitive
                information.
              </Typography>
            </div>
          </div>
        </section>

        <section className="p-10 lg:py-20 lg:px-40 ">
          <div className="flex flex-col lg:flex-row gap-6">
            <div>
              <img
                className=" w-full rounded-lg object-cover object-center"
                src="../img/logo2 (1).png"
                alt="nature image"
              />
            </div>

            <div className="py-2 flex flex-col justify-center">
              <Typography variant="h3">About Us</Typography>
              <img
                className="py-3 w-80 rounded-lg object-cover object-center"
                src="../img/logo (1).png"
                alt="nature image"
              />
              <Typography classname="py-2">
                At NEEPCO's Procurement and Payment Data Portal, we are
                dedicated to providing comprehensive solutions for efficient
                procurement management. We understand the importance of
                real-time data in enhancing decision-making and streamlining
                processes. Here's a bit more about who we are and what we do:
              </Typography>
            </div>
          </div>
          <br></br>

          <div className="">
            <Typography variant="h3">Who We Are:</Typography>
            <Typography classname="py-2">
              We are a team of experts passionate about driving innovation in
              procurement and finance management. With years of experience, we
              bring cutting-edge technology to NEEPCO, enabling seamless data
              capture, analysis, and integration for all your procurement needs.
            </Typography>
            <br />
            <Typography variant="h3">What We Do:</Typography>
            <div classname="mt-2">
            <Typography>
              Our primary mission is to empower NEEPCO and its stakeholders with
              real-time, user-friendly procurement and finance management tools.
              We integrate with GeM APIs to simplify procurement updates and
              encourage the participation of MSEs, thereby promoting economic
              growth. Through our dynamic graphs and analysis charts, we offer
              valuable insights into your procurement operations.
            </Typography>
            </div>
            <div classname="mt-2">
            <Typography>
            At NEEPCO Procurement & Payment Portal, we are dedicated to
            revolutionizing the procurement process for North Eastern Electric
            Power Corporation Limited (NEEPCO). Our mission is to streamline and
            optimize procurement operations, ensuring transparency, efficiency,
            and compliance.
          </Typography>
              </div>
          </div>
        </section>

        <hr />

        <section className="p-10 lg:py-10 lg:px-40">
          

          <div className="my-5 p-5 flex flex-col lg:flex-row shadow-lg">
         
            <div className="flex flex-col justify-center">
              <Typography variant="h4">GeM and MSE Integration :-</Typography>
              <Typography>
                Our portal integrates with GeM APIs to ease the procurement
                updation process and encourages MSEs to take initiatives in the
                procurements streamlining the overall process .
              </Typography>
            </div>
            <div className="">
              <img
                className="  imggg rounded-lg object-cover object-center"
                src="../img/offer/market.png"
                alt="nature image"
              />
            </div>
          </div>
          <div className="my-5 p-5 flex flex-col lg:flex-row shadow-lg">
         
            <div className="flex flex-col justify-center">
              <Typography variant="h4">Efficient Procurement Management and Analysis :-</Typography>
              <Typography>
              Dynamic graphs and analysis charts to develop clear detailed idea about the procurements in place. Efficient searching and categorized report generation facilities to improve the  management process
              </Typography>
            </div>
            <div className="">
              <img
                className="  imggg rounded-lg object-cover object-center"
                src="../img/offer/proc.png"
                alt="nature image"
              />
            </div>
          </div>
          <div className="my-5 p-5 flex flex-col lg:flex-row shadow-lg">
         
            <div className="flex flex-col justify-center">
              <Typography variant="h4">Finance Management :-</Typography>
              <Typography>
              Creating/Updating Annual Budget plans, payment status and analysis of Overall Financial trends across all NEEPCO plants including surplus and deficit analysis to help make right steps towards procurement activities .
              </Typography>
            </div>
            <div className="">
              <img
                className="  imggg rounded-lg object-cover object-center"
                src="../img/offer/fin.png"
                alt="nature image"
              />
            </div>
          </div>
          <div className="my-5 p-5 flex flex-col lg:flex-row shadow-lg">
         
            <div className="flex flex-col justify-center">
              <Typography variant="h4">Data Security :-</Typography>
              <Typography>
              Our portal ensures the integrity of your data making us worth to rely upon . We comply with all the data protection regulations.
              </Typography>
            </div>
            <div className="">
              <img
                className="  w-80 rounded-lg object-cover object-center"
                src="../img/offer/sec.png"
                alt="nature image"
              />
            </div>
          </div>

        </section>
      </div>

      <Footer />
    </>
  );
}
