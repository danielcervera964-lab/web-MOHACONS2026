# PRD - MOHACONS 2026 - Web Profesional de Construcción

## Información del Proyecto
**Fecha de Inicio:** 20 de Marzo de 2026  
**Cliente:** MOHACONS (Moha Construcciones)  
**Sector:** Construcción, reformas y albañilería  
**Objetivo:** Web oficial profesional para captación de clientes y generación de presupuestos

---

## Problema Statement Original
Diseñar y desarrollar una página web oficial, moderna, visualmente impactante y altamente profesional para una empresa de construcción, con nivel comparable a empresas líderes del sector. La web debe transmitir máxima confianza, calidad y profesionalidad, siendo el sitio oficial de la empresa.

---

## Identidad Visual
**Colores del Logo:**
- Negro principal (#1a1a1a)
- Amarillo/Dorado (#FFB800)
- Gris/Plata (#D4D4D4)  
- Blanco (#FFFFFF)

**Slogan:** "HECHOS NO PROMESAS"  
**Teléfono:** 624 67 21 82  
**WhatsApp Business:** +34 624 67 21 82

---

## User Personas
1. **Propietario de Vivienda** - Busca reformas y trabajos de albañilería de calidad
2. **Promotor/Constructor** - Necesita subcontratistas profesionales
3. **Administrador de Fincas** - Requiere servicios de mantenimiento y reparación
4. **Empresa/Negocio** - Busca reformas comerciales y obras industriales

---

## Arquitectura Técnica
- **Frontend:** React 19 + Tailwind CSS + Shadcn/UI
- **Backend:** FastAPI + Python
- **Base de Datos:** MongoDB
- **Hosting:** Emergent Platform

---

## Funcionalidades Implementadas (20/03/2026)

### ✅ Frontend (COMPLETADO)
1. **Navbar**
   - Logo integrado
   - Menú de navegación responsive
   - Teléfono visible
   - Warning stripe (franja amarilla/negra)

2. **Hero Section**
   - Logo destacado
   - Título impactante
   - Slogan con diseño especial
   - 2 CTAs: "Solicitar Presupuesto" + "Llamar Ahora"
   - Trust indicators (experiencia, proyectos, satisfacción)
   - Imagen de fondo profesional

3. **Servicios** (6 categorías detalladas)
   - Albañilería General
   - Revestimientos
   - Suelos y Paredes
   - Reformas y Reparaciones
   - Trabajos Exteriores
   - Otros Trabajos
   - Iconos personalizados
   - CTA de solicitar información

4. **Portfolio**
   - Galería de 6 proyectos
   - Filtros por categoría
   - Imágenes reales del cliente + stock profesional
   - Hover effects

5. **Sobre Nosotros**
   - Presentación de la empresa
   - 6 razones para elegir MOHACONS
   - Metodología de trabajo (4 pasos)

6. **Testimonios**
   - 4 opiniones de clientes
   - Sistema de estrellas
   - CTA para solicitar presupuesto

7. **Contacto**
   - **Formulario Detallado** con:
     - Nombre, Email, Teléfono
     - Tipo de servicio (dropdown con categorías)
     - Dirección del proyecto
     - Descripción detallada
     - Presupuesto aproximado
     - Nivel de urgencia
   - **Tarjeta de Teléfono** (requiere registro)
   - **Botón WhatsApp Business** (directo)
   - Tarjeta de Email

8. **Modal de Registro para Llamada**
   - Captura de nombre y email antes de permitir llamada
   - Notificación de éxito
   - Redirección automática a tel:

9. **Footer**
   - Información completa de la empresa
   - Enlaces rápidos
   - Servicios
   - Redes sociales
   - Warning stripe superior

10. **Diseño General**
    - Color scheme del logo aplicado
    - Animaciones suaves
    - Responsive design
    - Toast notifications (Sonner)
    - Scrollbar personalizado

### 🔄 Funcionalidades con Mock Data (Frontend Only)
- Formulario de presupuesto (se guarda localmente)
- Registro para llamada (validación frontend)
- Toasts de confirmación

---

## Backlog Priorizado

### P0 - Backend (PRÓXIMA FASE)
- [ ] API para guardar presupuestos en MongoDB
- [ ] API para registros de llamada
- [ ] Envío de emails automáticos
- [ ] Panel de administración básico

### P1 - Integraciones
- [ ] Integración real con WhatsApp Business API
- [ ] Sistema de envío de emails (SendGrid/similar)
- [ ] Google Analytics
- [ ] Google Maps para ubicación

### P2 - Mejoras
- [ ] Galería ampliable de portfolio
- [ ] Blog/Noticias
- [ ] Chat en vivo
- [ ] Multi-idioma
- [ ] SEO avanzado

---

## API Contracts (Para Implementación Backend)

### POST /api/presupuestos
```json
{
  "nombre": "string",
  "email": "string",
  "telefono": "string",
  "tipoServicio": "string",
  "direccion": "string",
  "descripcion": "string",
  "presupuesto": "string",
  "urgencia": "string",
  "fecha": "timestamp"
}
```

### POST /api/registros-llamada
```json
{
  "nombre": "string",
  "email": "string",
  "fecha": "timestamp",
  "llamadaRealizada": "boolean"
}
```

### GET /api/presupuestos
- Requiere autenticación
- Devuelve lista de presupuestos

---

## Próximos Pasos
1. ✅ Aprobar diseño frontend con cliente
2. ⏳ Desarrollar backend para guardar datos
3. ⏳ Implementar envío de emails
4. ⏳ Testing end-to-end
5. ⏳ Deployment a producción

---

## Notas Técnicas
- Los colores están definidos en `/app/frontend/src/App.css`
- Mock data en `/app/frontend/src/data/mock.js`
- Componentes modulares en `/app/frontend/src/components/`
- El logo del cliente está hosteado en Emergent Assets
- Imágenes de stock profesionales de Unsplash

---

**Estado Actual:** Frontend MVP completado ✅  
**Siguiente Milestone:** Implementación de backend
