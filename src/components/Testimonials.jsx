// src/components/Testimonials.jsx
import React from 'react';
import { motion } from 'framer-motion';

const TESTIMONIOS = [
  {
    nombre: 'Ana López',
    cargo: 'Docente de TECSUP',
    mensaje: 'TecCreate ha revolucionado la forma en que preparo mis clases. Es intuitivo, rápido y poderoso.',
  },
  {
    nombre: 'Carlos Mendoza',
    cargo: 'Estudiante de Química',
    mensaje: 'Gracias a TecCreate puedo generar presentaciones profesionales en minutos. ¡Me encanta!',
  },
  {
    nombre: 'Lucía Pérez',
    cargo: 'Coordinadora Académica',
    mensaje: 'Facilita la vida docente. Las presentaciones son visualmente atractivas y de alta calidad.',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-20 px-6 relative overflow-hidden" id="testimonios">
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-r from-cyan-300/20 to-blue-300/20 rounded-full blur-3xl"></div>

      <motion.h2
        className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Lo que dicen nuestros usuarios
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto relative z-10">
        {TESTIMONIOS.map((testimonio, i) => (
          <motion.div
            key={i}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50 relative overflow-hidden group"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            <div className="text-5xl text-blue-500/20 mb-4 font-serif">"</div>
            <p className="italic text-gray-700 mb-6 text-lg leading-relaxed font-medium relative z-10">
              {testimonio.mensaje}
            </p>
            <div className="border-t border-gray-200 pt-6">
              <p className="font-bold text-gray-800 text-xl">{testimonio.nombre}</p>
              <p className="text-blue-600 font-semibold text-sm mt-1">{testimonio.cargo}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
