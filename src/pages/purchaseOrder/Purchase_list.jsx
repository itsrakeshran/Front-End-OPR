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
import Chip from '@mui/material/Chip';
import { maxWidth } from "@mui/system";
ModuleRegistry.registerModules([ClientSideRowModelModule]);



const Button = (p) => {
    const handleClick = () => {
        // p.setRfq(p.getValue(p));
        // p.click();
        p.setQId(p.getValue(p));
        p.setS_Form(true);
    };
    return (
        <Chip
            label={p.getValue(p)}
            color="success"
            onClick={handleClick}
            variant="outlined"
        />
    );

}

const QuotationList = ({ setQId, setS_Form }) => {
    const { rfqItemList, oprItemlist, itemCount, setSelectedRowsIds } = useMyContext();
    const [rowData, setRowData] = useState(oprItemlist);
    const [rfqlist, setRfqlist] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            const result = await axios.get('http://192.168.1.6:4000/po')
            setRfqlist(result.data.data)
        }
        fetchdata();
    }, []);


    const colDefs = [
        {
            field: 'po_id',
            headerName: 'PO ID',
            filter: true,
            cellRenderer: Button,
            cellRendererParams: {
                getValue: (params) => params.value,
                setQId: setQId,
                setS_Form: setS_Form
            },
            maxWidth: '200'
        },
        { field: 'po_number', headerName: 'PO Number' },
        { field: 'rfq_id', headerName: 'Quote ID' },
        { field: 'quote_number', headerName: 'Quote No.' },
        { field: 'vendor_id', headerName: 'Vendor Id' },
        { field: 'vendor_name', headerName: 'Vendor Name' },
        {
            field: 'created_on', headerName: 'Creation Date', sortable: true,
            sort: 'desc'
        },
        { field: 'amount', headerName: 'Final Amount' }

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
            // Default sort order is ascending
        };
    }, []);


    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 15, 20];

    const handleSelectionChanged = (event) => {
        const selectedRows = event.api.getSelectedRows();
        setSelectedRowsIds(selectedRows.map(obj => obj.id));
        console.log(selectedRows.map(obj => obj.id));
    };

    const gridProps = {
        pagination: true,
        paginationPageSize: 10,
        paginationPageSizeSelector: [10, 15, 20],
        rowData: rfqlist,
        columnDefs: colDefs,
        defaultColDef: defaultColDef,
        frameworkComponents: { rfqNumberCellRenderer }
    };


    // Container: Defines the grid's theme & dimensions.
    return (

        <div className="ag-theme-quartz" style={{ width: '100%', height: '800px' }}>
            <AgGridReact {...gridProps} />
        </div>
    );
}


export default QuotationList;
