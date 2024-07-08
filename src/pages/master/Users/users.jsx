import { Button, Box } from '@mui/material';
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Icon from '@mdi/react';
import { mdiTagEdit } from '@mdi/js';
import axios from 'axios';
import UserForm from './userForm';
import { BASE_URL } from 'AppConstants';
import { GetUsers } from '../../../Redux/Apis/GetApiCalls';
import { useDispatch, useSelector } from 'react-redux';

export default function UsersPages() {
  const dispatch = useDispatch();
  const { isFetching, users, error } = useSelector((state) => state.usersMaster);
  const [showOprForm, setShowOprForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formMode, setFormMode] = useState('create');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const userData = users.map((user, index) => ({
      id: index + 1,
      user_id: user.user_id,
      userName: `${user.first_name} ${user.last_name}`,
      email: user.email,
      phoneNo: user.phone_number,
      currentAddress: `${user?.address_line1} ${user?.address_line2} ${user?.city} ${user?.state} ${user?.country} ${user?.postal_code}`,
      permanentAddress: `${user?.address_line3} ${user?.address_line4} ${user?.city1} ${user?.state1} ${user?.country1} ${user?.postal_code1}`,
      dob: user.date_of_birth,
      designation: user.designation,
      department: user.department,
      resigDate: user.registration_date,
      role: user.role,
      status: user.is_active ? 'Active' : 'Inactive',
      remark: user.notes
    }));

    setUserData(userData);
  }, [users]);

  // Define columns
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'user_id', headerName: 'User ID', width: 80 },
    { field: 'userName', headerName: 'User Name', width: 150 },
    { field: 'resigDate', headerName: 'Resignation Date', width: 150 },
    { field: 'role', headerName: 'Role', width: 100 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phoneNo', headerName: 'Phone Number', width: 150 },
    { field: 'dob', headerName: 'DOB', width: 150 },
    { field: 'designation', headerName: 'Designation', width: 150 },
    { field: 'department', headerName: 'Department', width: 150 },
    { field: 'currentAddress', headerName: 'Current Address', width: 150 },
    { field: 'permanentAddress', headerName: 'Permanent Address', width: 150 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'remark', headerName: 'Remark', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button color="primary" onClick={() => handleEdit(params.row.id)}>
          Edit
        </Button>
      )
    }
  ];
  const getUserData = async () => {
    try {
      await GetUsers(dispatch);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error state
    }
  };

  const handleCreateOpr = () => {
    setSelectedUser(null);
    setFormMode('create');
    setShowOprForm(true);
  };

  const handleEdit = (id) => {
    const user = userData.find((user) => user.id === id);
    setSelectedUser(user);
    setFormMode('edit');
    setShowOprForm(true);
  };

  const handleCloseForm = () => {
    setShowOprForm(false);
    setSelectedUser(null);
    setFormMode('create');
  };
  const handleSuccessfulSubmit = () => {
    setShowOprForm(false);
  };
  return (
    <MainCard
      title={
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {!showOprForm ? <span>User List</span> : <span>Create User</span>}
          {!showOprForm ? (
            <Button color="primary" className="plus-btn-color" onClick={handleCreateOpr}>
              + Create User
            </Button>
          ) : (
            <Button color="primary" className="plus-btn-color" onClick={handleCloseForm}>
              Back
            </Button>
          )}
        </Box>
      }
    >
      {showOprForm ? (
        <UserForm user={selectedUser} onSuccessfulSubmit={handleSuccessfulSubmit} formMode={formMode} onClose={handleCloseForm} />
      ) : (
        <DataGrid loading={isFetching} rows={userData} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
      )}
    </MainCard>
  );
}
