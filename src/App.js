import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Feed from './pages/Feed';
import Register from './components/Register'; // Adicionando o novo componente de Registro
import PostDetailsModal from './components/PostDetailsModal'; // Adicionando o componente de detalhes do post

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica se o token JWT está no localStorage para manter a sessão ativa
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rota para Login */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Nova Rota para Registro */}
          <Route path="/register" element={<Register />} />

          {/* Rota para Feed, apenas se autenticado */}
          {isAuthenticated ? (
            <Route path="/feed" element={<Feed />} />
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}

          {/* Nova Rota para Detalhes do Post */}
          {isAuthenticated && <Route path="/post/:id" element={<PostDetailsModal />} />}

          {/* Redirecionamento automático */}
          {isAuthenticated && <Route path="*" element={<Navigate to="/feed" />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
