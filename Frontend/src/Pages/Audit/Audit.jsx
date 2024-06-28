import React, { useState } from 'react';
import axios from 'axios';
import './Audit.css';
import baseUrl from '../../config';
const Audit = () => {
  const [adminPowersLogs, setAdminPowersLogs] = useState([]);
  const [customersLogs, setCustomersLogs] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');

  const fetchAuditLogs = async (tableName) => {
    try {
      const response = await axios.get(`${baseUrl}/user/${tableName}`);
      if (tableName === 'adminpowersaudit') {
        setAdminPowersLogs(response.data);
        setCustomersLogs([]);
        setAuditLogs([]);
      } else if (tableName === 'customers') {
        setCustomersLogs(response.data);
        setAdminPowersLogs([]);
        setAuditLogs([]);
      } else if (tableName === 'audit') {
        setAuditLogs(response.data);
        setAdminPowersLogs([]);
        setCustomersLogs([]);
      }
      setSelectedTable(tableName);
    } catch (error) {
      console.error(error);
    }
  };

  const renderTable = () => {
    if (selectedTable === 'adminpowersaudit') {
      return (
        <table >
          <thead>
            <tr>
              <th>Email</th>
              <th>CaseId</th>
              <th>Type</th>
            
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
          {adminPowersLogs.map((audi) => (
            <tr key={`adminpowers_${audi._id}`}>
              <td>{audi.email}</td>
              <td>{audi.case_id}</td>
              <td>{audi.type}</td>
           
              <td>{new Date(audi.time).toLocaleDateString()}</td>
            </tr>
          ))}
          
          </tbody>
        </table>
      );
    } else if (selectedTable === 'customers') {
      return (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Uploaded By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {customersLogs.map((log) => (
              <tr key={`customers_${log._id}`}>
                <td>{log.id}</td>
               
                <td>{log.uploadedby}</td>
                <td>{new Date(log.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (selectedTable === 'audit') {
      return (
        <table>
          <thead>
            <tr>
             
              <th>Policeid</th>
              <th>Action</th>
              <th>Time</th>
             
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((keyy) => (
              <tr key={`audit_${keyy._id}`}>
               
                <td>{keyy.actor}</td>
                <td>{keyy.action}</td>
                
                <td>{new Date(keyy.time).toLocaleDateString()}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return null;
    }
  };

  return (
    <div  className='cases-list-container'>
      <br />
      <br />
      <br />
      <div className='audibutton'>
      <h1>"Traceability Chronicles" </h1>
      <h3>Unveiling User Footprints - Audit Trail and Activity Logs</h3>
      <button onClick={() => fetchAuditLogs('audit')}>Login Logs</button>
      <button onClick={() => fetchAuditLogs('adminpowersaudit')}>Case Logs</button>
     
      </div>
      {renderTable()}
    </div>
  );
};

export default Audit;
