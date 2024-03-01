import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
  Alert,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

export function Create_Purchase() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);
  const [isDashboardModalOpen, setDashboardModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [alertOpen, setAlertOpen] = React.useState(false);


  const data = [
    {
      label: "On GeM",
      value: "gem",
      icon: Square3Stack3DIcon,
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "On Central Procurement",
      value: "central",
      icon: UserCircleIcon,
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "On Other Portals",
      value: "others",
      icon: Cog6ToothIcon,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  const handleTabClick = (value) => {
    setActiveTab(value);

    if (value === "gem") {
      setDashboardModalOpen(true);
    }

    if (value === "central") {
      setProfileModalOpen(true);
    }

    if (value === "others") {
      // Redirect to the desired URL
      navigate("/dashboardemp/createpurchase_manual");
    }


  };

  const [gemId, setGemId] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const handleChange = (e) => {
    setGemId(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:1508/api/fetchGeM?Gem_id=${gemId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (
        response.data &&
        typeof response.data === "object" &&
        Object.keys(response.data).length > 0
      ) {
        console.log("YEH BHI RECEIVED",response.data)
        setResponseData(response.data);
        navigate("/dashboardemp/fetched_Gem", {
          state: { gemData: response.data }
        }); 
        } else {
        console.error("No data found");
        setResponseData({
          error: "Request failed with status code 502",
          message: "No Data Found",
        });
      }
    } catch (error) {
      console.error("Error retrieving information:", error);
      console.error("Response data:", error.response?.data); // Log response data if available
      console.error("Status code:", error.response?.status); // Log status code if available

      setResponseData({
        error: "Request failed with status code 502",
        message: "No Data Found",
      });
    }
  };


  console.log("RECEIVED",responseData);








  const [cppId, setCppId] = useState(null);
  const [responseDataC, setResponseDataC] = useState(null);

  const handleChangeC = (e) => {
    setCppId(e.target.value);
  };

  const handleSubmitC = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:1508/api/fetchCpp?Cpp_id=${cppId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (
        response.data &&
        typeof response.data === "object" &&
        Object.keys(response.data).length > 0
      ) {
        console.log("YEH BHI RECEIVED",response.data)
        setResponseDataC(response.data);
        navigate("/dashboardemp/fetched_Cpp", {
          state: { cppData: response.data }
        }); 
        } else {
        console.error("No data found");
        setResponseDataC({
          error: "Request failed with status code 502",
          message: "No Data Found",
        });
      }
    } catch (error) {
      console.error("Error retrieving information:", error);
      console.error("Response data:", error.response?.data); 
      console.error("Status code:", error.response?.status); 

      setResponseDataC({
        error: "Request failed with status code 50KG2",
        message: "No Data Found",
      });
    }
  };

  const handleDashboardModalClose = () => {
    setActiveTab(null);
    setDashboardModalOpen(false);
    setResponseData(null);
    setGemId(null);
    setOpen(false); 
  };

  const handleProfileModalClose = () => {
    setActiveTab(null);
    setProfileModalOpen(false);
    setResponseDataC(null);
    setCppId(null);
    setOpen(false); 
  };


  return (
    <>
      <Typography variant="h3" color="blue-gray">
        Create Purchase Orders
      </Typography>
      <div>
        <Tabs value={activeTab}>
          <TabsHeader>
            {data.map(({ label, value, icon }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => handleTabClick(value)}
              >
                <div className="flex items-center gap-2">
                  {React.createElement(icon, { className: "w-5 h-5" })}
                  {label}
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>

        {isDashboardModalOpen && (
          <div className="modal-overlay">
            <section className="bg-coolGray-800 fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full items-center overflow-y-auto bg-[#e9f3ffd4] bg-opacity-80 p-0">
              <div className="m-auto w-full max-w-lg rounded-md bg-white p-8">
                <h3 className="text-coolGray-900 mb-2 text-2xl font-semibold">
                  Government e-Marketplace
                </h3>
                <p className="text-coolGray-500 mb-6 text-sm font-medium">
                  Please enter Government E-Marketplace (Gem) id.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="relative mb-6">
                    <div class="md:w-100 mb-8  w-full md:mb-0">
                      <label
                        class="text-coolGray-800 mb-2 block font-medium leading-6"
                        for=""
                      >
                        GeM Id
                      </label>
                      <input
                        class="border-coolGray-200 text-coolGray-300 placeholder-coolGray-300 focus:shadow-outline block h-12 w-full appearance-none rounded-lg border px-3 py-2 leading-6 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        type="text"
                        placeholder="eg: GEM000"
                        fdprocessedid="kkd9po"
                        value={gemId}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="-m-2 flex flex-wrap justify-end">
                    <div className="w-full p-2 md:w-1/2">
                      <button
                        className="text-coolGray-500 hover:text-coolGray-600 border-coolGray-200 hover:border-coolGray-300 shadow-button flex w-full flex-wrap justify-center rounded-md border bg-white px-4 py-2.5 text-base font-medium"
                        onClick={handleDashboardModalClose}
                      >
                        <p>Cancel</p>
                      </button>
                    </div>
                    <div className="w-full p-2 md:w-1/2">
                      <button
                        type="submit"
                        className="shadow-button flex w-full flex-wrap justify-center rounded-md border border-blue-500 bg-[#1e88e5] px-4 py-2.5 text-base font-medium text-white hover:bg-blue-600"
                      >
                        <p>Fetch</p>
                      </button>
                    </div>
                  </div>
                </form>

                {responseData && (
                  <div>
                    <Alert
                      className="mt-0"
                      color="red"
                      open={open} onClose={() => setOpen(false)}
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 100 },
                      }}
                    >
                      <h2>API Response:</h2>
                      <pre>{JSON.stringify(responseData, null, 2)}</pre>{" "}
                    </Alert>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {isProfileModalOpen && (
          <div className="modal-overlay">
            <section className="bg-coolGray-800 fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full items-center overflow-y-auto bg-[#e9f3ffd4] bg-opacity-80 p-0">
              <div className="m-auto w-full max-w-lg rounded-md bg-white p-8">
                <h3 className="text-coolGray-900 mb-2 text-2xl font-semibold">
                  Central Procurement Portal
                </h3>
                <p className="text-coolGray-500 mb-6 text-sm font-medium">
                  Please enter Central Procurement Portal (CPP) id.
                </p>

                <form onSubmit={handleSubmitC}>
                  <div className="relative mb-6">
                    <div class="md:w-100 mb-8  w-full md:mb-0">
                      <label
                        class="text-coolGray-800 mb-2 block font-medium leading-6"
                        for=""
                      >
                        CPP Id
                      </label>
                      <input
                        class="border-coolGray-200 text-coolGray-300 placeholder-coolGray-300 focus:shadow-outline block h-12 w-full appearance-none rounded-lg border px-3 py-2 leading-6 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        type="text"
                        placeholder="eg: CPP000"
                        fdprocessedid="kkd9po"
                        value={cppId}
                        onChange={handleChangeC}
                      />
                    </div>
                  </div>

                  <div className="-m-2 flex flex-wrap justify-end">
                    <div className="w-full p-2 md:w-1/2">
                      <button
                        className="text-coolGray-500 hover:text-coolGray-600 border-coolGray-200 hover:border-coolGray-300 shadow-button flex w-full flex-wrap justify-center rounded-md border bg-white px-4 py-2.5 text-base font-medium"
                        onClick={handleProfileModalClose}
                      >
                        <p>Cancel</p>
                      </button>
                    </div>
                    <div className="w-full p-2 md:w-1/2">
                      <button
                        type="submit"
                        className="shadow-button flex w-full flex-wrap justify-center rounded-md border border-blue-500 bg-[#1e88e5] px-4 py-2.5 text-base font-medium text-white hover:bg-blue-600"
                      >
                        <p>Fetch</p>
                      </button>
                    </div>
                  </div>
                </form>
                {responseDataC && (
                  <div>
                    <Alert
                      className="mt-0"
                      color="red"
                      open={open} onClose={() => setOpen(false)}
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 100 },
                      }}
                    >
                      <h2>API Response:</h2>
                      <pre>{JSON.stringify(responseDataC, null, 2)}</pre>{" "}
                    </Alert>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  );
}

export default Create_Purchase;
