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


    const markAllAsRead = async () => {
      try {
        await api.post(`/api/notifications/mark-all-read/${recipientId}`);
        setNotifications((prev) =>
          prev.map((note) => ({ ...note, read: true }))
        );
      } catch (err) {
        console.error('Failed to mark all as read', err);
      }
    };



    const clearAllNotifications = async () => {
      try {
        await api.delete(`/api/notifications/clear-all/${recipientId}`);
        setNotifications([]); // Clear state
      } catch (err) {
        console.error('Failed to clear all notifications', err);
      }
    };


    const likeNotification = async (notificationId) => {
      try {
        await api.post(`/api/notifications/${notificationId}/like`);
        setNotifications((prevNotifications) =>
          prevNotifications.map((note) =>
            note._id === notificationId
              ? { ...note, likeCount: note.likeCount + 1 }
              : note
          )
        );
      } catch (err) {
        console.error('Failed to like notification', err);
      }
    };

    const dislikeNotification = async (notificationId) => {
      try {
        await api.post(`/api/notifications/${notificationId}/dislike`);
        setNotifications((prevNotifications) =>
          prevNotifications.map((note) =>
            note._id === notificationId
              ? { ...note, dislikeCount: note.dislikeCount + 1 }
              : note
          )
        );
      } catch (err) {
        console.error('Failed to dislike notification', err);
      }
    };
    



  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {error && <p className="error">{error}</p>}
      {notifications.length > 0 && (
        <div className="notification-actions">
          <button
            className="mark-all-btn"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              markAllAsRead();
            }}
          >
            Mark All as Read
          </button>
          <button
            className="clear-all-btn"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              clearAllNotifications();
            }}
          >
            Clear All
          </button>
        </div>
      )}

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
                    Post ID: {note.postId?.toString()} | From: {note.senderUsername}
                  </p>
                </div>

                {!note.read && (
                  <button
                    className="mark-read-btn"
                    onClick={(e) => {
                      e.stopPropagation();
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
