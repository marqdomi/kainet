// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#00E5FF] mb-4">404</h1>
        <h2 className="text-4xl font-semibold text-white mb-4">
          Página no encontrada
        </h2>
        <p className="text-xl text-gray-400 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#00E5FF] text-black font-semibold px-8 py-3 rounded-lg hover:bg-[#00D9FF] transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
