

import React, { useState, useEffect } from 'react';
import QuotationList from './Quotation_list';

import PoFrom from './po_form';
import MainCard from 'components/MainCard';
import { Box, Button } from '@mui/material'

// function chekFunction() {
//   window.alert("Hello");
// }

const chekFunction = (value) => {
  window.alert(value);
}


const po_page = () => {
  const [currnetQuotationId, setCurrentId] = useState('');
  const [showForm, setShowForm] = useState(false);

  const setQId = (id) => {
    setCurrentId(id);
  }

  const setS_Form = (value) => {
    setShowForm(value);
  }

  useEffect(() => {
    console.log(currnetQuotationId);
  }, [])


  return (
    <>
      <MainCard
        title={
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {!showForm ? <span>Quotation list</span> : <span>Create Purchase Order Form</span>}
            {!showForm ? (" ") : (
              <Button color="primary" className="plus-btn-color" onClick={() => setShowForm(false)} >
                Back
              </Button>
            )}
          </Box>
        }
      >
        {showForm ? <PoFrom id={currnetQuotationId} setS_Form={setS_Form} /> : <QuotationList chekFunction={chekFunction} setQId={setQId} setS_Form={setS_Form} />}

      </MainCard>

    </>
  );
};

export default po_page;
``