import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Recupera o nome do usuário do localStorage
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Senac Fofocas</div>
      <div className="navbar-user-icon">
        {userName ? userName : 'Usuário'} {/* Mostra o nome ou "Usuário" como fallback */}
      </div>
    </nav>
  );
};

export default Navbar;
