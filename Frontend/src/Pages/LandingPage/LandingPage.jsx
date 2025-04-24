import React from "react";
import {
  FaEnvelope,
  FaTasks,
  FaClock,
  FaChartLine,
  FaDatabase,
  FaUserShield,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import "./LandingPage.css";

import featureImage from "../../assets/tamil.png";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to the UttarPradesh Police Portal</h1>
      <p>Empowering Our Officers for Safer Communities</p>

      <div className="feature-container">
        <div className="feature-description">
          <h2>Key Features</h2>
          <ul className="feature-cards">
            <li className="feature-card">
              <div className="feature-icon">
                <FaTasks />
              </div>
              <div className="feature-details">
                <h3>Daily Case Registration</h3>
                <p>
                  Effortlessly register and manage daily cases in your district.
                  Streamline the process of recording essential information,
                  updating case statuses, and collaborating with your team.
                </p>
              </div>
            </li>
            <li className="feature-card">
              <div className="feature-icon">
                <FaClock />
              </div>
              <div className="feature-details">
                <h3>Real-time Updates</h3>
                <p>
                  Stay informed with real-time updates on case developments.
                  Receive notifications for critical incidents and deadlines to
                  ensure swift action and response.
                </p>
              </div>
            </li>
            <li className="feature-card">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <div className="feature-details">
                <h3>Crime Statistics Analysis</h3>
                <p>
                  Access comprehensive crime statistics and analysis tools. Make
                  data-driven decisions to allocate resources effectively and
                  address emerging trends.
                </p>
              </div>
            </li>
            <li className="feature-card">
              <div className="feature-icon">
                <FaDatabase />
              </div>
              <div className="feature-details">
                <h3>Database Integration</h3>
                <p>
                  Seamlessly integrate with a centralized database for efficient
                  data storage and retrieval. Ensure data consistency and
                  reliability.
                </p>
              </div>
            </li>
            <li className="feature-card">
              <div className="feature-icon">
                <FaUserShield />
              </div>
              <div className="feature-details">
                <h3>Security Measures</h3>
                <p>
                  Implement robust security measures to protect sensitive data.
                  Enforce strict access control and data encryption to safeguard
                  information.
                </p>
              </div>
            </li>
            <li className="feature-card">
              <div className="feature-icon">
                <FaMapMarkedAlt />
              </div>
              <div className="feature-details">
                <h3>Geospatial Integration</h3>
                <p>
                  Integrate geospatial data to visualize crime incidents on
                  maps. Identify crime hotspots and allocate resources
                  strategically.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
