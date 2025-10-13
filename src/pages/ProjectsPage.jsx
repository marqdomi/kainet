// src/pages/ProjectsPage.jsx
import React from 'react';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-8">
          Proyectos
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          Página de proyectos en construcción. Aquí mostraremos el portafolio completo.
        </p>
        
        {/* Placeholder for future projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-[#00E5FF] transition-colors">
            <h3 className="text-2xl font-semibold text-white mb-4">KAINET Resto</h3>
            <p className="text-gray-400">Sistema de gestión con IA para restaurantes</p>
          </div>
          
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-[#00E5FF] transition-colors">
            <h3 className="text-2xl font-semibold text-white mb-4">News Aggregator</h3>
            <p className="text-gray-400">Agregador inteligente de noticias tech</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
