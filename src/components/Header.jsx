// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white shadow z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">TecCreate IA</h1>
        <nav className="space-x-6">
          {[
            { href: '#inicio', text: 'Inicio' },
            { href: '#funcionalidades', text: 'Funcionalidades' },
            { href: '#testimonios', text: 'Testimonios' },
            { href: '#contacto', text: 'Contacto' },
          ].map((link) => (
            <a
              key={link.text}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300"
            >
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
