import React, { useEffect, useState } from 'react'
import api from '../../api/axiosConfig';
import PostCard from '../postCard/PostCard';
import './PostStyles.css';

const PostList = () => {

    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const response = await api.get("/api/posts");
        setPosts(response.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostList