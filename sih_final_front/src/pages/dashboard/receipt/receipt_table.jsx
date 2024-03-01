import * as React from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Sort,Search,PdfExport, ExcelExport, Filter, Inject, Toolbar } from '@syncfusion/ej2-react-grids';
import { data } from '../../table_dummy_data/data';

import { Typography } from '@material-tailwind/react';

function Receipt_Table() {
    let gridInstance;
    const filterType = [
        { text: 'Menu', value: 'Menu' },
        { text: 'Checkbox', value: 'CheckBox' },
        { text: 'Excel', value: 'Excel' },
    ];
    const filterSettings = { type: 'Menu' };
    const fields = { text: 'text', value: 'value' };
    const format = { type: 'datetime', format: 'M/d/y hh:mm a' };
    function onChange(sel) {
        gridInstance.filterSettings.type = sel.itemData.value;
        gridInstance.clearFiltering();
    }
    const toolbarOptions = ['Search','PdfExport','ExcelExport'];

    const toolbarClick = (args) => {
        if (gridInstance) {
            if (args.item.id === 'grid_pdfexport') {
                gridInstance.pdfExport();
            }
            else if (args.item.id === 'grid_excelexport') {
                gridInstance.excelExport();
            }
        }
        
    };

    return (<div className='control-pane'>
           <div className='control-section row'>
                <div style={{ padding: '25px 0px' }}>
                    <DropDownListComponent id="ddlelement" dataSource={filterType} fields={fields} change={onChange.bind(this)} index={0} popupHeight="150px" width="200px"/>
                </div>
                <GridComponent id='grid' dataSource={data} allowSorting={true} toolbar={toolbarOptions} allowPaging={true} allowPdfExport={true} allowExcelExport={true} toolbarClick={toolbarClick} ref={grid => gridInstance = grid} pageSettings={{ pageSize: 10, pageCount: 5 }} allowFiltering={true} filterSettings={filterSettings}>
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='100' ></ColumnDirective>
                        <ColumnDirective field='CustomerID' headerText='Customer Name' width='150'></ColumnDirective>
                        <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format={format} />
                        <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' />
                        <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Filter,Search,Toolbar,PdfExport, ExcelExport ,Page, Sort]}/>
                </GridComponent>
            </div>

        </div>);
}
export default Receipt_Table;