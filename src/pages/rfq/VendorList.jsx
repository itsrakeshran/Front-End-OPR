

import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    StrictMode
} from "react";
import { AgGridReact } from '@ag-grid-community/react'; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useMyContext } from 'contexts/RfqItemContex';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
ModuleRegistry.registerModules([ClientSideRowModelModule]);
import axios from 'axios'


const VendorList = ({ setSelectedVendor, selectedVendor }) => {
    const {
        rfqItemList,
        oprItemlist,
        itemCount,
        setSelectedRowsIds,
        vendorListByIds
    } = useMyContext();

    const gridRef = useRef(null);

    const handleSubmit = () => {
        if (gridRef.current) {
            gridRef.current.api.deselectAll();
        }
        // Other submit logic here
    };

    useEffect(() => {
        if ([selectedVendor].length == 0) {
            handleSubmit()
        }

    }, [selectedVendor])


    const [vendorlist, setVendorlist] = useState();

    // useEffect(() => {
    //     // item = rfqItemList.map(item => item.item_id);
    //     if (rfqItemList) {
    //         let itemids = rfqItemList.map(item => item.item_id);
    //         setRowData(vendorListByIds(itemids))
    //     }

    // }, [rfqItemList]);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const result = await axios.get('http://192.168.1.6:4000/vendor');
                setVendorlist(result.data); // Ensure you access the data property of the response
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once




    //table column definition
    const [colDefs, setColDefs] = useState([
        { field: 'vendor_id', headerName: 'Vendor ID', filter: true, editable: true, checkboxSelection: true, headerCheckboxSelection: true },
        { field: 'vendor_name', headerName: 'Vendor Name' },
        // { field: 'items', headerName: 'ItemList' },
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

    const onSelectionChanged = (event) => {
        const selectedRows = event.api.getSelectedRows();
        setSelectedVendor(selectedRows);
    };


    return (
        <div className="ag-theme-quartz" style={{ width: '100%', height: '450px' }}>
            <AgGridReact
                // pagination={pagination}
                // paginationPageSize={paginationPageSize}
                // paginationPageSizeSelector={paginationPageSizeSelector}
                rowData={vendorlist}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                rowSelection="multiple"
                onSelectionChanged={onSelectionChanged}
            />
        </div>
    );
}




export default VendorList;
