import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import './NotificationSyles.css';

const Notifications = ({ recipientId }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get(`/api/notifications/${recipientId}`);
        setNotifications(res.data);
        console.log('Fetched notifications for recipientId:', recipientId, res.data);
      } catch (err) {
        setError('Failed to fetch notifications');
        console.error(err);
      }
    };

    fetchNotifications();
  }, [recipientId]);

  const markAsRead = async (notificationId) => {
    try {
      await api.post(`/api/notifications/mark-read`, { notificationId });

      setNotifications((prevNotifications) =>
        prevNotifications.map((note) =>
          (note._id || note.id) === notificationId ? { ...note, read: true } : note
        )
      );
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {error && <p className="error">{error}</p>}
      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications yet.</p>
      ) : (
        <ul className="notifications-list">
          {notifications.map((note) => {
            const id = note._id || note.id;
            return (
              <li
                key={id}
                className={`notification-item ${note.read ? 'read' : 'unread'}`}
              >
                <div
                  className="notification-content"
                  onClick={() => {
                    if (!note.read) {
                      markAsRead(id);
                    }
                  }}
                >
                  <p className="message">{note.message}</p>
                  <p className="meta">
                    Post ID: {note.postId?.toString?.()} | From: {note.senderId}
                  </p>
                </div>

                {!note.read && (
                  <button
                    className="mark-read-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering parent onClick
                      markAsRead(id);
                    }}
                  >
                    Mark as Read
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
