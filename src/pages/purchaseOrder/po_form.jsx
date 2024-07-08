// project-imports
import { useEffect, useState } from 'react';
// import MainCard from 'components/MainCard';
// material-ui
// import Grid from '@mui/material/Grid';
// import QuotationPage from './quatation-page';
import { BASE_URL } from 'AppConstants';


import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TextField,
  Box,
  IconButton,
  Button,
  FormHelperText
} from '@mui/material';
import Grid from '@mui/material/Grid';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { borderRadius } from '@mui/system';
import PO_list from './Purchase_list'


// ==============================|| Place Order Form Page ||============================== //

const rows = [
  {
    id: 1,
    vendor_id: 1,
    reference_no: 'reference_no',
    reference_date: 'Sales',
    quo_date: '2023-05-01',
    currency_id: 'Air',
    delivery_terms: '2 days',
    country_origin_id: 'Sales',
    country_supply_id: 'John Doe',
    port_loading: 'UrgentUrgentUrgentUrgentUrgentUrgentUrgent',
    lead_time: 'Supplier A',
    payment_terms: 'Item 1',
    remarks: 100,
    invalid_charges: 'STK001',
    freight_charges: 50,
    inspection_charges: 200,
    thc: 150,
    container_stuffing: 'Item Description 1'
  },
  {
    id: 1,
    vendor_id: 1,
    reference_no: 'reference_no',
    reference_date: 'Sales',
    quo_date: '2023-05-01',
    currency_id: 'Air',
    delivery_terms: '2 days',
    country_origin_id: 'Sales',
    country_supply_id: 'John Doe',
    port_loading: 'UrgentUrgentUrgentUrgentUrgentUrgentUrgent',
    lead_time: 'Supplier A',
    payment_terms: 'Item 1',
    remarks: 100,
    invalid_charges: 'STK001',
    freight_charges: 50,
    inspection_charges: 200,
    thc: 150,
    container_stuffing: 'Item Description 1'
  },
  {
    id: 1,
    vendor_id: 1,
    reference_no: 'reference_no',
    reference_date: 'Sales',
    quo_date: '2023-05-01',
    currency_id: 'Air',
    delivery_terms: '2 days',
    country_origin_id: 'Sales',
    country_supply_id: 'John Doe',
    port_loading: 'UrgentUrgentUrgentUrgentUrgentUrgentUrgent',
    lead_time: 'Supplier A',
    payment_terms: 'Item 1',
    remarks: 100,
    invalid_charges: 'STK001',
    freight_charges: 50,
    inspection_charges: 200,
    thc: 150,
    container_stuffing: 'Item Description 1'
  }
  // Add more rows as needed
];

// Define columns
const columns = [
  { field: 'quo_num', headerName: 'Sr No.', width: 60 },
  { field: 'rfq_id', headerName: 'Type', width: 100 },
  { field: 'vendor_id', headerName: 'Stock Item Code', width: 100 },
  { field: 'reference_no', headerName: 'Stock Item Name', width: 200 },
  { field: 'reference_date', headerName: 'Vendor Item Name', width: 100 },
  { field: 'quo_date', headerName: 'Vendor HS Code ', width: 100 },
  { field: 'currency_id', headerName: 'PO Qtd', width: 80 },
  { field: 'delivery_terms', headerName: 'Tolerance Qtd', width: 80 },
  { field: 'country_origin_id', headerName: 'Inaward Qtd', width: 80 },
  { field: 'country_supply_id', headerName: 'Pending Inaward Qtd', width: 80 },
  { field: 'port_loading', headerName: 'Pending Outward Qtd', width: 80 },
  { field: 'lead_time', headerName: 'Qtd UOM ', width: 80 },
  { field: 'payment_terms', headerName: 'Rate(INR)', width: 100 },
  { field: 'remarks', headerName: 'GST', width: 80 },
  { field: 'invalid_charges', headerName: 'Total Assests Value ', width: 100 },
  { field: 'freight_charges', headerName: 'Total Tax Value', width: 100 },
  { field: 'inspection_charges', headerName: 'Line Total(INR) ', width: 100 },
  { field: 'thc', headerName: 'OPO No.', width: 100 },
  { field: 'container_stuffing', headerName: 'OPO Line No.', width: 80 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <Button color="primary" onClick={() => handleEdit(params.row.id)}>
        {/* <Icon path={mdiTagEdit} size={1} /> */}
      </Button>
    )
  }
];

export default function PurchaseOrderForm({ id, setS_Form }) {

  const [errors, setErrors] = useState({});
  const [quotationData, setQuotationData] = useState({});
  const [showTableHeading, setShowTableHeading] = useState({
    VendorDetail: true,
    DeliveryDetails: true,
    AdditionalDetails: true,
    ChargesDetails: true,
    ItemDetails: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });


    if (!errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formValues.vendor_id) tempErrors.vendor_id = 'Required *';
    if (!formValues.reference_no) tempErrors.reference_no = 'Required *';
    if (!formValues.reference_date) tempErrors.reference_date = 'Required *';
    if (!formValues.quo_date) tempErrors.quo_date = 'Required *';
    if (!formValues.currency_id) tempErrors.currency_id = 'Required *';
    if (!formValues.delivery_terms) tempErrors.delivery_terms = 'Required *';
    if (!formValues.country_origin_id) tempErrors.country_origin_id = 'Required *';
    if (!formValues.country_supply_id) tempErrors.country_supply_id = 'Required *';
    if (!formValues.port_loading) tempErrors.port_loading = 'Required *';
    if (!formValues.lead_time) tempErrors.lead_time = 'Required *';
    if (!formValues.payment_terms) tempErrors.payment_terms = 'Required *';
    if (!formValues.remarks) tempErrors.remarks = 'Required *';
    if (!formValues.invalid_charges) tempErrors.invalid_charges = 'Required *';
    if (!formValues.freight_charges) tempErrors.freight_charges = 'Required *';
    if (!formValues.inspection_charges) tempErrors.inspection_charges = 'Required *';
    if (!formValues.thc) tempErrors.thc = 'Required *';
    if (!formValues.container_stuffing) tempErrors.container_stuffing = 'Required *';
    if (!formValues.container_seal) tempErrors.container_seal = 'Required *';
    if (!formValues.bl) tempErrors.bl = 'Required *';
    if (!formValues.vgm) tempErrors.vgm = 'Required *';
    if (!formValues.miscellaneous) tempErrors.miscellaneous = 'Required *';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };


  const handleSubmit2 = async () => {


    try {
      let rfq_id = id
      let data = {
        "rfq_id": rfq_id,
        "vendor_id": 12,
        "amount": 1000
      }
      console.log(data);
      let response = await axios.post('http://192.168.1.6:4000/po', data)
      setS_Form(false);
      console.log("handle click clicked")
      console.log(response)
    } catch (err) {
      Next(err);
    }
  }


  useEffect(() => {
    let qutId = { id }.id
    getLoadQuotation(qutId);

  }, [id]);



  // For Country
  const getLoadQuotation = async (id, showForm) => {
    try {
      console.log(`${BASE_URL}/quotationmaster/${id}`);
      const response = await axios.get(`${BASE_URL}/quotationmaster/${id}`);
      console.log('Quotation:', response);
      const quotationData = response.data[0];
      setQuotationData(quotationData);
    } catch (error) {
      console.error('Error fetching country:', error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        division: 'Failed to load country'
      }));
    }
  };


  const [formValues, setFormValues] = useState({
    invalid_charges: '',
    freight_charges: '',
    inspection_charges: '',
    tcs: '',
    thc: '',
    container_stuffing: '',
    container_seal: '',
    bl: '',
    vgm: '',
    miscellaneous: ''
  });


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Function to map frontend keys to backend keys
    const mapFrontendToBackendKeys = (frontendData) => {
      return {
        rfq_id: 4,
        ...frontendData,
        created_by: 'Deepanshu Sharma'
      };
    };

    // Validate the form before submission
    const isValid = validate();

    if (isValid) {
      // Map frontend keys to backend keys
      const requestData = mapFrontendToBackendKeys(formValues);

      try {
        console.log('API hitted', requestData);
        // Make a POST request to your backend API endpoint
        const response = await axios.post('${BASE_URL}/quotationmaster', requestData);

        // Handle response accordingly
        console.log('Form submitted successfully:', response);
      } catch (error) {
        // Handle error if the request fails
        console.error('Error submitting form:', error);
      }
    } else {
      // If form is invalid, do something (e.g., display error messages)
    }
  };

  const toggleTableBody = (section) => {
    setShowTableHeading((prevState) => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  const renderTableHeader = (sectionName, sectionLabel) => (
    <TableHead>
      <TableRow>
        <TableCell colSpan={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600}>
              {sectionLabel}
            </Typography>
            <IconButton size="large" onClick={() => toggleTableBody(sectionName)}>
              {showTableHeading[sectionName] ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
    </TableHead>
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Table>
          {renderTableHeader('VendorDetail', 'Vendor Info')}
          {showTableHeading.VendorDetail && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>
                  <Grid container spacing={2} alignItems="center">
                    {/* <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Purchase Order No., Date:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>ORD-1011-ORD, 25-06-2024</Typography>
                    </Grid> */}
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Vendor Name:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>{quotationData.vendor_name} </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Vendor Code:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>{quotationData.vendor_code}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Currency:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>{quotationData.currency}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Vendor Reference No.:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>{quotationData.reference_no}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Vendor Reference Date:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>{quotationData.reference_date}</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        <Table>
          {renderTableHeader('DeliveryDetails', 'Delivery Info')}
          {showTableHeading.DeliveryDetails && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Delivery Terms:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>{quotationData.delivery_terms}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Delivery Time:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>{quotationData.lead_time}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Payment Terms:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>{quotationData.payment_terms}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Tolerance:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>10.00</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        <Table>
          {renderTableHeader('AdditionalDetails', 'Additional Info')}

          {showTableHeading.AdditionalDetails && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Remarks:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>{quotationData.remarks} </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Additional Remarks:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>{quotationData.remarks}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Freight, Packaging & Forwarding Instructions:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>{quotationData.freight_charges}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Acceptance Copy
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography></Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Received Date:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography></Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Lead Time Start From:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography>Advance Payment</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        <Table>
          {renderTableHeader('ChargesDetails', 'Charges')}
          {showTableHeading.ChargesDetails && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle1">Inland Charges </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        id="invalid_charges"
                        name="invalid_charges"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={formValues.invalid_charges}
                        onChange={handleInputChange}
                      />
                      {!!errors.invalid_charges && <FormHelperText error>{errors.invalid_charges}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle1">Freight Charges </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        id="freight_charges"
                        name="freight_charges"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={formValues.freight_charges}
                        onChange={handleInputChange}
                      />
                      {!!errors.freight_charges && <FormHelperText error>{errors.freight_charges}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle1">Inspection Charges </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        id="inspection_charges"
                        name="inspection_charges"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={formValues.inspection_charges}
                        onChange={handleInputChange}
                      />
                      {!!errors.inspection_charges && <FormHelperText error>{errors.inspection_charges}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle1">TCS </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        id="inspection_charges"
                        name="inspection_charges"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={formValues.inspection_charges}
                        onChange={handleInputChange}
                      />
                      {!!errors.inspection_charges && <FormHelperText error>{errors.inspection_charges}</FormHelperText>}
                    </Grid>
                    {/* <Grid item xs={12}>
                      <br />
                    </Grid> */}
                    <Grid item xs={12}>
                      <Typography variant="h5" color="primary">
                        FOB Charges:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle1">THC </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        id="thc"
                        name="thc"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={formValues.thc}
                        onChange={handleInputChange}
                      />
                      {!!errors.thc && <FormHelperText error>{errors.thc}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle1">Container Stuffing </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        id="container_stuffing"
                        name="container_stuffing"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={formValues.container_stuffing}
                        onChange={handleInputChange}
                      />
                      {!!errors.container_stuffing && <FormHelperText error>{errors.container_stuffing}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle1">Container Seal </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        id="container_seal"
                        name="container_seal"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={formValues.container_seal}
                        onChange={handleInputChange}
                      />
                      {!!errors.container_seal && <FormHelperText error>{errors.container_seal}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle1">BL </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField id="bl" name="bl" variant="outlined" fullWidth value={formValues.bl} onChange={handleInputChange} />
                      {!!errors.bl && <FormHelperText error>{errors.bl}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle1">VGM </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        id="vgm"
                        name="vgm"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={formValues.vgm}
                        onChange={handleInputChange}
                      />
                      {!!errors.vgm && <FormHelperText error>{errors.vgm}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography variant="subtitle1">Miscellaneous </Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        id="miscellaneous"
                        name="miscellaneous"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={formValues.miscellaneous}
                        onChange={handleInputChange}
                      />
                      {!!errors.miscellaneous && <FormHelperText error>{errors.miscellaneous}</FormHelperText>}
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
            {/* {formMode === 'create' ? 'Submit' : 'Update'} */}
            View Payment Schedule
          </Button>
          <Button variant="outlined" color="error">
            Print PO PDF
          </Button>
        </Box>
      </form>
      <Box>

        <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }} onClick={handleSubmit2}>
          Generate PO
        </Button>

      </Box>

      <TableContainer sx={{ marginTop: 2, borderRadius: '0' }}>
        <Table>
          {renderTableHeader('ItemDetails', 'Items Details')}
          {showTableHeading.ItemDetails && (
            <>
              <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
            </>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
