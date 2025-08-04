import React, { useEffect, useState } from 'react';
import API from '../api/api';
import PostForm from '../components/PostForm';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);

  const fetchPosts = async () => {
    const res = await API.get('/posts');
    setPosts(res.data);
    setEditPost(null);
  };

  const deletePost = async (id) => {
    await API.delete(`/posts/${id}`);
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Your Posts</h2>
      <PostForm fetchPosts={fetchPosts} editPost={editPost} />
      <div className="row">
        {posts.map(post => (
          <div className="col-md-4 mb-3" key={post._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content.substring(0, 100)}...</p>
                <p className="card-text text-muted">
                  <small>Created at: {new Date(post.createdAt).toLocaleString()}</small>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-sm btn-warning" onClick={() => setEditPost(post)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => deletePost(post._id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
