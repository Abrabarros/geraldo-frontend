import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import PostCreation from '../components/PostCreation';
import PostCard from '../components/PostCard';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      setError('Erro ao buscar posts');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async (title, content) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/posts',
        { title, content },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setPosts([response.data, ...posts]);
    } catch (error) {
      setError('Erro ao criar post');
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchPosts(); // Atualiza a lista de posts após a exclusão
    } catch (error) {
      setError('Erro ao deletar post');
    }
  };

  if (loading) {
    return <div>Carregando posts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="feed">
      <Navbar />
      <PostCreation createPost={createPost} />
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} onDelete={deletePost} fetchPosts={fetchPosts} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
