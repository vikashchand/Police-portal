import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CaseDetails.css';
import baseUrl from '../../config';

const CaseDetails = () => {
  const { id } = useParams(); // Get case ID from URL params
  const [caseDetails, setCaseDetails] = useState({
    caseId: '',
    officerId: '',
    location: '',
    description: '',
    status: '',
    reportedDate: '',
    updatedDate: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editCase, setEditCase] = useState({
    description: '',
    status: '',
  });

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/cases/${id}`);
        setCaseDetails(response.data);
        setEditCase({
          description: response.data.description,
          status: response.data.status,
        });
      } catch (error) {
        console.error('Error fetching case details:', error);
      }
    };

    fetchCaseDetails();
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditCase({
      ...editCase,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${baseUrl}/cases/${id}`, editCase);
      setCaseDetails(response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating case:', error);
    }
  };

  return (
    <div className="case-details-container">
    <br></br>
      <h2>Case Details</h2>
      <div className="details-section">
        <div className="detail-row">
          <span className="detail-label">Case ID:</span>
          <span className="detail-value">{caseDetails.caseId}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Officer ID:</span>
          <span className="detail-value">{caseDetails.officerId}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Reported Date:</span>
          <span className="detail-value">{new Date(caseDetails.reportedDate).toLocaleDateString()}</span>
        </div>
        <div className="detail-row">
        <span className="detail-label">Location:</span>
        <span className="detail-value">{caseDetails.location}</span>
      </div>
        <div className="detail-row">
          <span className="detail-label">Status:</span>
          {editMode ? (
            <select name="status" value={editCase.status} onChange={handleChange}>
              <option value="pending">Pending</option>
              <option value="solved">Solved</option>
            </select>
          ) : (
            <span className={`status-${caseDetails.status.toLowerCase()}`}>{caseDetails.status}</span>
          )}
        </div>
        <div className="detail-ro">
          <span className="detail-label">Description:</span>
          {editMode ? (
            <textarea
              name="description"
              value={editCase.description}
              onChange={handleChange}
              rows="4"
              className="description-edit"
            />
          ) :
         
          
          ( 
            <div className="detail-data">{caseDetails.description}</div>
          )}
        </div>
        <div className="detail-row">
          <span className="detail-label">Updated Date:</span>
          <span className="detail-value">{new Date(caseDetails.updatedDate).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="actions">
        {editMode ? (
          <button className="save-button" onClick={handleSave}>Save</button>
        ) : (
          <button className="edit-button" onClick={handleEdit}>Edit</button>
        )}
      </div>
      <div className="back-button">
        <Link to="/home/Caseslist">
          <button className="back-button">Back to Cases List</button>
        </Link>
      </div>
    </div>
  );
};

export default CaseDetails;
