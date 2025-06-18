// src/components/Features.jsx
import React from 'react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    img: "https://img.icons8.com/color/96/artificial-intelligence.png",
    title: "Creación Automática",
    desc: "Genera presentaciones listas para usar a partir de un simple prompt o tema.",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    bgGradient: "from-blue-50 to-cyan-50"
  },
  {
    img: "https://img.icons8.com/color/96/combo-chart--v1.png",
    title: "Diseño Profesional",
    desc: "Plantillas elegantes, modernas y adaptadas a tus necesidades académicas o docentes.",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    bgGradient: "from-purple-50 to-pink-50"
  },
  {
    img: "https://img.icons8.com/color/96/google-logo.png",
    title: "Acceso con Google",
    desc: "Solo para miembros TECSUP. Inicia sesión con tu cuenta institucional en segundos.",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bgGradient: "from-emerald-50 to-teal-50"
  }
];

export default function Features() {
  return (
    <section id="funcionalidades" className="bg-gradient-to-br from-white to-gray-50 py-20 px-6 md:px-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <motion.h2
        className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        ¿Por qué usar TecCreate?
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center relative z-10">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={i}
            className={`group p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${feature.bgGradient} border border-white/50 backdrop-blur-sm relative overflow-hidden`}
            whileHover={{ scale: 1.05, y: -10 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
            <motion.img
              src={feature.img}
              alt={feature.title}
              className="mx-auto mb-6 drop-shadow-lg"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
              {feature.title}
            </h3>
            <p className="text-gray-700 leading-relaxed font-medium">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
