import React, { useState,} from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import axios from "axios";
import { categories } from "./categories";
import {useNavigate} from "react-router-dom";

export function ManualPurchase() {

  const [isMSMEChecked, setIsMSMEChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedGender, setSelectedGender] = useState(""); // State to store selected gender
  const [selectedCategory, setSelectedCategory] = useState(""); // State to store selected category
  const [selectedSocialCategory, setSelectedSocialCategory] = useState(""); // State to store selected Socialcategory

  const handleCheckboxChange = () => {
    setIsMSMEChecked(!isMSMEChecked);
  };
  const handleSocialCategoryChange = (event) => {
    setSelectedSocialCategory(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };
  const handleUnitChange = (event) => {
    const { value } = event.target;
    setSelectedUnit(value);
  };
  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
  };

  const navigate = useNavigate();


  const handleFormSubmit = async () => {
    const formData = {
      product: document.getElementsByName("product")[0].value,
      type: selectedValue,
      category: selectedCategory,
      description: document.getElementsByName("description")[0].value,
      quantity: document.getElementsByName("quantity")[0].value,
      unit: selectedUnit,
      amount: document.getElementsByName("amount")[0].value,
      project: document.getElementsByName("prj")[0].value,
      portal: 0,
      portal_id: "null",
      comp_name: document.getElementsByName("comp_name")[0].value,
      contact_no: document.getElementsByName("contact_no")[0].value,
      email_id: document.getElementsByName("email_id")[0].value,
      address: document.getElementsByName("address")[0].value,
      registration_no: document.getElementsByName("reg_no")[0].value,
      social_category: selectedSocialCategory, // Assuming you want to use selectedCategory here, update accordingly
      gender: selectedGender,
      GST_in: document.getElementsByName("GST_in")[0].value,
      start_date: document.getElementsByName("start_date")[0].value,
      end_date: document.getElementsByName("end_date")[0].value,
    };

    console.log(JSON.stringify(formData, null, 2))

    try {
      const response = await axios.post(
        "http://localhost:1508/api/addprocure",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      console.log("API Response:", response.data);
      alert("Procurement Details Added !!");
      navigate('/dashboardemp/')
    
      // Add any additional logic or state updates after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors or display an error message to the user
    }
  };

  return (
    <>
      <Typography variant="h3" className="mx-16" color="blue-gray">
        Manual Purchase Creation
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
                      Procurement/ Purchase Order Details
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
                        Project / Department
                      </p>

                      <input
                        name="prj"
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        placeholder="eg: ABDKC"
                      />
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Type
                      </p>
                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 transform"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z"
                          fill="#8896AB"
                        ></path>
                      </svg>
                      <select
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        onChange={handleSelectChange}
                        value={selectedValue}
                        name="type" // Set the name attribute
                      >
                        <option value="">Select</option>
                        <option value="Product">Product</option>
                        <option value="Services">Services</option>
                      </select>
                    </div>
                  </div>
                  <div className="m-3 flex flex-wrap">
                    <div className="w-full p-3 md:w-1/5">
                      <p className="text-coolGray-800 text-sm font-semibold"></p>
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Select Category
                      </p>
                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 transform"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z"
                          fill="#8896AB"
                        ></path>
                      </svg>
                      <select
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        onChange={handleCategoryChange}
                        value={selectedCategory}
                        name="unit" // Set the name attribute
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Other Category
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        name="other_cat"
                        placeholder="eg: Ambulance stretcher"
                      />
                    </div>
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
                        name="quantity"
                        placeholder="John"
                      />
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Units{" "}
                      </p>
                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 transform"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z"
                          fill="#8896AB"
                        ></path>
                      </svg>
                      <select
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        onChange={handleUnitChange}
                        value={selectedUnit}
                        name="unit" // Set the name attribute
                      >
                        <option value="">Select</option>
                        <option value="KiloGram">KiloGram</option>
                        <option value="Lot">Lot</option>
                        <option value="Packs">Packs</option>
                        <option value="Unit">Unit</option>
                        <option value="Piece">Piece</option>
                      </select>
                    </div>

                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Amount{" "}
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        name="amount"
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
                        name="start_date"
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
                      name="reg_no"
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

                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 transform"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z"
                        fill="#8896AB"
                      ></path>
                    </svg>
                    <select
                      name="gender" // Add name attribute
                      className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                      value={selectedGender}
                      onChange={handleGenderChange}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="w-full p-3 md:flex-1">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      Seller Social Category
                    </p>

                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 transform"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z"
                        fill="#8896AB"
                      ></path>
                    </svg>
                    <select
                      name="category" // Add name attribute
                      className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                      value={selectedSocialCategory}
                      onChange={handleSocialCategoryChange}
                    >
                      <option value="">Select</option>
                      <option value="general">General</option>
                      <option value="scst">SC/ST</option>
                      <option value="obc">OBC</option>
                    </select>
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

export default ManualPurchase;
