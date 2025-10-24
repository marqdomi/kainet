// src/pages/NewsletterConfirmPage.jsx
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const NewsletterConfirmPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading'); // loading | success | error | already-confirmed
  const [message, setMessage] = useState('');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Token de confirmación no válido');
      return;
    }

    confirmSubscription(token);
  }, [token]);

  const confirmSubscription = async (token) => {
    try {
      const res = await fetch(`/api/newsletter-confirm?token=${token}`);
      const data = await res.json();

      if (res.ok) {
        if (data.alreadyConfirmed) {
          setStatus('already-confirmed');
          setMessage('Tu suscripción ya estaba confirmada');
        } else {
          setStatus('success');
          setMessage('¡Suscripción confirmada exitosamente!');
        }
      } else {
        setStatus('error');
        setMessage(data.message || 'Error al confirmar tu suscripción');
      }
    } catch (error) {
      console.error('Error confirmando:', error);
      setStatus('error');
      setMessage('Error de conexión. Intenta más tarde.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
          
          {/* Loading State */}
          {status === 'loading' && (
            <>
              <div className="flex justify-center mb-6">
                <Loader className="w-16 h-16 text-[#00E5FF] animate-spin" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">
                Confirmando suscripción...
              </h1>
              <p className="text-gray-400">
                Estamos verificando tu email. Un momento por favor.
              </p>
            </>
          )}

          {/* Success State */}
          {status === 'success' && (
            <>
              <div className="flex justify-center mb-6">
                <div className="bg-green-500/20 rounded-full p-4">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">
                {message}
              </h1>
              <p className="text-gray-400 mb-6">
                ¡Bienvenido a la comunidad KAINET! 🎉
              </p>
              <p className="text-gray-300 mb-8">
                Recibirás nuestros newsletters semanales con contenido sobre IA, automatización, DevOps y desarrollo web.
              </p>
              <div className="space-y-3">
                <Link
                  to="/blog"
                  className="block w-full bg-gradient-to-r from-[#00E5FF] to-[#5227FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Explorar Blog
                </Link>
                <Link
                  to="/"
                  className="block w-full bg-gray-800 text-gray-300 font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Ir al Inicio
                </Link>
              </div>
            </>
          )}

          {/* Already Confirmed State */}
          {status === 'already-confirmed' && (
            <>
              <div className="flex justify-center mb-6">
                <div className="bg-blue-500/20 rounded-full p-4">
                  <CheckCircle className="w-16 h-16 text-blue-500" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">
                {message}
              </h1>
              <p className="text-gray-400 mb-8">
                Ya formas parte de nuestra comunidad. Sigue recibiendo los mejores artículos cada semana.
              </p>
              <div className="space-y-3">
                <Link
                  to="/blog"
                  className="block w-full bg-gradient-to-r from-[#00E5FF] to-[#5227FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Ver Últimos Posts
                </Link>
                <Link
                  to="/"
                  className="block w-full bg-gray-800 text-gray-300 font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Volver al Inicio
                </Link>
              </div>
            </>
          )}

          {/* Error State */}
          {status === 'error' && (
            <>
              <div className="flex justify-center mb-6">
                <div className="bg-red-500/20 rounded-full p-4">
                  <XCircle className="w-16 h-16 text-red-500" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">
                Error en la confirmación
              </h1>
              <p className="text-gray-400 mb-8">
                {message}
              </p>
              <div className="space-y-3">
                <Link
                  to="/#newsletter"
                  className="block w-full bg-gradient-to-r from-[#00E5FF] to-[#5227FF] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Intentar de Nuevo
                </Link>
                <Link
                  to="/"
                  className="block w-full bg-gray-800 text-gray-300 font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Ir al Inicio
                </Link>
              </div>
            </>
          )}

        </div>

        {/* Additional Info */}
        <p className="mt-6 text-gray-500 text-sm">
          ¿Necesitas ayuda?{' '}
          <Link to="/contact" className="text-[#00E5FF] hover:underline">
            Contáctanos
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default NewsletterConfirmPage;
