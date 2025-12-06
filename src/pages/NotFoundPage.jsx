// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import SEO from '../components/SEO';

const NotFoundPage = () => {
    return (
        <>
            <SEO
                title="404 - Página No Encontrada"
                description="La página que buscas no existe o ha sido movida."
            />

            <div className="min-h-screen flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-lg"
                >
                    {/* Glitch Effect Number */}
                    <div className="relative mb-8">
                        <h1
                            className="text-[120px] sm:text-[180px] font-bold leading-none"
                            style={{
                                background: 'linear-gradient(135deg, var(--cyan-neon) 0%, var(--purple-neon) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 0 40px rgba(0, 229, 255, 0.3)'
                            }}
                        >
                            404
                        </h1>
                        <div
                            className="absolute inset-0 text-[120px] sm:text-[180px] font-bold leading-none opacity-20 blur-sm"
                            style={{
                                background: 'linear-gradient(135deg, var(--cyan-neon) 0%, var(--purple-neon) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            404
                        </div>
                    </div>

                    {/* Message */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                        Página no encontrada
                    </h2>
                    <p className="text-[var(--text-secondary)] mb-8 text-base sm:text-lg">
                        La página que buscas no existe, ha sido movida o eliminada.
                        Verifica la URL o navega a una de nuestras secciones.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="btn btn-md btn-primary"
                        >
                            <Home className="w-5 h-5" />
                            Ir al Inicio
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="btn btn-md btn-accent"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Volver Atrás
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <p className="text-sm text-[var(--text-tertiary)] mb-4">También puedes visitar:</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/servicios" className="text-[var(--cyan-neon)] hover:underline text-sm">Servicios</Link>
                            <Link to="/productos" className="text-[var(--cyan-neon)] hover:underline text-sm">Productos</Link>
                            <Link to="/blog" className="text-[var(--cyan-neon)] hover:underline text-sm">Blog</Link>
                            <Link to="/contact" className="text-[var(--cyan-neon)] hover:underline text-sm">Contacto</Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default NotFoundPage;
