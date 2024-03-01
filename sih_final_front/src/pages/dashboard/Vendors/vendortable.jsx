import React, { useRef, useEffect, useState } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Sort, Search, PdfExport, ExcelExport, Filter, Inject, Toolbar } from '@syncfusion/ej2-react-grids';
import { data } from '../../table_dummy_data/data';

import { Typography } from '@material-tailwind/react';

function VendorsTable() {
    let gridInstance = useRef(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const filterType = [
        { text: 'Menu', value: 'Menu' },
        { text: 'Checkbox', value: 'CheckBox' },
        { text: 'Excel', value: 'Excel' },
    ];

    const filterSettings = { type: 'Menu' };
    const fields = { text: 'text', value: 'value' };
    const format = { type: 'datetime', format: 'd/M/y' };

    const onChange = (sel) => {
        gridInstance.current.filterSettings.type = sel.itemData.value;
        gridInstance.current.clearFiltering();
    };

    const toolbarOptions = ['Search', 'PdfExport', 'ExcelExport'];

    const toolbarClick = (args) => {
        if (gridInstance.current) {
            if (args.item.id === 'grid_pdfexport') {
                gridInstance.current.pdfExport();
            } else if (args.item.id === 'grid_excelexport') {
                gridInstance.current.excelExport();
            }
        }
    };

    const onFilterMenuOpen = (args) => {
        if (args.columnName === 'OrderDate') {
            const startDatePickerElement = args.filterModel.dlgObj.element.querySelector('.e-start-datepicker');
            const endDatePickerElement = args.filterModel.dlgObj.element.querySelector('.e-end-datepicker');
    
            if (startDatePickerElement && endDatePickerElement) {
                const startDatePicker = startDatePickerElement.ej2_instances[0];
                const endDatePicker = endDatePickerElement.ej2_instances[0];
    
                // Ensure instances are available before setting properties
                if (startDatePicker && endDatePicker) {
                    // Set default values for start and end dates
                    startDatePicker.value = startDate;
                    endDatePicker.value = endDate;
    
                    // Set the min date for the start datepicker
                    startDatePicker.min = null;
                    startDatePicker.max = endDate;
    
                    // Set the max date for the end datepicker
                    endDatePicker.max = new Date(); // Set maximum date to today
                    endDatePicker.min = startDate;
    
                    // Disable dates after today for both date pickers
                    startDatePicker.renderDayCell = disableDatesAfterToday;
                    endDatePicker.renderDayCell = disableDatesAfterToday;
                }
            }
        }
    };
    
    // Function to disable dates after today
    const disableDatesAfterToday = (args) => {
        if (args.date > new Date()) {
            args.isDisabled = true;
        }
    };
        
    
    

    useEffect(() => {
        // Update the state when start or end dates change
        const startDatePickerElement = gridInstance.current.element.querySelector('.e-start-datepicker');
        const endDatePickerElement = gridInstance.current.element.querySelector('.e-end-datepicker');
    
        if (startDatePickerElement && endDatePickerElement) {
            const startDatePicker = startDatePickerElement.ej2_instances[0];
            const endDatePicker = endDatePickerElement.ej2_instances[0];
    
            startDatePicker.addEventListener('change', () => {
                setStartDate(startDatePicker.value);
            });
    
            endDatePicker.addEventListener('change', () => {
                setEndDate(endDatePicker.value);
            });
        }
    }, [gridInstance]);
    

    return (
        <div className='control-pane'>
            <div className='control-section row'>
                <div style={{ padding: '25px 0px' }}>
                    <DropDownListComponent id='ddlelement' dataSource={filterType} fields={fields} change={onChange.bind(this)} index={0} popupHeight='150px' width='200px' />
                </div>
                <GridComponent
                    id='grid'
                    dataSource={data}
                    allowSorting={true}
                    toolbar={toolbarOptions}
                    allowPaging={true}
                    allowPdfExport={true}
                    allowExcelExport={true}
                    toolbarClick={toolbarClick}
                    ref={gridInstance}
                    pageSettings={{ pageSize: 10, pageCount: 5 }}
                    allowFiltering={true}
                    filterSettings={filterSettings}
                    filterMenuOpen={onFilterMenuOpen}
                >
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='100' />
                        <ColumnDirective field='CustomerID' headerText='Customer Name' width='150' />
                        <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format={format} />
                        <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' />
                        <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' />
                    </ColumnsDirective>
                    <Inject services={[Filter, Search, Toolbar, PdfExport, ExcelExport, Page, Sort]} />
                </GridComponent>
            </div>
        </div>
    );
}

export default VendorsTable;
