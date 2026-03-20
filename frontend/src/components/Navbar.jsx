import React, { useState } from 'react';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { mockData } from '../data/mock';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Trabajos', href: '#portfolio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' }
  ];

  const handleClick = (href) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={mockData.company.logo} 
                alt={mockData.company.name}
                className="h-16 w-auto"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.href);
                  }}
                  className="text-white hover:text-yellow-500 transition-colors duration-300 font-medium uppercase text-sm"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Contact Info Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <a 
                href={`tel:${mockData.company.phone}`}
                className="flex items-center space-x-2 text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-bold">{mockData.company.phoneFormatted}</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-yellow-500 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.href);
                  }}
                  className="block text-white hover:text-yellow-500 transition-colors duration-300 font-medium uppercase text-sm py-2"
                >
                  {item.label}
                </a>
              ))}
              <a 
                href={`tel:${mockData.company.phone}`}
                className="flex items-center space-x-2 text-yellow-500 hover:text-yellow-400 transition-colors py-2"
              >
                <Phone className="w-5 h-5" />
                <span className="font-bold">{mockData.company.phoneFormatted}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
      
      {/* Warning stripe */}
      <div className="fixed top-20 left-0 right-0 z-40 warning-stripe"></div>
    </>
  );
};

export default Navbar;
