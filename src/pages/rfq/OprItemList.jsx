import React, {
  useMemo,
  useEffect,
  useState,
  useRef
} from "react";

import {
  Box,
  TextField,
  Typography
} from '@mui/material'

import axios from "axios";
import { AgGridReact } from '@ag-grid-community/react'; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useMyContext } from 'contexts/RfqItemContex';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
ModuleRegistry.registerModules([ClientSideRowModelModule]);
// import 'dotenv/config';

// const 192.168.1.6 = process.env.API_LOCAL_HOST;



const OprItemListPage = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemlist = await axios.get('http://192.168.1.6:4000/opr/items');
        setRowData(itemlist.data.data); // Ensure you access the data property of the response

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fetchData();
  }, []);


  const {
    oprItemlist,
    setSelectedRows
  } = useMyContext();

  const gridApiRef = useRef(null);

  const onFilterTextBoxChanged = () => {
    gridApiRef.current.setQuickFilter(document.getElementById('filter-text-box').value);
  };


  const [rowData, setRowData] = useState([]);


  const [colDefs, setColDefs] = useState([
    { field: 'Item_opr_id', headerName: 'Ref Id', filter: true, checkboxSelection: true, headerCheckboxSelection: true },
    { field: 'opr_id', headerName: 'Opr Number' },
    { field: 'stock_item_id', headerName: 'Item Code' },
    { field: 'stock_item', headerName: 'Item Name' },
    { field: 'item_description', headerName: 'Item Description' },
    { field: 'orp_qty', headerName: 'Req Qty' },
  ]);


  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      flex: 1,
    };
  }, []);

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 15, 20];

  const handleSelectionChanged = (event) => {
    const selectedRows = event.api.getSelectedRows();
    setSelectedRows(selectedRows);
  };



  // Container: Defines the grid's theme & dimensions.
  return (
    <>
      <Box display={'flex'} alignItems={'center'} my={'10px'} mx={'20px'} gap={'10px'}>
        <Typography variant="box1">
          Search:
        </Typography>
        <TextField
          variant="outlined"
          type="text"
          id="filter-text-box"
          placeholder="Type to filter..."
          onInput={onFilterTextBoxChanged}
        ></TextField>
      </Box >

      <div className="ag-theme-quartz" style={{ width: '100%', height: '900px' }}>
        <AgGridReact
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          rowData={rowData}
          columnDefs={colDefs}
          // defaultColDef={defaultColDef}
          rowSelection="multiple"
          onSelectionChanged={handleSelectionChanged}
          onGridReady={params => gridApiRef.current = params.api}
        />

      </div>

    </>
  );
}

export default OprItemListPage;


