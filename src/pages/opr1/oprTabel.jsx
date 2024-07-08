import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from '@mui/material';
import { GetOpr } from 'Redux/Apis/GetApiCalls';
import { useDispatch, useSelector } from 'react-redux';

const OprTable = ({ setSelectedOpr }) => {
  const dispatch = useDispatch();
  const { oprs, isFetching } = useSelector((state) => state.opr);
  const [oprData, setOprData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOprData();
  }, []);

  useEffect(() => {
    const mappedData = oprs.map((item, index) => ({
      id: index + 1,
      oprID: item.opr_id,
      vertical: item.vertical_name,
      division: item.division_creation,
      buyingFrom: item.buy_from,
      buyinHouse: item.buy_house,
      company_name: item.company_name,
      shipmentMode: item.shipment_mode,
      deliveryTime: item.delivery_timeline,
      department: item.department,
      date: item.opr_date,
      requestedBy: item.requested_by,
      additionalRemarks: item.remarks,
      opr_description: item.opr_description,
      potentialSuppliers: item.suppliers,
      quotationEmailAlert: item.no_quot_email_alert,
      opr_num: item.opr_num,
      quotationEmailAlert: item.no_quot_email_alert
    }));

    setOprData(mappedData);
  }, [oprs]);

  const headingName = [
    {
      field: 'oprID',
      headerName: 'OPR ID',
      width: 80,
      renderCell: (params) => (
        <Link component="button" onClick={() => handleViewClick(params.row)}>
          {params.value}
        </Link>
      )
    },
    { field: 'vertical', headerName: 'Vertical', width: 120 },
    { field: 'company_name', headerName: 'Company', width: 120 },
    { field: 'division', headerName: 'Division', width: 120 },
    { field: 'buyingFrom', headerName: 'Buying From', width: 120 },
    { field: 'buyinHouse', headerName: 'Buying House', width: 120 },
    { field: 'shipmentMode', headerName: 'Shipment Mode', width: 120 },
    { field: 'deliveryTime', headerName: 'Delivery Time', width: 120 },
    { field: 'department', headerName: 'Requested By Department', width: 180 },
    { field: 'requestedBy', headerName: 'Requested By', width: 120 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'additionalRemarks', headerName: 'Additional Remarks', width: 150 },
    { field: 'opr_description', headerName: 'OPR Description', width: 150 },
    { field: 'potentialSuppliers', headerName: 'Potential Suppliers', width: 150 }
  ];

  const getOprData = async () => {
    try {
      await GetOpr(dispatch);
    } catch (error) {
      console.error('Error fetching OPR data:', error);
      setError('Failed to load OPR data');
    }
  };

  const getStockItem = async (oprId) => {
    try {
      const response = await axios.get(`${BASE_URL}/opr/items/${oprId}`);
      console.log('stockData response', response);
      return response.data.map((item, index) => ({
        id: index + 1,
        stockItem: item.stock_item,
        oprQty: item.orp_qty,
        stockItemCode: item.stock_item_code,
        stockInTransit: item.stock_transit,
        stockInHand: item.stock_hand,
        monthlyConsumption: item.monthly_consumption,
        itemDescription: item.item_description,
        cria: item.cria,
        group_name: item.group_name,
        hs_code: item.hs_code,
        item_opr_id: item.item_opr_id,
        item_type: item.item_type,
        opr_id: item.opr_id,
        subgroup: item.subgroup,
        unit_of_measurement: item.unit_of_measurement
      }));
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError('Failed to load stock data');
      return [];
    }
  };

  const handleViewClick = async (opr) => {
    const stockItems = await getStockItem(opr.oprID);
    setSelectedOpr({ ...opr, stockItems });
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <DataGrid
          loading={isFetching}
          rows={oprData}
          columns={headingName}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{ cursor: 'pointer' }}
        />
      </div>
    </>
  );
};

export default OprTable;
