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


function CreateUsers() {

  const [buyerChecked, setBuyerChecked] = useState(false);
  const [consigneeChecked, setConsigneeChecked] = useState(false);
  const [paoChecked, setPaoChecked] = useState(false);


  const handleFormSubmit = async () => {
    const formData = {
      userId: document.getElementsByName("org_id")[0].value,
      email: document.getElementsByName("email_id")[0].value,
      gstin: document.getElementsByName("Gst_in")[0].value,
      name: document.getElementsByName("Emp_name")[0].value,
      phone: document.getElementsByName("phone_no")[0].value,
      designation: document.getElementsByName("designation")[0].value,
      buyer: buyerChecked,
      consignee: consigneeChecked,
      pao: paoChecked,
    };

    console.log(JSON.stringify(formData, null, 2))

    try {
      const response = await axios.post(
        "http://localhost:1508/api/invite/emp",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
        { withCredentials:true }
      );
      console.log("API Response:", response.data);
      alert("Employee Created Successfully !!");

      // Add any additional logic or state updates after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors or display an error message to the user
    }
  };

  const adminId = localStorage.getItem('user');
  const parsedObject = JSON.parse(adminId);

// ACCESS DATA
  console.log(parsedObject.id);
  // console.log(adminId);






  return (
    <>
      <Typography variant="h3" color="blue-gray" className="px-6">
        Create Employee
      </Typography>
      <section className="bg-coolGray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="border-coolGray-100 shadow-dashboard h-full overflow-hidden rounded-md border bg-white p-6">
            <div className="border-coolGray-100 border-b pb-6">
              <div className="-m-2 flex flex-wrap items-center justify-between">
                <div className="w-full p-2 md:w-auto">
                  <h2 className="text-coolGray-900 text-lg font-semibold">
                    Employee Details Form
                  </h2>
                  <p className="text-coolGray-500 text-xs font-medium">
                    Create and manage Employee for the organization easily!
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
                      className="shadow-button flex w-full flex-wrap justify-center rounded-md border border-blue-gray-500 bg-[#379cf0] px-4 py-2 text-sm font-medium text-white hover:bg-[#2289df]">
                        <p>Create / Invite</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM */}

            <div className="border-coolGray-100 border-b py-6">
              <div className="w-full ">
                <div className="m-3 flex flex-wrap">
                  <div className="w-full p-3 md:w-1/5">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      Organization Detail
                    </p>
                  </div>
                  <div className="w-full p-3 md:flex-1">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      Organization Id
                    </p>

                    <input
                      className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-[#42a5f5]"
                      type="text"
                      value={"36"}
                      name="org_id"
                      placeholder=""
                      readOnly
                    />
                  </div>
                </div>

                <div className="m-3 flex flex-wrap">
                  <div className="w-full p-3 md:w-1/5">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      Basic Details
                    </p>
                  </div>
                  <div className="w-full p-3 md:flex-1">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      Email-Id
                    </p>

                    <input
                      className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-[#42a5f5]"
                      type="email"
                      name="email_id"
                      placeholder="eg: John Doe"
                    />
                  </div>
                </div>

                <div className="m-3 flex flex-wrap">
                  <div className="w-full p-3 md:w-1/5">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      
                    </p>
                  </div>
                  <div className="w-full p-3 md:flex-1">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      GST_in
                    </p>

                    <input
                      className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-[#42a5f5]"
                      type="text"
                      name="Gst_in"
                      placeholder="eg: Gst_49879549884"
                    />
                  </div>
                </div>

                <div className="m-3 flex flex-wrap">
                  <div className="w-full p-3 md:w-1/5">
                    <p className="text-coolGray-800 text-sm font-semibold"></p>
                  </div>
                  <div className="w-full p-3 md:flex-1">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      Employee Name 
                    </p>

                    <input
                      className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-[#42a5f5]"
                      type="text"
                      name="Emp_name"
                      placeholder="eg: john@neepco.com"
                    />
                  </div>
                  <div className="w-full p-3 md:flex-1">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      Phone No.
                    </p>

                    <input
                      className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-[#42a5f5]"
                      type="text"
                      name="phone_no"
                      placeholder="eg: 987654321"
                    />
                  </div>
                </div>

                <div className="m-3 flex flex-wrap">
                  <div className="w-full p-3 md:w-1/5">
                    <p className="text-coolGray-800 text-sm font-semibold"></p>
                  </div>
                  <div className="w-full p-3 md:flex-1">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      Designation
                    </p>

                    <input
                      className="text-coolGray-900 border-coolGray-600 shadow-input w-full rounded-lg border-2 px-4 py-2.5 text-base font-normal outline-none focus:border-[#42a5f5]"
                      type="text"
                      name="designation"
                      placeholder="eg: Procurement Manager"
                    />
                  </div>
                </div>

                <div className="m-3 flex flex-wrap">
                  <div className="w-full p-3 md:w-1/5">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      Assign Role:
                    </p>
                  </div>
                  <div className="w-full p-3 md:flex-1">

                  <Card className="w-full shadow-none ">
                    <List className="flex-row">
                      <ListItem className="p-0">
                        <label
                          htmlFor="horizontal-list-react"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Checkbox
                            name="buyer"
                              id="horizontal-list-react"
                              ripple={true}
                              checked={buyerChecked}
                              onChange={() => setBuyerChecked(!buyerChecked)}
                              className="hover:before:opacity-0"
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Buyer
                          </Typography>
                        </label>
                      </ListItem>
                      <ListItem className="p-0">
                        <label
                          htmlFor="horizontal-list-vue"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Checkbox
                              name="consignee"
                              id="horizontal-list-vue"
                              ripple={true}
                              checked={consigneeChecked}
                              onChange={() => setConsigneeChecked(!consigneeChecked)}
                              className="hover:before:opacity-0"
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Consignee
                          </Typography>
                        </label>
                      </ListItem>
                      <ListItem className="p-0">
                        <label
                          htmlFor="horizontal-list-svelte"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Checkbox
                              id="horizontal-list-svelte"
                              name="pao"
                              ripple={false}
                              checked={paoChecked}
                              onChange={() => setPaoChecked(!paoChecked)}
                              className="hover:before:opacity-0"
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography color="blue-gray" className="font-medium">
                            Pay and Account
                          </Typography>
                        </label>
                      </ListItem>
                    </List>
                  </Card>
                  </div>

                </div>

                


              </div>
            </div>
{/* 
            <div className="border-coolGray-100 border-b py-6">
              <div className="w-full md:w-9/12">
                <div className="-m-3 flex flex-wrap">
                  <div className="w-full p-3 md:w-1/3">
                    <p className="text-coolGray-800 text-sm font-semibold">
                      Employee Photo (Optional)
                    </p>
                    <p className="text-coolGray-500 text-xs font-medium">
                      Add clear photo with plain background
                    </p>
                  </div>
       
                  <div className="w-full p-3 md:flex-1">
                    <div className="border-coolGray-200 relative flex h-44 flex-col  items-center justify-center rounded-lg border-2 border-dashed text-center text-blue-gray-500 focus-within:border-[#42a5f5]">
                      <svg
                        className="mb-1.5"
                        width="24"
                        height="24"
                        viewbox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.71 7.71L11 5.41V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V5.41L15.29 7.71C15.383 7.80373 15.4936 7.87813 15.6154 7.92889C15.7373 7.97966 15.868 8.0058 16 8.0058C16.132 8.0058 16.2627 7.97966 16.3846 7.92889C16.5064 7.87813 16.617 7.80373 16.71 7.71C16.8037 7.61704 16.8781 7.50644 16.9289 7.38458C16.9797 7.26272 17.0058 7.13202 17.0058 7C17.0058 6.86799 16.9797 6.73729 16.9289 6.61543C16.8781 6.49357 16.8037 6.38297 16.71 6.29L12.71 2.29C12.6149 2.19896 12.5028 2.1276 12.38 2.08C12.1365 1.97999 11.8635 1.97999 11.62 2.08C11.4972 2.1276 11.3851 2.19896 11.29 2.29L7.29 6.29C7.19676 6.38324 7.1228 6.49393 7.07234 6.61575C7.02188 6.73758 6.99591 6.86814 6.99591 7C6.99591 7.13186 7.02188 7.26243 7.07234 7.38425C7.1228 7.50607 7.19676 7.61677 7.29 7.71C7.38324 7.80324 7.49393 7.8772 7.61575 7.92766C7.73757 7.97812 7.86814 8.00409 8 8.00409C8.13186 8.00409 8.26243 7.97812 8.38425 7.92766C8.50607 7.8772 8.61676 7.80324 8.71 7.71ZM21 12C20.7348 12 20.4804 12.1054 20.2929 12.2929C20.1054 12.4804 20 12.7348 20 13V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V13C4 12.7348 3.89464 12.4804 3.70711 12.2929C3.51957 12.1054 3.26522 12 3 12C2.73478 12 2.48043 12.1054 2.29289 12.2929C2.10536 12.4804 2 12.7348 2 13V19C2 19.7957 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7957 22 19V13C22 12.7348 21.8946 12.4804 21.7071 12.2929C21.5196 12.1054 21.2652 12 21 12Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <p className="text-coolGray-800 mb-1 text-sm font-medium">
                        <span className="text-blue-gray-500">
                          Click to Upload a file
                        </span>
                        <span>or drag and drop</span>
                      </p>
                      <p className="text-coolGray-500 text-xs font-medium">
                        PNG, JPG, GIF or up to 10MB
                      </p>
                      <input
                        className="absolute left-0 top-0 h-full w-full opacity-0"
                        type="file"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default CreateUsers;
