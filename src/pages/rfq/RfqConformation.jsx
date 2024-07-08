import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    StrictMode,
    useEffect,
} from "react";

import combineItems from 'utils/ConbineItemQtyById.js';
import { AgGridReact } from '@ag-grid-community/react'; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useMyContext } from 'contexts/RfqItemContex';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
ModuleRegistry.registerModules([ClientSideRowModelModule]);
import MainCard from 'components/MainCard';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button } from '@mui/material'
import VendorList from "./VendorList";
import { isArray } from "lodash";
import axios from "axios";


const CustomButtonComponent = ({ id }) => {
    return (
        <IconButton aria-label="delete">
            <DeleteIcon color="primary" />
        </IconButton>
    );
};


const RfqItemList = () => {

    //import rfq context
    const {
        rfqItemList,
        submitRfq,
        setRfqItemList
    } = useMyContext();

    const [tempItems, setTempItems] = useState([])
    const [selectedVendor, setSelectedVendor] = useState([])
    const [rfqitem, setRftItem] = useState()
    const [itemlist, setItemlist] = useState([])



    useEffect(() => {
        const fetchData = async () => {
            try {
                let ids = { "ids": rfqItemList.map(item => item.Item_opr_id) };
                const result = await axios.post('http://192.168.1.6:4000/itemListforrfq', ids);
                setItemlist(result.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    const handleClick = () => {
        window.alert("clicked")
    }

    const [colDefs, setColDefs] = useState([
        { field: 'stock_item_id', headerName: 'Item Code', textAlign: 'right', headerClass: "ag-center-header" },
        { field: 'item_name', headerName: 'Item Name' },
        { field: 'item_description', headerName: 'Item Description', minWidth: 500 },
        { field: 'total_order', headerName: 'Req Qty' },
        { field: 'quantity_in_stock', headerName: 'Avl Qty' },
        { field: 'orp_qty', headerName: 'Additional Qty', editable: true, },
        {
            field: 'net_qty',
            headerName: 'Net Qty',
            valueGetter: params => params.data.total_order + (+params.data.orp_qty || 0)
        },

        {
            field: 'button',
            headerName: 'Actions',
            cellRenderer: (params) => (
                <CustomButtonComponent
                    id={params.data.stock_item_id}
                    onClick={() => handleClick()}
                />
            ),
            flex: 1
        }


    ]);




    const removeItem = (id) => {
        const confirm = window.confirm(`Deleting item with ID: ${id}`);
        console.log({ "data": itemlist });
        // if (confirm) {
        //     console.log(id);
        //     console.log({ "this": itemlist });
        //     const list = itemlist.filter((item) => {
        //         return (
        //             console.log(item.stock_item_id),
        //             item.stock_item_id !== id
        //         )

        //     })
        //     console.log(list)
        //     // setItemlist(list);
        // }
    }

    const handleSubmit = async () => {
        const data = {
            "itemList": itemlist,
            "vendorList": selectedVendor
        }
        try {
            if (data.itemList.length > 0 && data.vendorList.length > 0) {
                const result = axios.post('http://192.168.1.6:4000/rfq', data);
                setItemlist([])
                setSelectedVendor([]);
                setRfqItemList([])
            } else if (data.itemList.length = 0) {
                window.alert("Item Not Found")
            } else {
                window.alert("Vendor Not Selected")
            }
        } catch (err) {
            console.log({ "Error in rfq submission": err });
        }
    }

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


    return (
        <>
            <MainCard
                title='Item List to Add RFQ'>
                <div className="ag-theme-quartz" style={{ width: '100%', height: '350px' }}>
                    <AgGridReact
                        // pagination={pagination}
                        // paginationPageSize={paginationPageSize}
                        // paginationPageSizeSelector={paginationPageSizeSelector}
                        rowData={itemlist}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                    />
                </div>
            </MainCard>

            <br></br>

            {/* Dispaly vendor list */}
            <MainCard
                title='Select Vendor'>
                <VendorList setSelectedVendor={setSelectedVendor} selectedVendor={selectedVendor} />
            </MainCard >

            <Box display='flex' justifyContent='flex-end' mx={'20px'}>
                <Box display='flex' flexDirection={'row'} gap={'10px'} my={'10px'}>
                    <Button variant="outlined" color="error">Cancle</Button>
                    <Button variant="contained" onClick={() => handleSubmit()}>Submit</Button>
                </Box>
            </Box>
        </>
    );
}



export default RfqItemList;




