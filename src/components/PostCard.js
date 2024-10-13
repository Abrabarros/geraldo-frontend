import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PostDetailsModal from './PostDetailsModal'; // Certifique-se de importar o modal correto

const PostCard = ({ post, onDelete, fetchPosts }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => setShowDetails(true);
  const handleCloseDetails = () => setShowDetails(false);

  const handleDelete = () => {
    onDelete(post._id); // Passa o ID do post para a função de deletar
    handleCloseDetails(); // Fecha o modal após deletar
  };

  const handleSave = () => {
    fetchPosts(); // Atualiza a lista de posts imediatamente após salvar a edição
    handleCloseDetails(); // Fecha o modal após salvar
  };

  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.content.slice(0, 100)}...</p>
      <Button onClick={handleShowDetails}>Ver Detalhes</Button>

      <PostDetailsModal
        show={showDetails}
        handleClose={handleCloseDetails}
        post={post}
        onDelete={handleDelete}
        onSave={handleSave} // Passando a função de salvar
      />
    </div>
  );
};

export default PostCard;
