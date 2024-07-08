import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import MainCard from 'components/MainCard';
import OprTable from './oprTabel';
import OprView from './oprView';
import FormateForm from './formateForm';

const OprMain = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedOpr, setSelectedOpr] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleCreateForm = () => {
    setShowForm(true);
    setIsEditMode(false);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleViewClose = () => {
    setSelectedOpr(null);
  };
  const handleSuccessfulSubmit = () => {
    setShowForm(false);
    // setSelectedOpr(null);
  };
  const handleEditClick = () => {
    setIsEditMode(true);
  };
  return (
    <MainCard
      title={
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {!showForm && !selectedOpr ? (
            <span>OPR Management</span>
          ) : (
            <span>{showForm ? 'Create OPR' : 'Update OPR'}</span> // Change title dynamically based on edit mode
          )}
          {!showForm && !selectedOpr ? (
            <Button color="primary" className="plus-btn-color" onClick={handleCreateForm}>
              + Create OPR
            </Button>
          ) : (
            <Button
              color="primary"
              className="plus-btn-color"
              onClick={() => {
                setShowForm(false);
                setSelectedOpr(null);
              }}
            >
              Back
            </Button>
          )}
        </Box>
      }
    >
      {showForm ? (
        <FormateForm onSuccessfulSubmit={handleSuccessfulSubmit} onEditClick={handleEditClick} />
      ) : selectedOpr ? (
        <OprView oprViewData={selectedOpr} onClose={handleViewClose} />
      ) : (
        <OprTable setSelectedOpr={setSelectedOpr} />
      )}
    </MainCard>
  );
};

export default OprMain;
