import React, { useState } from 'react';
import { mockData } from '../data/mock';

const Portfolio = () => {
  const [filter, setFilter] = useState('Todos');
  
  const categories = ['Todos', ...new Set(mockData.portfolio.map(item => item.category))];
  
  const filteredPortfolio = filter === 'Todos' 
    ? mockData.portfolio 
    : mockData.portfolio.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="section bg-black">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="section-heading">Trabajos Realizados</h2>
          <p className="section-subheading max-w-3xl mx-auto">
            Descubre algunos de nuestros proyectos completados con éxito
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-bold uppercase text-sm transition-all duration-300 ${
                filter === category
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((project, index) => (
            <div 
              key={project.id}
              className="group relative overflow-hidden rounded-lg card-hover bg-gray-900"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-yellow-500 text-sm font-bold uppercase mb-2">
                  {project.category}
                </span>
                <h3 className="text-2xl font-black text-white mb-2 uppercase">
                  {project.title}
                </h3>
                <p className="text-gray-300">
                  {project.description}
                </p>
              </div>

              {/* Mobile Info (always visible) */}
              <div className="md:hidden p-4 bg-gray-900">
                <span className="text-yellow-500 text-sm font-bold uppercase block mb-1">
                  {project.category}
                </span>
                <h3 className="text-lg font-black text-white mb-1 uppercase">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
