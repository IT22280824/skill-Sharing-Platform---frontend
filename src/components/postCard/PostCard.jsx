import React, { useState, useEffect } from 'react';
import CommentSection from '../comment section/CommentSection';
import LikeDislike from '../like dislike/likeDislike.jsx';
import './PostCardStyles.css';

const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    console.log("Post data:", post);
  }, [post]);

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>{new Date(post.createdAt).toLocaleString()}</small>

      <div className="post-actions">
        
        <LikeDislike postId={post.id} likeCount={post.likeCount} dislikeCount={post.dislikeCount} />
        
        <button onClick={toggleComments}>
          💬 {showComments ? "Hide" : "Show"} Comments
        </button>
      </div>

      {showComments && <CommentSection postId={post.id} />}
    </div>
  );
};

export default PostCard;
