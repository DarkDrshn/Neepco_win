import React, {useState} from "react";
import { 
   Button,
   Typography,  
   Checkbox,
   Card,
   List,
   ListItem,
   ListItemPrefix,
 } from "@material-tailwind/react";
import axios from "axios";
import { categories } from "../purchase_order/categories";

export function BudgetCreate() {


  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedamttype, setSelectedamttype] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State to store selected category
  // const isSmallScale = document.getElementsByName("small_scale").checked ? "1" : "0";
  const [isSmallScale, setIsSmallScale] = useState(false);
  // State to store selected Socialcategory

  const handleUnitChange = (event) => {
    const { value } = event.target;
    setSelectedUnit(value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleamounttype = (event) => {
    const { value } = event.target;
    setSelectedamttype(value);
  };

  const adminId = localStorage.getItem("user");
  console.log(adminId);
  const parsedObject = JSON.parse(adminId);

// ACCESS DATA
  console.log("ORG_ID",parsedObject.id);


  // console.log(adminId);

  const handleFormSubmit = async () => {

    const formData = {
      org_id:{parsedObject:org_id},
      desc_name: document.getElementsByName("desc_name")[0].value,
      category: selectedCategory,
      is_small_scale: isSmallScale,
      source: document.getElementsByName("source")[0].value,
      quantity: document.getElementsByName("quantity")[0].value,
      quantity_unit: selectedUnit,
      budget_total:document.getElementsByName("budget_total")[0].value,
      budget_other_mse:document.getElementsByName("budget_other_mse")[0].value,
      budget_mse_scst_inc_entrep:document.getElementsByName("budget_mse_scst_inc_entrep")[0].value,
      budget_mse_scst_own_entrep:document.getElementsByName("budget_mse_scst_own_entrep")[0].value,
      budget_mse_scst_women:document.getElementsByName("budget_mse_scst_women")[0].value,
      year:document.getElementsByName("year")[0].value,
      gross_amt: selectedamttype === "Gross Amout" ? "1" : "0",
      net_amt: selectedamttype === "Net Amount" ? "1" : "0",
      // start_date:document.getElementsByName("startDate")[0].value,
      // end_date:document.getElementsByName("end_date")[0].value,
    };

    console.log(JSON.stringify(formData, null, 2))

    try {
      const response = await axios.post(
        "http://localhost:1508/api/budgetcreate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      console.log("API Response:", response.data);

      alert("Budget Created");


      // Add any additional logic or state updates after successful submission
    } catch (error) {
      console.error("Error submitting BUDGET form:", error);
      alert(error)
      // Handle errors or display an error message to the user
    }
  };

  return (
    <>
      <Typography variant="h3" className="mx-16" color="blue-gray">
        Budget Creation
      </Typography>
      <div className="mx-16">
        <div>
          <a href="/dashboardAdmin/home">
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
                      BUDGETS/ Create Budget Details 
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
                      <p className="text-coolGray-800 text-sm font-semibold">BUDGET BASIC DETAILS</p>
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Description
                      </p>

                      <textarea
                        name="desc_name"
                        type="text"
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
                        name="category" // Set the name attribute
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
                        name="quantity_unit" // Set the name attribute
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
                        Type of Amount {" "}
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
                        onChange={handleamounttype}
                        value={selectedamttype}
                        name="unit" // Set the name attribute
                      >
                        <option value="" disabled>Select</option>
                        <option value="Gross Amout">Gross Amout</option>
                        <option value="Net Amount">Net Amount</option>
                      
                      </select>
                    </div>

                    
                    <div className="w-full p-3 md:flex-1">
                    <Card className="w-full shadow-none ">
                    <List className="flex-row mt-1">
                      <ListItem className="p-0">
                        <label
                          htmlFor="horizontal-list-react"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Checkbox
                            name="small_scale"
                              id="horizontal-list-react"
                              ripple={true}
                              onChange={() => setIsSmallScale(!isSmallScale)}
                              className="hover:before:opacity-0"
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Is Small Scale 
                          </Typography>
                        </label>
                      </ListItem>
          
                    </List>
                  </Card>
                    </div>
                
                  </div>

                  <div className="m-3 flex flex-wrap">
                    <div className="w-full p-3 md:w-1/5">
                      <p className="text-coolGray-800 text-sm font-semibold"></p>
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Source
                      </p>

                      <input
                        name="source"
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
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
                        Budget Details
                      </p>
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Total Amount
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        name="budget_total"
                        placeholder="John"
                      />
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Year
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        name="year"
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
                        Budget for MSE including SC/ST 
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        name="budget_mse_scst_inc_entrep"
                        placeholder="John"
                      />
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        MSE Budget specifically for SC/ST 
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        name="budget_mse_scst_own_entrep"
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
                        Budget for Women MSE
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        name="budget_mse_scst_women"
                        placeholder="John"
                      />
                    </div>
                    <div className="w-full p-3 md:flex-1">
                      <p className="text-coolGray-800 text-sm font-semibold">
                        Budget for other than MSE Vendors 
                      </p>

                      <input
                        className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-blue-500"
                        type="text"
                        name="budget_other_mse"
                        placeholder="John"
                      />
                    </div>
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

export default BudgetCreate;
