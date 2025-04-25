import React, {useEffect, useState} from 'react';
import api from '../../api/axiosConfig.jsx';
import "./PostStyles.css";

const Post = ({ post }) => {

    const [posts, setPosts] = useState([]);

    const getPosts = async () =>{
        try {
            const response = await api.get("/api/posts");
        
            if (response.status === 200) {
              setPosts(response.data);
              console.log(response.data)
            } else {
              console.error("Failed to fetch posts:", response.status);
            }

        } catch (error) {
            console.error("Error fetching posts:", error.message);
        }
    }


    useEffect(() => {
        getPosts();
    }, [])

  return (
    <div className="post">
      {/* Map over posts and render each one */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  )
}

export default Post