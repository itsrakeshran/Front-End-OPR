import React from 'react';
import { Table, TableBody, TableCell, TableRow, Typography, Box, Button, TableContainer, Paper, TableHead } from '@mui/material';
import MainCard from 'components/MainCard';

const OprView = ({ oprViewData, onClose }) => {
  if (!oprViewData) return null;

  const { stockItems } = oprViewData;
  console.log('oprViewData.........................', oprViewData);

  const stockItemColumns = [
    { id: 'Sno', label: 'Sr. No.', field: 'Sno', flex: 1 },
    { id: 'item_type', label: 'Type', field: 'type', flex: 1 },
    { id: 'subgroup', label: 'Sub Group', field: 'subGroup', flex: 1 },
    { id: 'stockItemCode', label: 'Stock Item Code', field: 'stockItemCode', flex: 1 },
    { id: 'stockItem', label: 'Stock Item Name', field: 'stockItem', flex: 1 },
    { id: 'itemDescription', label: 'Item Description', field: 'itemDescription', flex: 1 },
    { id: 'hs_code', label: 'HSN Code', field: 'hsnCode', flex: 1 },
    { id: 'nafdac', label: 'NAFDAC', field: 'nafdac', flex: 1 },
    { id: 'cria', label: 'Cria', field: 'cria', flex: 1 },
    { id: 'son', label: 'SON', field: 'son', flex: 1 },
    { id: 'unit_of_measurement', label: 'UOM', field: 'uom', flex: 1 },
    { id: 'stockInTransit', label: 'Stock In Transit', field: 'stockInTransit', flex: 1 },
    { id: 'stockInHand', label: 'Stock In Hand', field: 'stockInHand', flex: 1 },
    { id: 'monthlyConsumption', label: 'Monthly Consumption', field: 'monthlyConsumption', flex: 1 },
    { id: 'oprQty', label: 'OPO Qty', field: 'oprQty', flex: 1 },
    { id: 'shortCloseQty', label: 'Short Close Qty', field: 'shortCloseQty', flex: 1 }
  ];

  return (
    <MainCard>
      <Typography variant="h6">
        <h3 style={{ padding: '0', margin: '0' }}>
          OPR Detail (
          <span className="text-primary" style={{ color: 'blue' }}>
            {oprViewData.opr_num}
          </span>
          )
        </h3>
      </Typography>
      <Box sx={{ marginBottom: '10px' }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  Vertical:
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>{oprViewData.division}</Typography>
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
                <Typography>{oprViewData.buyinHouse}</Typography>
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
          </TableBody>
        </Table>

        {stockItems && stockItems.length > 0 && (
          <>
            <Typography variant="h6">
              <h3> Stock Items Details</h3>
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
                  {stockItems.map((item, index) => (
                    <TableRow key={item.id}>
                      {stockItemColumns.map((column) => (
                        <TableCell key={column.id}>{column.id === 'Sno' ? index + 1 : item[column.id]}</TableCell>
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

export default OprView;
