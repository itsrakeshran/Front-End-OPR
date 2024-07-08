import { Box, Button, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import MainCard from 'components/MainCard';

const ItemView = ({ item, onClose }) => {
  console.log('itemView', item);
  if (!item) return null;

  return (
    <>
      <MainCard>
        <Typography variant="h6">
          <h3 style={{ padding: '0', margin: '0' }}>
            Item Detail (
            <span className="text-primary" style={{ color: 'blue' }}>
              {item.itemName}
            </span>
            )
          </h3>
        </Typography>
        {item ? (
          <Box sx={{ marginBottom: '10px' }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Item Code:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.item_code}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Item Name:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.itemName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Base Item:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.base_item}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Item Description:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.itemDescription}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Item Type:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.item_type}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      HSN Code:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.hs_code}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      UOM ID:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.unitOfMeasurement}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      CRIA:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.cria}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  {/* <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Item Image:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.contactPerson}</Typography>
                  </TableCell> */}
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Remarks:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.notes}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Quantity In Stock : 40
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.quantityInStock}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Quantity On Order: 42
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.quantityOnOrder}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      NAFDAC:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.nafdac_name}</Typography>
                  </TableCell>
                </TableRow>
                {/* ................Current Address............... */}
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      NAFDAC Category:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.nafdac_category}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Tolerance:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.tolerance}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Reorder Level:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.reorderLevel}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Unit Price:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.unitPrice}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      MSRP:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.msrp}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Is Discontinued :
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ color: item.isDiscontinued ? 'green' : 'red' }}>
                      {item.isDiscontinued ? 'Active' : ' Discontinued'}
                    </Typography>
                  </TableCell>
                </TableRow>
                {/* .............Permanent Address.................. */}
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Group:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.group_name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Sub Group:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.subgroup}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button variant="outlined" color="error" onClick={onClose}>
                Close
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography>No item selected</Typography>
        )}
      </MainCard>
    </>
  );
};

export default ItemView;
