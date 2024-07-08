import { Button, Box, Link } from '@mui/material';
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import ItemForm from './itemForm';
import ItemView from './itemView';
import { useDispatch, useSelector } from 'react-redux';
import { GetItems } from 'Redux/Apis/GetApiCalls';
// ==============================|| Items Page ||============================== //

export default function ItemsPages() {
  const dispatch = useDispatch();
  const { items, isFetching } = useSelector((state) => state.itemMaster);

  const [showItemForm, setShowItemForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formMode, setFormMode] = useState('create');
  const [itemsData, setItemsData] = useState([]);
  const [viewItem, setViewItem] = useState(null);

  useEffect(() => {
    getItemsData();
  }, []);

  useEffect(() => {
    const mappedData = items.map((item, index) => ({
      id: index + 1,
      itemName: item.item_name,
      itemDescription: item.item_description,
      quantityInStock: item.quantity_in_stock,
      quantityOnOrder: item.quantity_on_order,
      reorderLevel: item.reorder_level,
      unitPrice: item.unit_price,
      msrp: item.msrp,
      isDiscontinued: item.is_discontinued,
      itemImageUrl: item.item_image_url,
      weight: item.weight,
      dimensions: item.dimensions,
      notes: item.notes,
      unitOfMeasurement: item.unit_of_measurement,
      item_series: item.item_series,
      item_code: item.item_code,
      base_item: item.base_item,
      factory: item.factory,
      item_type: item.item_type,
      hs_code: item.hs_code,
      group_name: item.group_name,
      subgroup: item.subgroup,
      cria: item.cria,
      nafdac_name: item.nafdac_name,
      nafdac_category: item.nafdac_category,
      tolerance: item.tolerance,
      item_img: item.item_img
    }));

    setItemsData(mappedData);
    return () => {};
  }, [items]);

  // Define columns
  const columns = [
    {
      field: 'itemName',
      headerName: 'Item Name',
      width: 150,
      renderCell: (params) => (
        <Link component="button" onClick={() => handleView(params.row.id)}>
          {params.row.itemName}
        </Link>
      )
    },
    { field: 'itemDescription', headerName: 'Item Description', width: 200 },
    { field: 'quantityInStock', headerName: 'Quantity In Stock', width: 150 },
    { field: 'quantityOnOrder', headerName: 'Maximum Quantity', width: 150 },
    { field: 'reorderLevel', headerName: 'Reorder Level', width: 150 },
    { field: 'unitPrice', headerName: 'Unit Price', width: 100 },
    { field: 'msrp', headerName: 'MSRP', width: 100 },
    { field: 'isDiscontinued', headerName: 'Is Discontinued', width: 150 },
    { field: 'itemImageUrl', headerName: 'Item Image URL', width: 200 },
    { field: 'weight', headerName: 'Weight', width: 100 },
    { field: 'dimensions', headerName: 'Dimensions', width: 150 },
    { field: 'notes', headerName: 'Notes', width: 200 },
    { field: 'unitOfMeasurement', headerName: 'Unit Of Measurement', width: 150 },
    { field: 'supplier', headerName: 'Supplier', width: 150 },
    { field: 'categoryID', headerName: 'Category ID', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button color="primary" onClick={() => handleEdit(params.row.id)}>
          <EditIcon />
        </Button>
      )
    }
  ];

  const getItemsData = async () => {
    await GetItems(dispatch);
  };

  const handleCreateItem = () => {
    setSelectedItem(null);
    setFormMode('create');
    setShowItemForm(true);
  };

  const handleEdit = (id) => {
    const item = itemsData.find((item) => item.id === id);
    setSelectedItem(item);
    setFormMode('edit');
    setShowItemForm(true);
  };

  const handleView = (id) => {
    const item = itemsData.find((item) => item.id === id);
    setViewItem(item);
  };

  const handleCloseForm = () => {
    setShowItemForm(false);
    setViewItem(false);
    setSelectedItem(null);
    setFormMode('create');
  };

  const handleFormSubmit = () => {
    getItemsData();
    setShowItemForm(false);
  };

  return (
    <>
      <MainCard
        title={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {!showItemForm && !viewItem ? <span>Item list</span> : <span>{showItemForm ? 'Create Item' : 'Item Details'}</span>}

            {!showItemForm && !viewItem ? (
              <Button color="primary" className="plus-btn-color" onClick={handleCreateItem}>
                + Create Item
              </Button>
            ) : (
              <Button color="primary" className="plus-btn-color" onClick={handleCloseForm}>
                Back
              </Button>
            )}
          </Box>
        }
      >
        {showItemForm ? (
          <ItemForm item={selectedItem} formMode={formMode} onClose={handleCloseForm} onFormSubmit={handleFormSubmit} />
        ) : viewItem ? (
          <ItemView item={viewItem} onClose={handleCloseForm} />
        ) : (
          <div>
            <DataGrid loading={isFetching} rows={itemsData} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
          </div>
        )}
      </MainCard>
    </>
  );
}
