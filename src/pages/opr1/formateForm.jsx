import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Select,
  MenuItem,
  TextField,
  Box,
  IconButton,
  Button,
  Grid,
  FormControl,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import axios from 'axios';
import { BASE_URL } from 'AppConstants';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { GetItems, GetOprDraft } from 'Redux/Apis/GetApiCalls';

const FormateForm = ({ onSuccessfulSubmit, onEditClick }) => {
  const { items, error: itemsError, isFetching: itemsLoading } = useSelector((state) => state.itemMaster);
  const { oprDraftData, isFetching: oprDraftLoading, error: draftError } = useSelector((state) => state.opr);
  const dispatch = useDispatch();
  const [showTableBodies, setShowTableBodies] = useState({
    createOPR: true,
    itemsDetail: true,
    itemsTable: true,
    viewOprDetail: false,
    basicInfo: true,
    requestDetails: true,
    shipmentDetail: true
  });
  const initialStockItemValues = {
    stockItems: [
      {
        stockItem: [],
        oprQty: '',
        stockItemCode: '',
        stockInTransit: '',
        stockInHand: '',
        monthlyConsumption: '',
        itemDescription: ''
      }
    ]
  };
  const [itemList, setItemList] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState([]);
  const [shipmentMode, setShipmentMode] = useState([]);
  const [reqByDept, setReqByDept] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [hsnMessage, setHsnMessage] = useState('');
  const [verticalData, setVerticalData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [buyingHouseData, setBuyingHouseData] = useState([]);
  const [showBuyingHouse, setShowBuyingHouse] = useState(false);
  const [oprId, setOprId] = useState(null);
  const [oprData, setOprData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [formMode, setFormMode] = useState('create');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItemCode, setSelectedItemCode] = useState('');
  const [selectedHSNItem, setSelectedHSNItem] = useState(null);
  const [initialValues, setInitialValues] = useState({
    vertical: '',
    company: '',
    division: '',
    buyFrom: '',
    buyingHouse: '',
    requestByDepartment: '',
    requestedBy: '',
    quotationsEmailAlert: '',
    shipmentMode: '',
    deliveryTimeline: '',
    date: '',
    oprDescription: '',
    additionalRemark: '',
    potentialSuppliers: ''
  });

  useEffect(() => {
    getLoadDivisions();
    getDeliveryTime();
    getShipmentMode();
    getReqByDepartment();
    getVertical();
    getBuyingHouse();

    getStockitems();
    getStockItemsForConfirm(oprId);

    // getHSNCode();``
  }, []);

  useEffect(() => {
    if (formMode === 'edit' && oprId) {
      fetchOPRData(oprId);
    }
  }, [formMode, oprId]);

  useEffect(() => {
    // Log the initialValues whenever they change
    console.log('ini......', initialValues);
  }, [initialValues]);

  const validationSchema = Yup.object().shape({
    vertical: Yup.string().required('Field is required'),
    company: Yup.string().required('Field is required'),
    division: Yup.string().required('Field is required'),
    buyFrom: Yup.string().required('Field is required'),
    // buyingHouse: Yup.string().required('Fieldis required'),
    requestByDepartment: Yup.string().required('Field is required'),
    requestedBy: Yup.string().required('Field is required'),
    quotationsEmailAlert: Yup.string().required('Field is required'),
    shipmentMode: Yup.string().required('Field is required'),
    deliveryTimeline: Yup.string().required('Field is required'),
    date: Yup.date().required('Field is required')
    // oprDescription: Yup.string().required('OPR Description is required'),
    // additionalRemark: Yup.string().required('Additional Remark is required'),
    // potentialSuppliers: Yup.string().required('Potential Suppliers is required')
  });
  // Initial values for Stock Items Formik form

  // Yup validation schema for Stock Items Formik form
  const validationSchemaItems = Yup.object().shape({
    stockItems: Yup.array().of(
      Yup.object().shape({
        stockItem: Yup.string().required('Stock Item is required'),
        oprQty: Yup.number().required('OPR Quantity is required'),
        // stockItemCode: Yup.string().required('Stock Item Code is required'),
        stockInTransit: Yup.number().required('Stock In Transit is required'),
        stockInHand: Yup.number().required('Stock In Hand is required'),
        monthlyConsumption: Yup.number().required('Monthly Consumption is required'),
        itemDescription: Yup.string().required('Item Description is required')
      })
    )
  });

  const handleBuyFromChange = (event, setFieldValue) => {
    const value = event.target.value;
    setFieldValue('buyFrom', value);
    setShowBuyingHouse(value === 'Buying House');
  };
  // Toggle function to switch the visibility of a specific table body
  const toggleTableBody = (section) => {
    setShowTableBodies((prevState) => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  const handleSelectChange = async (e, index) => {
    const { value } = e.target;
    const newItemList = [...itemList];
    newItemList[index] = { ...newItemList[index], stockItem: value };
    setItemList(newItemList);

    await handleItemChange(e);
  };

  const handleTextFieldChange = (e, index) => {
    const { name, value } = e.target;
    const newItemList = [...itemList];
    newItemList[index] = { ...newItemList[index], [name]: value };
    setItemList(newItemList);
  };

  // Function to render table headers with toggle icons
  const renderTableHeader = (sectionName, sectionLabel) => (
    <TableHead>
      <TableRow>
        <TableCell colSpan={6}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600}>
              {sectionLabel}
            </Typography>
            <Box>
              {sectionName === 'viewOprDetail' && (
                <IconButton
                  size="large"
                  onClick={() => {
                    console.log('oprIDDDDd', oprId);
                    handleOPREdit(oprId);
                    if (onEditClick) {
                      onEditClick();
                    }
                  }}
                >
                  <EditOutlinedIcon />
                </IconButton>
              )}
              <IconButton size="large" onClick={() => toggleTableBody(sectionName)}>
                {showTableBodies[sectionName] ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
              </IconButton>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    </TableHead>
  );

  const columns = [
    { field: 'id', headerName: 'Sr. No.', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'subGroup', headerName: 'Sub Group', flex: 1 },
    { field: 'stockItemCode', headerName: 'Stock Item Code', flex: 1 },
    { field: 'stockItem', headerName: 'Stock Item Name', flex: 1 },
    { field: 'itemDescription', headerName: 'Item Description', flex: 1 },
    { field: 'hsnCode', headerName: 'HSN Code', flex: 1 },
    { field: 'nafdac', headerName: 'NAFDAC', flex: 1 },
    { field: 'cria', headerName: 'Cria', flex: 1 },
    { field: 'son', headerName: 'SON', flex: 1 },
    { field: 'uom', headerName: 'UOM', flex: 1 },
    { field: 'stockInTransit', headerName: 'Stock In Transit', flex: 1 },
    { field: 'stockInHand', headerName: 'Stock In Hand', flex: 1 },
    { field: 'monthlyConsumption', headerName: 'Monthly Consumption', flex: 1 },
    { field: 'oprQty', headerName: 'OPO Qty', flex: 1 },
    { field: 'shortCloseQty', headerName: 'Short Close Qty', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary" onClick={() => handleEditRow(params.id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteRow(params.id)}>
            <DeleteIcon color="red" />
          </IconButton>
        </Box>
      )
    }
  ];

  const getStockItemsForConfirm = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/opr/items/${id}`);
      console.log('stock responcse', response);
      const mappedData = response.data.map((item, index) => ({
        id: index + 1,
        stockItem: item.stock_item,
        oprQty: item.orp_qty,
        stockItemCode: item.stock_item_code,
        stockInTransit: item.stock_transit,
        stockInHand: item.stock_hand,
        monthlyConsumption: item.monthly_consumption,
        itemDescription: item.item_description,
        group_name: item.group_name,
        subGroup: item.subgroup,
        cria: item.cria,
        uom: item.unit_of_measurement,
        type: item.item_type,
        hsnCode: item.hs_code,
        nafdac: item.nafdac_name
      }));
      setStockData(mappedData);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        stockData: 'Failed to load stock data'
      }));
    }
  };

  const fetchOPRData = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/opr/${id}`);
      console.log('----------Api Data---------');
      console.log('response', response);
      console.log('editmode', response.data[0]);
      const data = response.data[0]; // Assuming response.data contains the data
      console.log(data);
      const mappedData = {
        vertical: data.vertical_id,
        company: data.company_name,
        division: data.division_creation,
        buyFrom: data.buy_from,
        buyingHouse: data.buy_house,
        requestByDepartment: data.department,
        requestedBy: data.requested_by,
        quotationsEmailAlert: data.no_quot_email_alert,
        shipmentMode: data.shipment_mode,
        deliveryTimeline: data.delivery_timeline,
        date: data.opr_date,
        oprDescription: data.opr_description,
        additionalRemark: data.remarks,
        potentialSuppliers: data.suppliers
      };

      console.log('----------Mapped Data---------');
      console.log(mappedData);
      console.log('----------Initial State Data---------');
      console.log(initialValues);

      setInitialValues(mappedData);
      console.log('ini......', initialValues, mappedData);
    } catch (error) {
      console.error('Error fetching OPR data:', error);
    }
  };

  const handleOPREdit = (id) => {
    setOprId(id);
    setFormMode('edit');
    setShowTableBodies((prevState) => ({
      ...prevState,
      createOPR: true,
      viewOprDetail: false
    }));
    fetchOPRData(id);
  };

  useEffect(() => {
    const mappedData = oprDraftData.map((item, index) => ({
      id: index,
      oprID: item.opr_id,
      vertical: item.vertical_name,
      division: item.division_creation,
      buyingFrom: item.buy_from,
      buyingHouse: item.buy_house,
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
      opr_num: item.opr_num
    }));
    setOprData(mappedData);
  }, [oprDraftData]);

  const getOprDraftData = async (id) => {
    try {
      await GetOprDraft(dispatch, id);
      // const response = await axios.get(`${BASE_URL}/opr/draft/${id}`);
      // const mappedData = response.data.map((item, index) => ({
      //   oprID: item.opr_id,
      //   vertical: item.vertical_name,
      //   division: item.division_creation,
      //   buyingFrom: item.buy_from,
      //   buyingHouse: item.buy_house,
      //   company_name: item.company_name,
      //   shipmentMode: item.shipment_mode,
      //   deliveryTime: item.delivery_timeline,
      //   department: item.department,
      //   date: item.opr_date,
      //   requestedBy: item.requested_by,
      //   additionalRemarks: item.remarks,
      //   opr_description: item.opr_description,
      //   potentialSuppliers: item.suppliers,
      //   quotationEmailAlert: item.no_quot_email_alert,
      //   opr_num: item.opr_num,
      //   quotationEmailAlert: item.no_quot_email_alert
      // }));
      // setOprData(mappedData);
      setOprId(id);
    } catch (error) {
      console.error('Error fetching OPR data:', error);
    }
  };

  const getVertical = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/vertical`);
      const formattedVerticalData = response.data.map((item) => ({
        id: item.vertical_id,
        name: item.vertical_name
      }));
      setVerticalData(formattedVerticalData);
    } catch (error) {
      console.error('Error fetching vertical:', error);
      setErrors((prevErrors) => ({
        ...prevErrors
      }));
    }
  };

  const handleVerticalChange = async (event, setFieldValue) => {
    const selectedVerticalId = event.target.value;
    setFieldValue('vertical', selectedVerticalId);

    try {
      const response = await axios.get(`${BASE_URL}/company/${selectedVerticalId}`);
      const formattedCompanyData = response.data.map((item) => ({
        code: item.company_code,
        comanyId: item.company_id,
        name: item.company_name
      }));
      setCompanyData(formattedCompanyData);
    } catch (error) {
      console.error('Error fetching company data:', error);
      setErrors((prevErrors) => ({
        ...prevErrors
      }));
    }
  };
  const getBuyingHouse = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/buyhouse`);
      const buyingHouseData = response.data.map((item) => ({
        id: item.buy_house_id,
        name: item.buy_house_name
      }));
      setBuyingHouseData(buyingHouseData);
    } catch (error) {
      console.error('Error fetching vertical:', error);
      setErrors((prevErrors) => ({
        ...prevErrors
      }));
    }
  };
  const getLoadDivisions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/division`);
      const divisionData = response.data.map((division) => ({
        id: division.division_id,
        name: division.division_creation_option
      }));
      setDivisions(divisionData);
    } catch (error) {
      console.error('Error fetching divisions:', error);
      setErrors((prevErrors) => ({
        ...prevErrors
      }));
    }
  };
  const getShipmentMode = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/mode`);
      const shipmentModeData = response.data.map((shipmentMode) => ({
        id: shipmentMode.shipment_mode_id,
        name: shipmentMode.shipment_mode_option
      }));
      setShipmentMode(shipmentModeData);
    } catch (error) {
      console.error('Error fetching timeline:', error);
      setErrors((prevErrors) => ({
        ...prevErrors
      }));
    }
  };
  const getDeliveryTime = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/timeline`);
      const deliveryTimelineData = response.data.map((timeline) => ({
        id: timeline.delivery_timeline_id,
        name: timeline.delivery_timeline_option
      }));
      setDeliveryTime(deliveryTimelineData);
    } catch (error) {
      console.error('Error fetching timeline:', error);
      setErrors((prevErrors) => ({
        ...prevErrors
      }));
    }
  };
  const getReqByDepartment = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/department`);
      const reqByDepartmentData = response.data.map((department) => ({
        id: department.department_id,
        name: department.department_name
      }));
      setReqByDept(reqByDepartmentData);
    } catch (error) {
      console.error('Error fetching department:', error);
      setErrors((prevErrors) => ({
        ...prevErrors
      }));
    }
  };
  const getStockitems = async () => {
    try {
      await GetItems(dispatch);
      // const response = await axios.get(`${BASE_URL}/item`);
      const itemsList = items.map((data) => ({
        id: data.item_id,
        name: data.item_name,
        itemCode: data.item_code
      }));
      setItemsData(itemsList);
    } catch (error) {
      console.error('Error fetching items:', error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        items: 'Error fetching items'
      }));
    }
  };
  const getHSNCode = async (itemId) => {
    try {
      const response = await axios.get(`${BASE_URL}/opr/hsn/${itemId}`);
      console.log('hsn response', response);
      if (response.data.message) {
        setHsnMessage(response.data.message);
      } else {
        setHsnMessage('');
      }
    } catch (error) {
      console.error('Error fetching HSN code:', error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        hsn: 'Error fetching HSN code'
      }));
    }
  };
  const handleItemChange = async (event) => {
    const itemId = event.target.value;
    console.log(itemId);
    setSelectedHSNItem(itemId);
    setHsnMessage('');
    if (itemId) {
      await getHSNCode(itemId);
    }
  };

  const handleOPRSubmit = async (formValues, { resetForm }) => {
    try {
      const postData = {
        vertical: formValues.vertical,
        company_name: formValues.company,
        opr_date: new Date().toISOString(),
        division_id: formValues.division,
        buy_from: formValues.buyFrom,
        buy_house: formValues.buyingHouse,
        shipment_mode_id: formValues.shipmentMode,
        delivery_timeline_id: formValues.deliveryTimeline,
        department_id: formValues.requestByDepartment,
        requested_by: formValues.requestedBy,
        quotations: formValues.quotationsEmailAlert,
        opr_des: formValues.oprDescription,
        remarks: formValues.additionalRemark,
        suppliers: formValues.potentialSuppliers,
        created_by: 'Pooja'
      };
      const response = await axios.post(`${BASE_URL}/opr`, postData);
      setOprId(response.data.opr_id);
      // resetForm();

      getOprDraftData(response.data.opr_id);
      setShowTableBodies((prevState) => ({
        ...prevState,
        createOPR: false,
        viewOprDetail: true
      }));
    } catch (error) {
      console.error('Error submitting OPR:', error);
    }
  };
  const handleOPRUpdate = async (values) => {
    try {
      const putData = {
        opr_id: oprId,
        vertical: values.vertical,
        company_name: values.company,
        opr_date: new Date().toISOString(),
        division_id: values.division,
        buy_from: values.buyFrom,
        buy_house: values.buyingHouse,
        shipment_mode_id: values.shipmentMode,
        delivery_timeline_id: values.deliveryTimeline,
        department_id: values.requestByDepartment,
        requested_by: values.requestedBy,
        quotations: values.quotationsEmailAlert,
        opr_des: values.oprDescription,
        remarks: values.additionalRemark,
        suppliers: values.potentialSuppliers,
        updated_by: 'Pooja'
      };
      const response = await axios.post(`${BASE_URL}/opr/${oprId}`, putData);
      console.log('OPR updated successfully:', response.data);
      getOprDraftData(response.data.opr_id);
      setShowTableBodies((prevState) => ({
        ...prevState,
        viewOprDetail: true,
        createOPR: false
      }));
    } catch (error) {
      console.error('Error updating OPR:', error);
    }
  };

  const handleSubmitStockItems = async (values, { resetForm }) => {
    console.log(itemList);
    try {
      const updatedItemList = itemList.map((item) => ({
        ...item,
        opr_id: oprId,
        created_by: 'Sharma'
      }));

      console.log(updatedItemList);
      const responses = await axios.post(
        `${BASE_URL}/opr/items`,
        { itemsList: updatedItemList },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Responses:', responses);
      setSnackbarMessage('Item Add Successfully');

      setOpenSnackbar(true);

      resetForm();
      setItemList([]);
      getStockItemsForConfirm(oprId);
    } catch (error) {
      console.error('Error adding stock items:', error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleConfirmItems = async () => {
    setOpenDialog(true);
  };

  const handleConfirmDialogClose = async (confirmed) => {
    setOpenDialog(false);
    if (confirmed) {
      try {
        const { data } = await axios.get(`${BASE_URL}/opr/confirmopr/${oprId}`);
        setOpenSnackbar(true);
        setSnackbarMessage('OPR Data added successfully');
        if (onSuccessfulSubmit) {
          onSuccessfulSubmit();
        }
      } catch (error) {
        console.error('Error confirming OPR items:', error);
        // Handle error scenario if needed
      }
    }
  };

  return (
    <>
      {/* ......................................OPR View  ........................... */}
      {showTableBodies.viewOprDetail && (
        <TableContainer component={Paper} sx={{ borderRadius: '0' }}>
          <Table>
            {renderTableHeader('viewOprDetail', 'View OPR Detail')}

            {showTableBodies.viewOprDetail && oprData.length > 0 && (
              <TableBody>
                {oprData.map((oprViewData, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          Vertical:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{oprViewData.vertical}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          Company:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{oprViewData.company_name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          Division:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{oprViewData.division}</Typography>
                      </TableCell>
                      {/* <IconButton size="large" onClick={() => handleEdit(sectionName)}>
                        <EditOutlinedIcon />
                      </IconButton> */}
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          Buying From:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{oprViewData.buyingFrom}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          Buying House:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{oprViewData.buyingHouse}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          Request By Department:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{oprViewData.department}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          Requested By:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{oprViewData.requestedBy}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          Quotations Email Alert:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{oprViewData.quotationEmailAlert}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          Shipment Mode:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{oprViewData.shipmentMode}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          Delivery Timeline:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{oprViewData.deliveryTime}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          Date:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{oprViewData.date}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          OPR Description:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{oprViewData.opr_description}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          Additional Remark:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{oprViewData.additionalRemarks}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                          Potential Suppliers:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{oprViewData.potentialSuppliers}</Typography>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={formMode === 'create' ? handleOPRSubmit : handleOPRUpdate}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            {showTableBodies.createOPR && (
              <TableContainer component={Paper} sx={{ borderRadius: '0' }}>
                <Table>
                  {/* Basic Info Section */}
                  {renderTableHeader('basicInfo', 'Basic Info')}
                  {showTableBodies.basicInfo && (
                    <TableBody>
                      <TableRow sx={{ marginBottom: '10px', marginTop: '10px' }}>
                        <TableCell colSpan={6}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={1}>
                              <Typography variant="body1">
                                Vertical<span className="validation-star">*</span>
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Field
                                as={Select}
                                name="vertical"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => handleVerticalChange(e, setFieldValue)}
                                value={values.vertical}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {verticalData.map((vertical) => (
                                  <MenuItem key={vertical.id} value={vertical.id}>
                                    {vertical.name}
                                  </MenuItem>
                                ))}
                              </Field>
                              <ErrorMessage name="vertical" component="div" className="error-message" />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                              <Typography variant="body1">
                                Company<span className="validation-star">*</span>
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Field as={Select} name="company" variant="outlined" value={values.company} fullWidth>
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {companyData.map((company) => (
                                  <MenuItem key={company.comanyId} value={company.comanyId}>
                                    {company.name}
                                  </MenuItem>
                                ))}
                              </Field>
                              <ErrorMessage name="company" component="div" className="error-message" />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                              <Typography variant="body1">
                                Division<span className="validation-star">*</span>
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Field as={Select} name="division" variant="outlined" value={values.division} fullWidth>
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {divisions.map((division) => (
                                  <MenuItem key={division.id} value={division.id}>
                                    {division.name}
                                  </MenuItem>
                                ))}
                              </Field>
                              <ErrorMessage name="division" component="div" className="error-message" />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                              <Typography variant="body1">
                                Buying From<span className="validation-star">*</span>
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Field
                                as={Select}
                                name="buyFrom"
                                variant="outlined"
                                fullWidth
                                value={values.buyFrom}
                                onChange={(e) => handleBuyFromChange(e, setFieldValue)}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value="Buying House">Buying House</MenuItem>
                                <MenuItem value="Direct">Direct</MenuItem>
                              </Field>
                              <ErrorMessage name="buyFrom" component="div" className="error-message" />
                            </Grid>
                            {showBuyingHouse && (
                              <>
                                <Grid item xs={12} sm={1}>
                                  <Typography variant="body1">Buying House</Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                  <Field as={Select} name="buyingHouse" variant="outlined" value={values.buyingHouse} fullWidth>
                                    <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem>
                                    {buyingHouseData.map((house) => (
                                      <MenuItem key={house.id} value={house.id}>
                                        {house.name}
                                      </MenuItem>
                                    ))}
                                  </Field>
                                  <ErrorMessage name="buyingHouse" component="div" className="error-message" />
                                </Grid>
                              </>
                            )}
                            <Grid item xs={12} sm={1}>
                              <Typography variant="body1">
                                OPR Date<span className="validation-star">*</span>
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Field as={TextField} type="date" name="date" variant="outlined" fullWidth size="small" />
                              <ErrorMessage name="date" component="div" className="error-message" />
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
                <Table>
                  {/* Request Details Section */}
                  {renderTableHeader('requestDetails', 'Request Details')}
                  {showTableBodies.requestDetails && (
                    <TableBody>
                      <TableRow sx={{ marginBottom: '10px', marginTop: '10px' }}>
                        <TableCell colSpan={6}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={1}>
                              <Typography variant="body1">
                                Request By Department<span className="validation-star">*</span>
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Field as={Select} name="requestByDepartment" variant="outlined" value={values.requestByDepartment} fullWidth>
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {reqByDept.map((dept) => (
                                  <MenuItem key={dept.id} value={dept.id}>
                                    {dept.name}
                                  </MenuItem>
                                ))}
                              </Field>
                              <ErrorMessage name="requestByDepartment" component="div" className="error-message" />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                              <Typography variant="body1">
                                Requested By<span className="validation-star">*</span>
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Field
                                as={TextField}
                                name="requestedBy"
                                variant="outlined"
                                value={values.requestedBy}
                                fullWidth
                                size="small"
                              />
                              <ErrorMessage name="requestedBy" component="div" className="error-message" />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                              <Typography variant="body1">
                                Quotations Email Alert<span className="validation-star">*</span>
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Field as={TextField} type="number" name="quotationsEmailAlert" variant="outlined" fullWidth size="small" />
                              <ErrorMessage name="quotationsEmailAlert" component="div" className="error-message" />
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
                <Table>
                  {/* Shipment Details Section */}
                  {renderTableHeader('shipmentDetail', 'Shipment Details')}
                  {showTableBodies.shipmentDetail && (
                    <TableBody>
                      <TableRow sx={{ marginBottom: '10px', marginTop: '10px' }}>
                        <TableCell colSpan={6}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={1}>
                              <Typography variant="body1">
                                Shipment Mode<span className="validation-star">*</span>
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Field as={Select} name="shipmentMode" variant="outlined" value={values.shipmentMode} fullWidth>
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {shipmentMode.map((mode) => (
                                  <MenuItem key={mode.id} value={mode.id}>
                                    {mode.name}
                                  </MenuItem>
                                ))}
                              </Field>
                              <ErrorMessage name="shipmentMode" component="div" className="error-message" />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                              <Typography variant="body1">
                                Delivery Timeline<span className="validation-star">*</span>
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Field as={Select} name="deliveryTimeline" variant="outlined" value={values.deliveryTimeline} fullWidth>
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {deliveryTime.map((time) => (
                                  <MenuItem key={time.id} value={time.id}>
                                    {time.name}
                                  </MenuItem>
                                ))}
                              </Field>
                              <ErrorMessage name="deliveryTimeline" component="div" className="error-message" />
                            </Grid>

                            <Grid item xs={12} sm={1}>
                              <Typography variant="body1">OPR Description</Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Field as={TextField} name="oprDescription" variant="outlined" fullWidth size="small" />
                              <ErrorMessage name="oprDescription" component="div" className="error-message" />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                              <Typography variant="body1">Additional Remark</Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Field as={TextField} name="additionalRemark" variant="outlined" fullWidth size="small" />
                              <ErrorMessage name="additionalRemark" component="div" className="error-message" />
                            </Grid>
                            <Grid item xs={12} sm={1}>
                              <Typography variant="body1">Potential Suppliers</Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Field as={TextField} name="potentialSuppliers" variant="outlined" fullWidth size="small" />
                              <ErrorMessage name="potentialSuppliers" component="div" className="error-message" />
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
                {showTableBodies.shipmentDetail && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
                    <Button variant="outlined" size="small" color="error" sx={{ mr: 2 }}>
                      Cancel
                    </Button>
                    <Button variant="contained" size="small" color="primary" type="submit">
                      {formMode === 'create' ? 'Add Items' : 'Update'}
                    </Button>
                  </Box>
                )}
              </TableContainer>
            )}
          </Form>
        )}
      </Formik>

      {oprId /* ...................................... Create Items ........................... */ && (
        <Formik initialValues={initialStockItemValues} onSubmit={handleSubmitStockItems}>
          {/* <Formik initialValues={initialStockItemValues} validationSchema={validationSchemaItems} onSubmit={handleSubmitStockItems}> */}
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <FieldArray name="stockItems">
                {({ insert, remove, push }) => (
                  <TableContainer component={Paper} sx={{ marginTop: 2, borderRadius: '0' }}>
                    <Table>
                      {renderTableHeader('itemsDetail', 'Add Items')}
                      {showTableBodies.itemsDetail && (
                        <TableBody>
                          {values.stockItems &&
                            values.stockItems.map((item, index) => (
                              <React.Fragment key={index}>
                                <TableRow sx={{ marginBottom: '10px', marginTop: '10px' }}>
                                  <TableCell colSpan={6}>
                                    <Grid container spacing={2} alignItems="center">
                                      <Grid item xs={12} sm={1}>
                                        <Typography variant="body1">Stock Item</Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={2}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                          <Field
                                            name={`stockItem`}
                                            as={Select}
                                            variant="outlined"
                                            fullWidth
                                            // value={itemList[index]?.oprType}
                                            value={itemList[index]?.stockItem || ''}
                                            onChange={(e) => handleSelectChange(e, index)}
                                          >
                                            <MenuItem value="">
                                              <em>None</em>
                                            </MenuItem>
                                            {itemsData.map((data) => {
                                              console.log('itemdata for dropdown', data);
                                              return (
                                                <MenuItem key={data.id} value={data.id}>
                                                  {data.name}
                                                </MenuItem>
                                              );
                                            })}
                                          </Field>

                                          {hsnMessage && (
                                            <Tooltip title={hsnMessage}>
                                              <PriorityHighIcon style={{ marginLeft: '8px', verticalAlign: 'middle', color: 'red' }} />
                                            </Tooltip>
                                          )}
                                        </div>
                                        <ErrorMessage
                                          name={`stockItems.${index}.stockItem`}
                                          component={Typography}
                                          variant="body2"
                                          color="error"
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={1}>
                                        <Typography variant="body1">Stock Item Code</Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={2}>
                                        <Field
                                          value={itemList[index]?.stockItemCode || ''}
                                          name={`stockItemCode`}
                                          as={TextField}
                                          type="number"
                                          variant="outlined"
                                          fullWidth
                                        />
                                        {/* <TextField
                                          variant="outlined"
                                          fullWidth
                                          value={itemList[index]?.stockItemCode || ''}
                                          InputProps={{
                                            readOnly: true
                                          }}
                                        /> */}
                                      </Grid>

                                      <Grid item xs={12} sm={1}>
                                        <Typography variant="body1">OPR Quantity</Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={2}>
                                        <Field
                                          value={itemList[index]?.oprQty}
                                          onChange={(e) => handleTextFieldChange(e, index)}
                                          name={`oprQty`}
                                          as={TextField}
                                          type="number"
                                          variant="outlined"
                                          fullWidth
                                        />

                                        <ErrorMessage
                                          name={`stockItems.${index}.oprQty`}
                                          component={Typography}
                                          variant="body2"
                                          color="error"
                                        />
                                      </Grid>

                                      <Grid item xs={12} sm={1}>
                                        <Typography variant="body1">Stock In Transit</Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={2}>
                                        <FormControl variant="outlined" fullWidth>
                                          <Field
                                            value={itemList[index]?.stockInTransit}
                                            onChange={(e) => handleTextFieldChange(e, index)}
                                            name={`stockInTransit`}
                                            as={TextField}
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                          />
                                          <ErrorMessage
                                            name={`stockItems.${index}.stockInTransit`}
                                            component={Typography}
                                            variant="body2"
                                            color="error"
                                          />
                                        </FormControl>
                                      </Grid>
                                      <Grid item xs={12} sm={1}>
                                        <Typography variant="body1">Stock In Hand</Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={2}>
                                        <Field
                                          value={itemList[index]?.stockInHand}
                                          onChange={(e) => handleTextFieldChange(e, index)}
                                          name={`stockInHand`}
                                          as={TextField}
                                          variant="outlined"
                                          type="number"
                                          fullWidth
                                        />
                                        <ErrorMessage
                                          name={`stockItems.${index}.stockInHand`}
                                          component={Typography}
                                          variant="body2"
                                          color="error"
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={1}>
                                        <Typography variant="body1">Monthly Consumption</Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={2}>
                                        <Field
                                          value={itemList[index]?.monthlyConsumption}
                                          onChange={(e) => handleTextFieldChange(e, index)}
                                          name={`monthlyConsumption`}
                                          as={TextField}
                                          variant="outlined"
                                          type="number"
                                          fullWidth
                                        />
                                        <ErrorMessage
                                          name={`stockItems.${index}.monthlyConsumption`}
                                          component={Typography}
                                          variant="body2"
                                          color="error"
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={1}>
                                        <Typography variant="body1">Item Description</Typography>
                                      </Grid>
                                      <Grid item xs={12} sm={5}>
                                        <Field
                                          value={itemList[index]?.itemDescription}
                                          onChange={(e) => handleTextFieldChange(e, index)}
                                          name={`itemDescription`}
                                          as={TextField}
                                          variant="outlined"
                                          fullWidth
                                          multiline
                                          rows={2}
                                        />
                                        <ErrorMessage
                                          name={`stockItems.${index}.itemDescription`}
                                          component={Typography}
                                          variant="body2"
                                          color="error"
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={1}>
                                        {/* <Typography variant="body1">Item Description</Typography> */}
                                      </Grid>
                                    </Grid>
                                  </TableCell>
                                </TableRow>
                              </React.Fragment>
                            ))}
                          <TableRow>
                            <TableCell colSpan={6}>
                              {/* <Box display="flex" justifyContent={"end"} alignItems={"end"}>
                              <Button
                                variant="outlined"
                                size="small"
                                color="secondary"
                                onClick={() =>
                                  push({
                                    stockItem: '',
                                    oprQty: '',
                                    stockItemCode: '',
                                    stockInTransit: '',
                                    stockInHand: '',
                                    monthlyConsumption: '',
                                    itemDescription: ''
                                  })
                                }
                              >
                                Add Item
                              </Button>
                              <Button variant="outlined" size="small" color="primary" type="submit" sx={{ ml: 1 }}>
                                Submit Items
                              </Button>
                            </Box> */}

                              <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
                                {/* <Button variant="outlined" size="small" color="error" sx={{ mr: 2 }}
                                  onClick={() =>
                                    push({
                                      stockItem: '',
                                      oprQty: '',
                                      stockItemCode: '',
                                      stockInTransit: '',
                                      stockInHand: '',
                                      monthlyConsumption: '',
                                      itemDescription: ''
                                    })
                                  }
                                >
                                  Add More
                                </Button> */}
                                <Button variant="contained" size="small" color="primary" type="submit">
                                  Add Items
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                    </Table>
                  </TableContainer>
                )}
              </FieldArray>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                {/* <MuiAlert elevation={6} color="white" variant="filled" onClose={handleSnackbarClose} severity="success">
                  {snackbarMessage}
                </MuiAlert> */}
                <MuiAlert
                  elevation={6}
                  variant="filled"
                  onClose={handleSnackbarClose}
                  severity="success"
                  sx={{
                    backgroundColor: '#2196f3', // Blue background
                    color: '#f5f5f5' // Gray text
                  }}
                ></MuiAlert>
              </Snackbar>
            </Form>
          )}
        </Formik>
      )}
      <div>
        {/* Your existing component JSX */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Submit</DialogTitle>
        <DialogContent>Are you sure you want to submit OPR Data?</DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmDialogClose(false)} color="error">
            Cancel
          </Button>
          <Button onClick={() => handleConfirmDialogClose(true)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* /* ...................................... Items table ........................... */}
      {oprId && (
        <TableContainer component={Paper} sx={{ marginTop: 2, borderRadius: '0' }}>
          <Table>
            {renderTableHeader('itemsTable', 'Items Table')}
            {showTableBodies.itemsTable && (
              <TableBody>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1, marginRight: '20px' }}>
                  <Button variant="outlined" size="small" color="error" sx={{ mr: 2 }}>
                    Cancel
                  </Button>
                  <Button variant="contained" size="small" color="primary" onClick={handleConfirmItems}>
                    Confirm Items
                  </Button>
                </Box>
                <TableRow>
                  <TableCell colSpan={6}>
                    <div style={{ width: '100%' }}>
                      <DataGrid
                        rows={stockData}
                        columns={columns}
                        disableSelectionOnClick
                        autoHeight
                        sx={{ cursor: 'pointer' }}
                        pagination={false}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default FormateForm;
