import React from 'react';
import './Home.css';
import { Routes, Route } from 'react-router-dom';

import SideeNav from '../../components/SideeNav';
import LandingPage from '../LandingPage/LandingPage';
import ManageUsers from '../manage users/ManageUsers';
import Audit from '../Audit/Audit';
import RegisterCase from '../CaseRegist/RegisterCase';
import CasesList from '../CaseList/CasesList';
import CaseDetails from '../CaseList/CaseDetails';
import Dashboard from '../../Dashboards/Dashboard';
import jwtDecode from 'jwt-decode';
const Home = () => {

  const token = localStorage.getItem('userInfo');
  let decodedToken = jwtDecode(token);
  console.log(decodedToken, 'decodedToken');
  const role = decodedToken.data.is_admin;
  console.log(role, 'ghg');
  return (
    <div className="home-container">
      <div className="side-nav-container">
     
        <SideeNav />
      </div>
      <div className="content-container">
        <div className="heading-tab">
          <h1>Tamil Nadu Police Portal</h1>
        </div>
        <Routes>
          <Route path="/LandingPage" element={<LandingPage />} />
         
          <Route path="/registerCase" element={<RegisterCase />} />
          <Route path="/Caseslist" element={<CasesList />} />
          <Route path="/Caseslist/:id" element={<CaseDetails />} />
         
      

          {role == 1 && (
            <>
            <Route path="/dashboard" element={ <Dashboard/> } />
            <Route path="/employees" element={<ManageUsers />} />
            <Route path="/audit" element={<Audit />} />

            </>
          )}


        </Routes>
      </div>
    </div>
  );
};

export default Home;
