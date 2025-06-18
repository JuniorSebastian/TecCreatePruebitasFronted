// src/components/Contact.jsx
import React from 'react';
import { MailIcon, MapPinIcon } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12">Contáctanos</h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Información de contacto */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MailIcon className="text-cyan-600 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Correo</h4>
                <p className="text-gray-600">soporte@teccreate.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPinIcon className="text-cyan-600 mt-1" />
              <div>
                <h4 className="text-lg font-semibold">Ubicación</h4>
                <p className="text-gray-600">TECSUP, Lima, Perú</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Nombre</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Correo electrónico</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="tucorreo@example.com"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Mensaje</label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Escribe tu mensaje..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
