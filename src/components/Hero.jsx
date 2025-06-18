import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
        src="https://videos.pexels.com/video-files/3184465/3184465-hd_1280_720_25fps.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/60 to-purple-900/50 z-10" />

      {/* Elementos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[15]">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 text-white">
        <motion.h1
          className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Crea presentaciones{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            increíbles
          </span>{' '}
          con IA
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl max-w-4xl mb-10 text-gray-200 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          TecCreate transforma tus ideas en diapositivas profesionales en segundos.{' '}
          <span className="text-cyan-300 font-semibold">Sin complicaciones. Con inteligencia.</span>
        </motion.p>
        <motion.button
          onClick={() => navigate('/login')}
          className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 text-white font-bold px-12 py-4 rounded-full shadow-2xl transition-all duration-300 text-lg"
          whileHover={{ scale: 1.08, y: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          🚀 Iniciar con Google
        </motion.button>
        <motion.p
          className="text-sm text-gray-300 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          Solo para miembros TECSUP
        </motion.p>
      </div>
    </div>
  );
}
