import React, {useState, useEffect} from 'react'
import api from '../../api/axiosConfig';
import './NotificationSyles.css'

const Notifications = () => {

    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState('');

    // HardCord
    const recipientId = '680c7590c7019a6db99046dd';

    useEffect(() => {
        const fetchNotifications = async () => {
          try {
            const res = await api.get(`/api/notifications/${recipientId}`);
            setNotifications(res.data);
          } catch (err) {
            setError('Failed to fetch notifications');
            console.error(err);
          }
        };

        fetchNotifications();
    }, []);


  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications yet.</p>
      ) : (
        <ul className="notifications-list">
          {notifications.map((note) => (
            <li key={note.id || note._id} className="notification-item">
              <p className="message">{note.message}</p>
              <p className="meta">
                Post ID: {note.postId} | From: {note.senderId}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Notifications