import React from 'react';
import { Table, TableBody, TableCell, TableRow, Typography, Box, Button, TableContainer, Paper, TableHead } from '@mui/material';
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';

const ViewQuotation = ({ oprViewData, onClose }) => {
  if (!oprViewData) return null;

  const { stockItems } = oprViewData;
  console.log('oprViewData.........................', stockItems);

  // Define columns for stockItems table
  const stockItemColumns = [
    { id: 'item_type', label: 'Stock Item', minWidth: 150 },
    { id: 'oprQty', label: 'OPR Quantity', minWidth: 150 },
    { id: 'itemSpecification', label: 'Stock Item Code', minWidth: 150 },
    { id: 'itemDescription', label: 'Stock In Transit', minWidth: 150 },
    { id: 'oprQty', label: 'Stock In Hand', minWidth: 150 },
    { id: 'opoQty', label: 'Monthly Consumption', minWidth: 150 },
    { id: 'quoteQty', label: 'Item Description', minWidth: 200 },
    { id: 'rate', label: 'Item Description', minWidth: 200 },
    { id: 'remarks', label: 'Item Description', minWidth: 200 }
  ];

  return (
    <MainCard>
      <Typography variant="h6">
        <h3 style={{ padding: '0', margin: '0' }}>
          Quotation Number (
          <span className="text-primary" style={{ color: 'blue' }}>
            {oprViewData.quo_num}
          </span>
          )
        </h3>
      </Typography>
      <Box sx={{ marginBottom: '10px' }}>
        <Table>
          <TableBody>
            <TableCell>
              <Typography variant="h6">
                {/* <br></br> */}
                <h3>Basic Info</h3>
              </Typography>
            </TableCell>
            <TableRow>
              <TableCell colSpan={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Vendor Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.vendor_id}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Reference No:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.referenceNo}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Reference Date:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.referenceDate}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Quotation Date:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.quo_date}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Currency:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.currency_id}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Delivery Terms:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.delivery_terms}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableCell>
              <Typography variant="h6">
                {/* <br></br> */}
                <h3>LOGISTICS</h3>
              </Typography>
            </TableCell>
            <TableRow>
              <TableCell colSpan={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Country of Origin:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.country_origin_id}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Country of Supply:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.country_supply_id}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Port of Loading:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.port_loading}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Lead Time:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.lead_time}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Payment Terms:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Typography>{oprViewData.payment_terms}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Remarks:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Typography>{oprViewData.remarks}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableCell>
              <Typography variant="h6">
                {/* <br></br> */}
                <h3>Charges</h3>
              </Typography>
            </TableCell>
            <TableRow>
              <TableCell colSpan={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Inland Charges:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.invalid_charges}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Freight Charges:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.freight_charges}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Inspection Charges:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.inspection_charges}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <Typography variant="h5" color="primary">
              <br></br>
              FOB Charges
            </Typography>
            <TableRow>
              <TableCell colSpan={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      THC:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.thc}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Container Stuffing:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.container_stuffing}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Container Seal:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.container_seal}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      BL:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.bl}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      VGM:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.vgm}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={1.2}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Miscellaneous:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Typography>{oprViewData.miscellaneous}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {stockItems && stockItems.length > 0 && (
          <>
            <Typography variant="h6" style={{ textAlign: 'center', justifyContent: 'centre' }} >
              {/* <br></br> */}
              <h3>Items Details</h3>
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {stockItemColumns.map((column) => (
                      <TableCell key={column.id} style={{ fontWeight: 'bold' }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stockItems.map((item) => (
                    <TableRow key={item.id}>
                      {stockItemColumns.map((column) => (
                        <TableCell key={column.id}>{item[column.id]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        <Box sx={{ marginTop: '20px', textAlign: 'right' }}>
          <Button color="primary" variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </MainCard>
  );
};

export default ViewQuotation;
