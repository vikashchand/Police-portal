import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Import ResponsiveContainer for responsiveness
import Calendar from 'react-calendar';
import './Dashboard.css'; // Assuming you have your styles in Dashboard.css
import baseUrl from '../config';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredCases, setFilteredCases] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/dashboard`)
      .then(response => {
        setData(response.data);
        setFilteredCases(response.data.cases.filter(c => new Date(c.reportedDate).toDateString() === new Date(selectedDate).toDateString()));
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFilteredCases(data.cases.filter(c => new Date(c.reportedDate).toDateString() === new Date(date).toDateString()));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const { totalCases, solvedCases, pendingCases, casesByLocation } = data;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-summary">
        <div className='co'>
          <div className="summary">
            <h2>Case Summary</h2>
            <p>Total Cases: {totalCases}</p>
            <p>Pending Cases: {pendingCases}</p>
            <p>Solved Cases: {solvedCases}</p>
          </div>
          <div className="pie-chart">
            <h2>Cases by Location</h2>
            <ResponsiveContainer width="100%" height={300}> {/* Make the chart responsive */}
              <PieChart>
                <Pie
                  data={casesByLocation}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={80} // Reduce outer radius for smaller devices
                  fill="#8884d8"
                  label
                >
                  {casesByLocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="calendar-section">
            <h2>Case Calendar</h2>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="custom-calendar" // Apply your custom class here
            />
          </div>
          <div className="case-list">
            <h2>Cases List on {selectedDate.toDateString()}</h2>
            <ul>
              {filteredCases.map(c => (
                <li key={c.caseId}>
                  {c.caseId}: {c.location} - {c.status}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
