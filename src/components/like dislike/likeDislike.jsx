import React, { useState, useEffect } from 'react';
import './LikeDislikeStyles.css';
import api from '../../api/axiosConfig';

const LikeDislike = ({ postId, likeCount, dislikeCount }) => {
  const userId = '661e8dcd5f1f1c274bcf0666'; // 🔄 Replace with real user ID from auth/context

  const [userReaction, setUserReaction] = useState(() => {
    const saved = localStorage.getItem(`post_${postId}_reaction`);
    try {
      const parsed = JSON.parse(saved);
      return parsed === 'like' || parsed === 'dislike' ? parsed : null;
    } catch {
      return saved === 'like' || saved === 'dislike' ? saved : null;
    }
  });

  const [counts, setCounts] = useState({
    likes: likeCount ?? 0,
    dislikes: dislikeCount ?? 0,
  });

  const fetchReactionCounts = async () => {
    try {
      const response = await fetch(`/api/reactions/${postId}`);
      const data = await response.json();
      console.log('Fetched reaction counts:', data); 
      return data;
    } catch (error) {
      console.error('Error fetching reaction counts:', error);
      return { likes: 0, dislikes: 0 };
    }
  };

  useEffect(() => {
    localStorage.setItem(
      `post_${postId}_reaction`,
      JSON.stringify(userReaction)
    );
  }, [userReaction, postId]);

  useEffect(() => {
    const fetchCounts = async () => {
      const updatedCounts = await fetchReactionCounts();
      setCounts(updatedCounts);
    };
    fetchCounts();
  }, [postId]);

  const sendReaction = async (liked, disliked) => {
    try {
      await fetch(`/api/reactions/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, liked, disliked }),
      });

      const updatedCounts = await fetchReactionCounts();
      setCounts(updatedCounts);
    } catch (error) {
      console.error('Error sending reaction:', error);
    }
  };

  const handleLike = async () => {
    if (userReaction === 'like') {
      setUserReaction(null);
      await sendReaction(false, false);
    } else {
      setUserReaction('like');
      await sendReaction(true, false);
    }
  };

  const handleDislike = async () => {
    if (userReaction === 'dislike') {
      setUserReaction(null);
      await sendReaction(false, false);
    } else {
      setUserReaction('dislike');
      await sendReaction(false, true);
    }
  };

  return (
    <div className="like-dislike">
      <button
        className={`like-btn ${userReaction === 'like' ? 'active' : ''}`}
        onClick={handleLike}
        aria-label="Like"
      >
        <span className="emoji">👍</span>
        <span className="count">{counts.likes}</span>
      </button>

      <button
        className={`dislike-btn ${userReaction === 'dislike' ? 'active' : ''}`}
        onClick={handleDislike}
        aria-label="Dislike"
      >
        <span className="emoji">👎</span>
        <span className="count">{counts.dislikes}</span>
      </button>
    </div>
  );
};

export default LikeDislike;
