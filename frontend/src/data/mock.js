// Mock data para MOHACONS 2026
export const mockData = {
  company: {
    name: 'MOHACONS',
    fullName: 'Moha Construcciones',
    slogan: 'HECHOS NO PROMESAS',
    phone: '624672182',
    phoneFormatted: '624 67 21 82',
    whatsapp: '34624672182', // Incluir código país para WhatsApp
    email: 'info@mohacons.com',
    logo: 'https://customer-assets.emergentagent.com/job_reforma-profesional/artifacts/6v19d988_1f07a31d-f777-4af3-8269-c3d39daafdca.JPG'
  },
  
  services: [
    {
      id: 1,
      category: 'Albañilería General',
      icon: 'Hammer',
      items: [
        'Muros de ladrillo',
        'Muros de bloque',
        'Tabiques interiores',
        'Cerramientos exteriores',
        'Medianeras'
      ]
    },
    {
      id: 2,
      category: 'Revestimientos',
      icon: 'PaintBucket',
      items: [
        'Enfoscados (mortero en paredes)',
        'Enlucidos (acabado fino)',
        'Revoco',
        'Monocapa',
        'Mortero proyectado'
      ]
    },
    {
      id: 3,
      category: 'Suelos y Paredes',
      icon: 'Grid3x3',
      items: [
        'Alicatado (colocación de azulejos)',
        'Solado (colocación de suelos)',
        'Colocación de gres, porcelánico y mármol',
        'Rodapiés'
      ]
    },
    {
      id: 4,
      category: 'Reformas y Reparaciones',
      icon: 'Wrench',
      items: [
        'Derribos pequeños (tabiques)',
        'Reparación de grietas',
        'Arreglo de humedades',
        'Sustitución de azulejos o suelos',
        'Nivelación de suelos'
      ]
    },
    {
      id: 5,
      category: 'Trabajos Exteriores',
      icon: 'Building2',
      items: [
        'Fachadas (reparación y revestimiento)',
        'Colocación de piedra',
        'Revestimientos exteriores',
        'Escaleras de obra'
      ]
    },
    {
      id: 6,
      category: 'Otros Trabajos',
      icon: 'Tool',
      items: [
        'Colocación de bordillos',
        'Pequeñas estructuras (barbacoas, jardineras)',
        'Arquetas',
        'Preparación de superficies'
      ]
    }
  ],

  portfolio: [
    {
      id: 1,
      title: 'Reforma Integral Cocina',
      description: 'Renovación completa con alicatado y solado de porcelánico',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
      category: 'Reformas'
    },
    {
      id: 2,
      title: 'Construcción de Muro',
      description: 'Muro de ladrillo visto con acabado profesional',
      image: 'https://customer-assets.emergentagent.com/job_reforma-profesional/artifacts/10jhxf0s_12f7a0c9-4514-492b-b842-bfb19b8ef22e.JPG',
      category: 'Albañilería'
    },
    {
      id: 3,
      title: 'Baño Moderno',
      description: 'Alicatado completo con azulejos de alta calidad',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800',
      category: 'Reformas'
    },
    {
      id: 4,
      title: 'Fachada Exterior',
      description: 'Revestimiento de fachada con monocapa',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
      category: 'Exteriores'
    },
    {
      id: 5,
      title: 'Solado Porcelánico',
      description: 'Instalación de suelo porcelánico gran formato',
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f1a4691?w=800',
      category: 'Suelos'
    },
    {
      id: 6,
      title: 'Obra Industrial',
      description: 'Tabiquería y cerramientos en nave industrial',
      image: 'https://customer-assets.emergentagent.com/job_reforma-profesional/artifacts/10jhxf0s_12f7a0c9-4514-492b-b842-bfb19b8ef22e.JPG',
      category: 'Albañilería'
    }
  ],

  testimonials: [
    {
      id: 1,
      name: 'Carlos Martínez',
      text: 'Excelente trabajo en la reforma de mi cocina. Muy profesionales, puntuales y el resultado superó mis expectativas. Totalmente recomendables.',
      rating: 5,
      project: 'Reforma de cocina'
    },
    {
      id: 2,
      name: 'Ana López',
      text: 'Contratamos a MOHACONS para el alicatado de nuestro baño. El acabado es perfecto, muy limpios y cuidadosos. Repetiremos sin duda.',
      rating: 5,
      project: 'Alicatado de baño'
    },
    {
      id: 3,
      name: 'Miguel Rodríguez',
      text: 'Trabajo impecable en la construcción del muro de mi parcela. Rápidos, serios y con un precio muy competitivo. 100% satisfecho.',
      rating: 5,
      project: 'Construcción de muro'
    },
    {
      id: 4,
      name: 'Laura Sánchez',
      text: 'Nos arreglaron unas grietas y humedades que teníamos. Muy profesionales en el diagnóstico y la solución. Ya no tenemos problemas.',
      rating: 5,
      project: 'Reparación de humedades'
    }
  ],

  whyChooseUs: [
    {
      icon: 'Award',
      title: 'Experiencia en el Sector',
      description: 'Años de trayectoria realizando todo tipo de trabajos de construcción y albañilería'
    },
    {
      icon: 'CheckCircle2',
      title: 'Alta Calidad en Acabados',
      description: 'Utilizamos materiales de primera calidad y técnicas profesionales para garantizar resultados duraderos'
    },
    {
      icon: 'Clock',
      title: 'Cumplimiento de Plazos',
      description: 'Planificamos cada proyecto para entregarlo en los tiempos acordados'
    },
    {
      icon: 'Users',
      title: 'Trato Cercano',
      description: 'Atención personalizada y asesoramiento en cada fase del proyecto'
    },
    {
      icon: 'Shield',
      title: 'Responsabilidad y Seriedad',
      description: 'Compromiso total con cada trabajo, por pequeño o grande que sea'
    },
    {
      icon: 'ThumbsUp',
      title: 'Presupuesto Sin Compromiso',
      description: 'Valoramos tu proyecto de forma gratuita y sin obligación'
    }
  ],

  methodology: [
    {
      step: 1,
      title: 'Asesoramiento Personalizado',
      description: 'Analizamos tus necesidades y te orientamos sobre la mejor solución'
    },
    {
      step: 2,
      title: 'Presupuesto Detallado',
      description: 'Te facilitamos un presupuesto claro y sin compromiso'
    },
    {
      step: 3,
      title: 'Ejecución Profesional',
      description: 'Realizamos el trabajo con la máxima calidad y profesionalidad'
    },
    {
      step: 4,
      title: 'Entrega y Garantía',
      description: 'Entregamos tu proyecto en plazo con garantía de calidad'
    }
  ]
};
