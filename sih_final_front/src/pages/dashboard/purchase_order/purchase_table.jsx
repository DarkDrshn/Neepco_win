import * as React from "react";
import { useState, useEffect } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Search,
  PdfExport,
  ExcelExport,
  Filter,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { data } from "../../table_dummy_data/data";
import axios from "axios";

import { Typography } from "@material-tailwind/react";

function Purchase_Order_Table() {
  const [podata, setpodata] = useState(null);
  const [loading, setLoading] = useState(true);
      
        
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:1508/api/allprocurements',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            },
             { withCredentials: true });
            
            if (response.status === 201) {
                const firstItem = response.data['data'];
                console.log('Data received from API:', firstItem);
                setpodata(firstItem);
            } else if (response.status === 404) {
                console.log('Data is not existing');
                // Handle this case as needed.
            } else {
                console.error('Unexpected response status:', response.status);
            }
            setLoading(false); // Set loading to false after data is processed
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false); // Set loading to false in case of an error
        }
    };

    fetchData();
}, []);

        



  let gridInstance;
  const filterType = [
    { text: "Menu", value: "Menu" },
    { text: "Checkbox", value: "CheckBox" },
    { text: "Excel", value: "Excel" },
  ];
  const filterSettings = { type: "Menu" };
  const fields = { text: "text", value: "value" };
  const format = { type: "datetime", format: "M/d/y hh:mm a" };
  function onChange(sel) {
    gridInstance.filterSettings.type = sel.itemData.value;
    gridInstance.clearFiltering();
  }
  const toolbarOptions = ["Search", "PdfExport", "ExcelExport"];

  const toolbarClick = (args) => {
    if (gridInstance) {
      if (args.item.id === "grid_pdfexport") {
        gridInstance.pdfExport();
      } else if (args.item.id === "grid_excelexport") {
        gridInstance.excelExport();
      }
    }
  };

  console.log("PO_DATA",podata);

  return (
    
    <div className="control-pane">
        {podata ? (
      <div className="control-section row">
        <div style={{ padding: "25px 0px" }}>
          <DropDownListComponent
            id="ddlelement"
            dataSource={filterType}
            fields={fields}
            change={onChange.bind(this)}
            index={0}
            popupHeight="150px"
            width="200px"
          />
        </div>
        <GridComponent
          id="grid"
          dataSource={podata}
          allowSorting={true}
          toolbar={toolbarOptions}
          allowPaging={true}
          allowPdfExport={true}
          allowExcelExport={true}
          toolbarClick={toolbarClick}
          ref={(grid) => (gridInstance = grid)}
          pageSettings={{ pageSize: 10, pageCount: 5 }}
          allowFiltering={true}
          filterSettings={filterSettings}
        >
          <ColumnsDirective>
          <ColumnDirective
              field="id"
              headerText="Id"
              width="80"
            ></ColumnDirective>
            <ColumnDirective
              field="type"
              headerText="Description"
              width="100"
            ></ColumnDirective>
            <ColumnDirective
              field="type"
              headerText="Vendor Details"
              width="100"
            ></ColumnDirective>
            <ColumnDirective
              field="org_id"
              headerText="Company Name"
              width="150"
            ></ColumnDirective>
            <ColumnDirective
              field="product"
              headerText="Type"
              width="130"
            //   format={format}
            />
            <ColumnDirective
              field="category"
              headerText="Budget"
              width="120"
              format="C2"
            />
            <ColumnDirective
              field="description"
              headerText="Start Date"
              width="150"
            ></ColumnDirective>
            <ColumnDirective
              field="description"
              headerText="Action"
              width="150"
            ></ColumnDirective>
          </ColumnsDirective>
          <Inject
            services={[
              Filter,
              Search,
              Toolbar,
              PdfExport,
              ExcelExport,
              Page,
              Sort,
            ]}
          />
        </GridComponent>
        
      </div>
      ) : (
        <p>Loading...</p>
    )} 
  
    </div>

  );
    
  
}
export default Purchase_Order_Table;