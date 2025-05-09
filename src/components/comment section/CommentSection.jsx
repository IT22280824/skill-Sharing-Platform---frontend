import React, { useEffect, useState } from 'react';
import './CommentSectionStyles.css';
import api from '../../api/axiosConfig';

const CommentSection = ({ postId }) => {
  const userId = '661e8dcd5f1f1c274bcf0666'; // Replace with real user ID from auth/context ------   🆘
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState('');

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
      const response = await api.post(`/api/comments/${postId}`, {
        userId,
        cmntContent: comment,
      });
      setComments([...comments, response.data]);
      setComment('');
    } catch (err) {
      console.error('Error posting comment:', err.message);
    }
  };

  const deleteComment = async (id) => {
        try {
            await api.delete(`/api/comments/${id}`, {
            params: { userId },
        });
        setComments(comments.filter(c => c.id !== id));
        } catch (err) {
            console.error('Error deleting comment:', err.message);
        }
  };
  

  const startEditing = (id, content) => {
    setEditingCommentId(id);
    setEditContent(content);
  };

    const submitEdit = async (id) => {
        try {
            const response = await api.put(`/api/comments/edit/${id}`, {
            userId,
            cmntContent: editContent,
        });
            setComments(comments.map(c => c.id === id ? response.data : c));
            setEditingCommentId(null);
            setEditContent('');
        } catch (err) {
            console.error('Error editing comment:', err.message);
        }
    };
  

    const formatRelativeTime = (dateString) => {
      const now = new Date();
      const then = new Date(dateString);
      const diff = Math.floor((now - then) / 1000);
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
                    <strong>{c.username}</strong>
                    <span className="comment-time">{formatRelativeTime(c.cmntCreatedAt)}</span>
                </div>
        
            <div className="comment-content">
            {editingCommentId === c.id ? (
                <div>
                <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="edit-actions">
                    <button onClick={() => submitEdit(c.id)}>Save</button>
                    <button onClick={() => setEditingCommentId(null)}>Cancel</button>
                </div>
                </div>
            ) : (
                <p>{c.cmntContent}</p>
            )}
            </div>
        
            {c.userId === userId && editingCommentId !== c.id && (
            <div className="comment-actions">
                <button onClick={() => startEditing(c.id, c.cmntContent)}>Edit</button>
                <button onClick={() => deleteComment(c.id)}>Delete</button>
            </div>
            )}
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
