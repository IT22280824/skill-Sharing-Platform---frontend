import React, {useState} from 'react'
import Notifications from '../notification/Notifications.jsx';
import './DashStyles.css';

const Dashboard = () => {

        const recipientId = '680c767771f3533833fdba14';
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
      
            <div className="dashboard-content">
              <h2>Welcome back!</h2>
              {/* Add your dashboard content here */}
            </div>
          </div>
        )
    
}

export default Dashboard