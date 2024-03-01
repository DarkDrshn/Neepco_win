import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


import { Button, Typography } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";

export function FetchedCpp() {
  const location = useLocation();
  const [cppData, setCppData] = useState(null);

  const [isMSMEChecked, setIsMSMEChecked] = useState(false);

  useEffect(() => {
    const data = location.state ? location.state.cppData : null;
    if (data) {
      setCppData(data);
      console.log(JSON.stringify(data, null, 2)); // Log the data to the console
    }
  }, [location.state]);

  if (!cppData) {
    return <div>Loading...</div>; // or handle loading state as needed
  }

  const desc = cppData?.data?.[0]?.Procurement_details.description || ""
  console.log("YESH HAI DESC",desc)

  const handleFormSubmit = async () => {
    const formData = {
      product: document.getElementsByName("product")[0].value,
      type: document.getElementsByName("type")[0].value,
      category: "KKIHWEF",
      description: document.getElementsByName("description")[0].value,
      quantity: document.getElementsByName("quantity")[0].value,
      unit: document.getElementsByName("unit")[0].value,
      amount: document.getElementsByName("amount")[0].value,
      // project: document.getElementsByName("prj")[0].value,
      project: "ABINIDN",
      portal: 2,
      portal_id: cppData?.data[0]?.Cpp_id ,
      comp_name: document.getElementsByName("comp_name")[0].value,
      contact_no: document.getElementsByName("contact_no")[0].value,
      email_id: document.getElementsByName("email_id")[0].value,
      address: document.getElementsByName("address")[0].value,
      registration_no: document.getElementsByName("registration_no")[0].value,
      social_category: document.getElementsByName("social_category")[0].value, // Assuming you want to use selectedCategory here, update accordingly
      gender: document.getElementsByName("gender")[0].value,
      GST_in: document.getElementsByName("GST_in")[0].value,
      start_date: "2018-12-16",
      end_date: "2023-11-16",
    };

    console.log(JSON.stringify(formData, null, 2))

    try {
      const response = await axios.post(
        "http://localhost:1508/api/addprocure",
        formData,
        {withCredentials:true},
        console.log("feel hai ",formData)
      );
      console.log("API Response:", response.data);

      // Add any additional logic or state updates after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors or display an error message to the user
    }
  }; 

  return (
    <>
      <Typography variant="h3" className="mx-16" color="blue-gray">
        Central Procurement Portal fetch 
      </Typography>
      <div className="mx-16">
        <div>
          <a href="/dashboardemp/PurchaseOrderDetails">
            <Button className="m-6 rounded-full" variant="outlined">
              Go Back to dashboard
            </Button>
          </a>
        </div>

        <section className="bg-coolGray-50 py-4">
          <div className="container mx-auto px-4">
            <div className="border-coolGray-100 shadow-dashboard h-full overflow-hidden rounded-md border bg-white p-6">
              <div className="border-coolGray-100 border-b pb-6">
                <div className="-m-2 flex flex-wrap items-center justify-between">
                  <div className="w-full p-2 md:w-auto">
                    <h2 className="text-coolGray-900 text-lg font-semibold">
                      Procurement/ Purchase Order Details / {cppData?.data[0]?.Cpp_id}
                    </h2>
                    <p className="text-coolGray-500 text-xs font-medium">
                      Lorem ipsum dolor sit amet
                    </p>
                  </div>
                  <div className="w-full p-2 md:w-auto">
                    <div className="-m-1.5 flex flex-wrap justify-between">
                      <div className="w-full p-1.5 md:w-auto">
                        <button className="text-coolGray-500 hover:text-coolGray-600 border-coolGray-200 hover:border-coolGray-300 shadow-button flex w-full flex-wrap justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium">
                          <p>Cancel</p>
                        </button>
                      </div>
                      <div className="w-full p-1.5 md:w-auto">
                        <button
                          onClick={handleFormSubmit}
                          className="shadow-button flex w-full flex-wrap justify-center rounded-md border border-blue-gray-500 bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                        >
                          <p>Add</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-coolGray-100 border-b py-6">
                <div className="w-full ">
                  <div className="m-3 flex flex-wrap">
                    <div className="w-full p-3 md:w-1/5">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Purchase Order Details
                      </p>
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Product Name
                      </p>

                      <input
                        name="product"
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        value={
                          cppData?.data?.[0]?.Procurement_details.product || ""
                        }
                        placeholder="John"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="m-3 flex flex-wrap">
                    <div className="w-full p-3 md:w-1/5">
                      <p className="text-coolGray-800 text-sm font-semibold"></p>
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Project / Department
                      </p>

                      <input
                        name="prj"
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        value={
                          cppData?.data?.[0]?.Procurement_details.project_dpt || ""
                        }
                        placeholder="eg: ABDKC"
                      />
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Type
                      </p>
                      <input
                        name="type"
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        value={
                          cppData?.data?.[0]?.Procurement_details.type || ""
                        }
                        placeholder="eg: ABDKC"
                        readOnly
                      />
         
                    </div>
                  </div>
                  <div className="m-3 flex flex-wrap">
                    <div className="w-full p-3 md:w-1/5">
                      <p className="text-coolGray-800 text-sm font-semibold"></p>
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Category
                      </p>
                      <input
                        name="category"
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        value={
                          cppData?.data?.[0]?.Procurement_details.category || ""
                        }
                        placeholder="eg: ABDKC"
                      />
                
                    </div>

                    {/* <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Other Category
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        name="other_cat"
                        placeholder="eg: Ambulance stretcher"
                      />
                    </div> */}
                  </div>

                  <div className="m-3 flex flex-wrap">
                    <div className="w-full p-3 md:w-1/5">
                      <p className="text-coolGray-800 text-sm font-semibold"></p>
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Description
                      </p>

                      <textarea
                        name="description"
                        value={
                          cppData?.data?.[0]?.Procurement_details.description || ""
                        }
                    
                        readOnly
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                      ></textarea>
                    </div>
                  </div>

                  <div className="m-3 flex flex-wrap">
                    <div className="w-full p-3 md:w-1/5">
                      <p className="text-coolGray-800 text-sm font-semibold"></p>
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Quantity{" "}
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        value={
                          cppData?.data?.[0]?.Procurement_details.quantity || ""
                        }
                        readOnly
                        name="quantity"
                        placeholder="John"
                      />
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Units{" "}
                      </p>
                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        value={
                          cppData?.data?.[0]?.Procurement_details.unit || ""
                        }
                        readOnly
                        name="unit"
                        placeholder="John"
                      />
                    </div>

                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Amount{" "}
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        name="amount"
                        value={
                          cppData?.data?.[0]?.Procurement_details.amount || ""
                        }
                        readOnly
                        placeholder="eg: 100000"
                      />
                    </div>
                  </div>
                  <div className="m-3 flex flex-wrap">
                    <div className="w-full p-3 md:w-1/5">
                      <p className="text-coolGray-800 text-sm font-semibold"></p>
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Start Date{" "}
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="date"
                        value={
                          cppData?.data?.[0]?.Procurement_details.start_date || ""
                        }
                        name="end_date"
                        placeholder="John"
                      />
                    </div>

                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        End Date{" "}
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="date"
                        value={
                          cppData?.data?.[0]?.Procurement_details.end_date || ""
                        }
                        name="end_date"
                        placeholder="eg: 100000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-coolGray-100 border-b py-6">
                <div className="w-full">
                  <div className="m-3 flex flex-wrap">
                    <div className="w-full p-3 md:w-1/5">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Vendor/Seller Details
                      </p>
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Company Name
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        value={
                          cppData?.data?.[0]?.Procurement_details?.seller.Company_name || ""
                        }
                        readOnly
                        name="comp_name"
                        placeholder="John"
                      />
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        GSTIN No
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        value={
                          cppData?.data?.[0]?.Procurement_details?.seller.GST_in || ""
                        }
                        readOnly
                        name="GST_in"
                        placeholder="John"
                      />
                    </div>
                  </div>

                  <div className="m-3 flex flex-wrap">
                    <div className="w-full p-3 md:w-1/5">
                      <p className="text-coolGray-800 text-sm font-semibold"></p>
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Email Id
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="email"
                        value={
                          cppData?.data?.[0]?.Procurement_details?.seller.email_id || ""
                        }
                        readOnly
                        name="email_id"
                        placeholder="john@tata.com"
                      />
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Contact Number
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        value={
                          cppData?.data?.[0]?.Procurement_details?.seller.Contact_no || ""
                        }
                        readOnly
                        name="contact_no"
                        placeholder="987654321"
                      />
                    </div>
                  </div>

                  <div className="m-3 flex flex-wrap">
                    <div className="w-full p-3 md:w-1/5">
                      <p className="text-coolGray-800 text-sm font-semibold"></p>
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Address
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        value={
                          cppData?.data?.[0]?.Procurement_details?.seller.address || ""
                        }
                        readOnly
                        name="address"
                        placeholder="John"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="msme_form">
                <div className="m-3 flex flex-wrap">
                  <div className="w-full p-3 md:w-1/5">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      Vendor Extra Details
                    </p>
                  </div>
                  {/* <div className="w-full p-3 md:flex-1">
                    <Checkbox
                      label="Is Vendor An MSME"
                      variant="h3"
                      className="font-medium"
                      checked={isMSMEChecked}
                      onChange={handleCheckboxChange}
                      // onChange={() => setIsMSMEChecked(!isMSMEChecked)}
                    />
                    ;
                  </div> */}
                  <div className="w-full p-3 md:flex-1">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      Registration Number
                    </p>

                    <input
                      className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                      type="text"
                      value={
                        cppData?.data?.[0]?.Procurement_details?.seller.MSME_registration_no || ""
                      }
                      readOnly
                      name="registration_no"
                      placeholder="John"
                    />
                  </div>
                </div>

                <div className="m-3 flex flex-wrap">
                  <div className="w-full p-3 md:w-1/5">
                    <p className="text-coolGray-800 text-sm font-semibold"></p>
                  </div>

                  <div className="w-full p-3 md:flex-1">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      Seller Gender
                    </p>
                    <input
                      className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                      type="text"
                      value={
                        cppData?.data?.[0]?.Procurement_details?.seller.MSE_Gender || ""
                      }
                      readOnly
                      name="gender"
                      placeholder="Male"
                    />

                  </div>
                  <div className="w-full p-3 md:flex-1">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      Seller Social Category
                    </p>

                    <input
                      className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                      type="text"
                      value={
                        cppData?.data?.[0]?.Procurement_details?.seller.MSE_Social_Category || ""
                      }
                      readOnly
                      name="social_category"
                      placeholder="John"
                    />
                    
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default FetchedCpp;
