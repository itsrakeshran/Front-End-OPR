// src/pages/UseView.js

import { Button, Box } from '@mui/material';

const UseView = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <Box sx={{ padding: 2 }}>
      <h2>View User</h2>
      <div>
        <strong>Name:</strong> {user.userName}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Phone Number:</strong> {user.phoneNo}
      </div>
      <div>
        <strong>Current Address:</strong> {user.currentAddress}
      </div>
      <div>
        <strong>Permanent Address:</strong> {user.permanentAddress}
      </div>
      <div>
        <strong>Date of Birth:</strong> {user.dob}
      </div>
      <div>
        <strong>Designation:</strong> {user.designation}
      </div>
      <div>
        <strong>Department:</strong> {user.department}
      </div>
      <div>
        <strong>Resignation Date:</strong> {user.resigDate}
      </div>
      <div>
        <strong>Role:</strong> {user.role}
      </div>
      <div>
        <strong>Status:</strong> {user.status}
      </div>
      <div>
        <strong>Remark:</strong> {user.remark}
      </div>
      <Button color="primary" onClick={onClose}>
        Back
      </Button>
    </Box>
  );
};

export default UseView;
