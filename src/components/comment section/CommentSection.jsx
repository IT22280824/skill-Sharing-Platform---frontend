import React, { useEffect, useState } from 'react';
import './CommentSectionStyles.css';
import api from '../../api/axiosConfig';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [userId, setUserId] = useState('user123'); // Replace with actual user auth logic

  useEffect(() => {
    if (postId) {
      fetchComments(postId);
    }
  }, [postId]);

  const fetchComments = async (id) => {
    try {
      const response = await api.get(`/api/comments/${id}`);
      setComments(response.data);
    } catch (err) {
      console.error('Error fetching comments:', err.message);
    }
  };

  const submitComment = async () => {
    if (!comment.trim()) return;

    try {
      const response = await api.post('/api/comments', {
        postId,
        userId,
        cmntContent: comment,
      });

      setComments([...comments, response.data]);
      setComment('');
    } catch (err) {
      console.error('Error posting comment:', err.message);
    }
  };

  const formatRelativeTime = (dateString) => {
    const now = new Date();
    const then = new Date(dateString);
    const diff = Math.floor((now - then) / 1000); // in seconds

    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return then.toLocaleString();
  };

  return (
    <div className="comment-section">
      <h4>Comments</h4>

      {comments.map((c) => (
        <div key={c.id} className="comment">
          <div className="comment-meta">
            <strong>{c.userId}</strong>
            <span className="comment-time">{formatRelativeTime(c.cmntCreatedAt)}</span>
          </div>
          <p>{c.cmntContent}</p>
        </div>
      ))}

      <div className="comment-input">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={submitComment}>Post</button>
      </div>
    </div>
  );
};

export default CommentSection;
