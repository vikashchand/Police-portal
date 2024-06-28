import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterCase.css';
import baseUrl from '../../config';

const RegisterCase = () => {
  const [caseDetails, setCaseDetails] = useState({
    caseId: '',
    location: '',
    description: '',
  
    reportedDate: '',
    updatedDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseDetails({
      ...caseDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/upload`, caseDetails);
      console.log('Case registered:', response.data);

      // Show success toast
      toast.success('Case has been registered successfully!');

      // Clear the form
      setCaseDetails({
        caseId: '',
        location: '',
        description: '',
 
     
      });
    } catch (error) {
      console.error('Error registering case:', error);

      // Show error toast
      toast.error('Error registering case. Please try again.');
    }
  };

  return (
  <div>
    <br></br>
    <br></br>
    <h1>Register new case</h1>
    <div className="register-case-container">
     
      <form onSubmit={handleSubmit}>
      <div className='c'>
        <div>
          <label>Case ID:</label>
          <input type="text" name="caseId" value={caseDetails.caseId} onChange={handleChange} required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={caseDetails.location} onChange={handleChange} required />
        </div>

        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={caseDetails.description} onChange={handleChange} required />
        </div>
      

      
        <button type="submit">Register Case</button>
      </form>
     
    </div>
    <ToastContainer />
    
    </div>
  );
};

export default RegisterCase;
