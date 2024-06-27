import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CasesList.css';
import baseUrl from '../../config';
const CasesList = () => {
  const [cases, setCases] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get(`${baseUrl}/cases`);
        setCases(response.data);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };

    fetchCases();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCases = cases.filter((caseItem) =>
    caseItem.caseId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="cases-list-container">
      <h2>Cases List</h2>
      <div className="search-container">
        <label htmlFor="search">Search by Case ID:</label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Enter Case ID..."
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Officer ID</th>
         
         
            <th>Status</th>
            <th>Updated Date</th>
         
          </tr>
        </thead>
        <tbody>
          {filteredCases.map((caseItem) => (
            <tr key={caseItem._id}>
              <td><Link to={`/home/Caseslist/${caseItem._id}`}>{caseItem.caseId}</Link></td>
              <td>{caseItem.officerId}</td>
              
              <td>{caseItem.status}</td>
              <td>{new Date(caseItem.updatedDate).toLocaleDateString()}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CasesList;
