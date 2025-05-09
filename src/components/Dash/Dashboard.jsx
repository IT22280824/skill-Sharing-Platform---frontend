import React, {useState} from 'react'
import Notifications from '../notification/Notifications.jsx';
import './DashStyles.css';

const Dashboard = () => {

    const recipientId = '680c7590c7019a6db99046dd';

    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications((prev) => !prev);
    };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="notification-icon-container" onClick={toggleNotifications}>
          🔔
          {showNotifications && (
            <div className="notification-dropdown">
              <Notifications recipientId={recipientId} />
            </div>
          )}
        </div>
      </div>

      <h2>Welcome back!</h2>
      
    </div>
  )
}

export default Dashboard