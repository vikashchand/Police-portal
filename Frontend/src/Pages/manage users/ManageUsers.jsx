import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageUser.css';
import baseUrl from '../../config';


const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/userDetails`); // Replace with your API endpoint to fetch users
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleRemoveEmployee = async (employeeId) => {
    const confirmed = window.confirm('Are you sure you want to remove this employee?');
    if (confirmed) {
      try {
        await axios.delete(`${baseUrl}/user/deleteuser/${employeeId}`);
        fetchUsers();
      } catch (error) {
        console.error('Error removing employee:', error);
      }
    }
  };

  const handleToggleAccountStatus = async (userId, newStatus) => {
    try {
      await axios.put(`${baseUrl}/user/updateuser/${userId}`, { account_status: newStatus });
      fetchUsers();
    } catch (error) {
      console.error('Error updating account status:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.id.toString().includes(searchQuery) || 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="manage-users-container">
      <div className='emplist'>
        <br />
        <br />
        <h2>"Empower and Secure"</h2>
        <p>Managing Officers Access - Directory and Permissions Control</p>
        <h2>Police Officers List</h2>
        <input 
          type="text" 
          placeholder="Search by ID or Name" 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />

        <br></br>
        <table>
          <thead>
            <tr>
              <th>Police ID</th>
              <th>UserName</th>
              <th>Email</th>
              <th>is_admin</th>
              <th>is_verified</th>
              <th>last_login</th>
              <th>account status</th>
              <th>created_at</th>
              <th>last_updated</th>
              <th>Delete</th>
              <th>Account Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className='tablerow'>{user.id}</td>
                <td className='tablerow'>{user.username}</td>
                <td className='tablerow'>{user.email}</td>
                <td className='tablerow'>{user.is_admin}</td>
                <td className='tablerow'>{user.is_verified}</td>
                <td className='tablerow'>{user.last_login}</td>
                <td className='tablerow'>{user.account_status}</td>
                <td className='tablerow'>{user.created_at}</td>
                <td className='tablerow'>{user.updated_at}</td>
                <td className='tablerow'>
                  <button onClick={() => handleRemoveEmployee(user._id)}>Remove</button>
                </td>
                <td className='tablerow'>
                  {user.account_status === 'active' ? (
                    <button className='btn' onClick={() => handleToggleAccountStatus(user._id, 'inactive')}>Set as Inactive</button>
                  ) : (
                    <button className='btn' onClick={() => handleToggleAccountStatus(user._id, 'active')}>Set as Active</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
