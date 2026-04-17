// Mock data para MOHACONS 2026
export const mockData = {
  company: {
    name: 'MOHACONS',
    fullName: 'Moha Construcciones',
    slogan: 'HECHOS NO PROMESAS',
    phone: '624672182',
    phoneFormatted: '624 67 21 82',
    whatsapp: '34624672182', // Incluir código país para WhatsApp
    email: 'Allalimoha560@gmail.com',
    logo: '/logo.svg',
    ownerPhoto: 'https://images.unsplash.com/photo-1504307651254-35680f356f27?w=1000&q=80',
    ownerName: 'Mohamed Allali',
    ownerTitle: 'Director y Fundador'
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
      description: 'Renovación completa con encimera de mármol y muebles modernos',
      image: 'https://images.unsplash.com/photo-1765371514650-1f99696ca69f?w=800',
      category: 'Reformas'
    },
    {
      id: 2,
      title: 'Baño Moderno con Azulejos',
      description: 'Alicatado completo con azulejos contemporáneos y mampara',
      image: 'https://images.unsplash.com/photo-1638799869566-b17fa794c4de?w=800',
      category: 'Reformas'
    },
    {
      id: 3,
      title: 'Solado Geométrico',
      description: 'Instalación de suelo cerámico con patrón geométrico',
      image: 'https://images.unsplash.com/photo-1708919268841-27c120c45a92?w=800',
      category: 'Suelos'
    },
    {
      id: 4,
      title: 'Muro de Ladrillo Profesional',
      description: 'Construcción de muro de ladrillo visto con acabado perfecto',
      image: 'https://images.unsplash.com/photo-1744540728562-86db0f7439af?w=800',
      category: 'Albañilería'
    },
    {
      id: 5,
      title: 'Baño de Diseño',
      description: 'Reforma completa con azulejos oscuros y detalles modernos',
      image: 'https://images.pexels.com/photos/7167064/pexels-photo-7167064.jpeg?w=800',
      category: 'Reformas'
    },
    {
      id: 6,
      title: 'Cocina Contemporánea',
      description: 'Cocina reformada con acabados de madera y encimera de calidad',
      image: 'https://images.unsplash.com/photo-1765371514211-9b93c204bb81?w=800',
      category: 'Reformas'
    },
    {
      id: 7,
      title: 'Suelo de Mármol Hexagonal',
      description: 'Instalación de baldosas de mármol con diseño hexagonal',
      image: 'https://images.pexels.com/photos/6175107/pexels-photo-6175107.jpeg?w=800',
      category: 'Suelos'
    },
    {
      id: 8,
      title: 'Muro de Ladrillo Rojo',
      description: 'Construcción tradicional de muro de ladrillo rojo',
      image: 'https://images.pexels.com/photos/51119/wall-stones-hauswand-structure-51119.jpeg?w=800',
      category: 'Albañilería'
    },
    {
      id: 9,
      title: 'Baño Minimalista',
      description: 'Reforma con mueble flotante y acabados de lujo',
      image: 'https://images.unsplash.com/photo-1595514534892-a1ce92ee8677?w=800',
      category: 'Reformas'
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
