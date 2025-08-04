import React, { useState, useEffect } from 'react';
import API from '../api/api';

function PostForm({ fetchPosts, editPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setContent(editPost.content);
      setTags(editPost.tags.join(','));
    }
  }, [editPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
    };

    if (editPost) {
      await API.put(`/posts/${editPost._id}`, postData);
    } else {
      await API.post('/posts', postData);
    }

    fetchPosts();
    setTitle('');
    setContent('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>{editPost ? 'Edit Post' : 'Create New Post'}</h4>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="mb-3">
        <textarea className="form-control" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Tags (comma-separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <button className="btn btn-primary">{editPost ? 'Update' : 'Post'}</button>
    </form>
  );
}

export default PostForm;
