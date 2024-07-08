// import React, { useState } from 'react';
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
  useEffect
} from "react";
import MainCard from 'components/MainCard';
import { AgGridReact } from '@ag-grid-community/react'; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useMyContext } from 'contexts/RfqItemContex';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import axios from "axios";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Create new GridExample component
const RfqList = () => {
  // Row Data: The data to be displayed.
  const { rfqItemList, oprItemlist, itemCount, setSelectedRowsIds } = useMyContext();
  const [rowData, setRowData] = useState(oprItemlist);
  const [rfqlist, setRfqlist] = useState([]);


  useEffect(() => {
    const fetchdata = async () => {
      const result = await axios.get('http://192.168.1.6:4000/rfq')
      setRfqlist(result.data.data)

    }
    fetchdata();
  }, [])


  const colDefs = [
    {
      field: 'rfq_num',
      headerName: 'RFQ Number',
      filter: true,
      cellRenderer: 'rfqNumberCellRenderer',
      checkboxSelection: true,
      headerCheckboxSelection: true
    },

    { field: 'vendor_list', headerName: 'Vendor List' },
    { field: 'created_on', headerName: 'Created On', sort: 'desc' },
    { field: 'item_type_count', headerName: 'Item Type Count' },
    { field: 'created_by', headerName: 'Created By' }
  ];

  const rfqNumberCellRenderer = () => {
    const handleClick = () => {
      console.log('RFQ Number clicked:');
    }
  };


  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      flex: 1,
    };
  }, []);


  // const pagination = true;
  // const paginationPageSize = 10;
  // const paginationPageSizeSelector = [10, 15, 20];

  const handleSelectionChanged = (event) => {
    const selectedRows = event.api.getSelectedRows();
    setSelectedRowsIds(selectedRows.map(obj => obj.id));
    console.log(selectedRows.map(obj => obj.id));
  };

  const gridProps = {
    // pagination: true,
    // paginationPageSize: 10,
    // paginationPageSizeSelector: [10, 15, 20],
    rowData: rfqlist,
    columnDefs: colDefs,
    defaultColDef: defaultColDef,
    rowSelection: "multiple",
    frameworkComponents: { rfqNumberCellRenderer },
    onSelectionChanged: handleSelectionChanged
  };



  // Container: Defines the grid's theme & dimensions.
  return (

    <MainCard
      title='RFQ List'>
      <div className="ag-theme-quartz" style={{ width: '100%', height: '800px' }}>
        <AgGridReact {...gridProps} />
      </div>
    </MainCard>
  );
}


export default RfqList;
