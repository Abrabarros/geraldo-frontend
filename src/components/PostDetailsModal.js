import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const PostDetailsModal = ({ show, handleClose, post, fetchPosts, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/posts/${post._id}`,
        { title: editedTitle, content: editedContent },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      onSave(); // Chama a função de salvar que atualiza o feed
    } catch (error) {
      console.error('Erro ao editar post:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Editar Post' : 'Detalhes do Post'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isEditing ? (
          <Form onSubmit={handleEdit}>
            <Form.Group controlId="editTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="editContent" className="mt-3">
              <Form.Label>Conteúdo</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Salvar
              </Button>
            </Modal.Footer>
          </Form>
        ) : (
          <>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <Modal.Footer>
              <Button variant="danger" onClick={onDelete}>
                Deletar
              </Button>
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PostDetailsModal;
