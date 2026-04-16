const { Resend } = require('resend');

module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const { tipo, nombre, email, telefono, servicio, tipoServicio, direccion, descripcion, presupuesto, urgencia } = body;

    // Validate required fields
    if (!nombre || !email || !telefono) {
      return res.status(400).json({ error: 'Nombre, email y teléfono son obligatorios' });
    }

    const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'Allalimoha560@gmail.com';
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({ error: 'Servicio de email no configurado' });
    }

    const resend = new Resend(RESEND_API_KEY);

    let subject, htmlContent;

    if (tipo === 'presupuesto') {
      // Budget request email
      subject = `🔨 Nueva Solicitud de Presupuesto - ${nombre}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #ffffff; border: 2px solid #eab308; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #eab308; padding: 20px; text-align: center;">
            <h1 style="color: #000000; margin: 0; font-size: 24px;">📋 NUEVA SOLICITUD DE PRESUPUESTO</h1>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #eab308; border-bottom: 1px solid #333; padding-bottom: 10px;">Datos del Cliente</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #9ca3af; width: 140px;">👤 Nombre:</td>
                <td style="padding: 8px 0; color: #ffffff; font-weight: bold;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9ca3af;">📧 Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #eab308;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9ca3af;">📞 Teléfono:</td>
                <td style="padding: 8px 0;"><a href="tel:${telefono}" style="color: #eab308; font-weight: bold; font-size: 18px;">${telefono}</a></td>
              </tr>
            </table>

            <h2 style="color: #eab308; border-bottom: 1px solid #333; padding-bottom: 10px; margin-top: 20px;">Detalles del Proyecto</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #9ca3af; width: 140px;">🔧 Servicio:</td>
                <td style="padding: 8px 0; color: #ffffff;">${tipoServicio || 'No especificado'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9ca3af;">📍 Dirección:</td>
                <td style="padding: 8px 0; color: #ffffff;">${direccion || 'No especificada'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9ca3af;">💰 Presupuesto:</td>
                <td style="padding: 8px 0; color: #ffffff;">${presupuesto || 'No especificado'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #9ca3af;">⚡ Urgencia:</td>
                <td style="padding: 8px 0; color: ${urgencia === 'urgente' ? '#ef4444' : urgencia === 'alta' ? '#f97316' : '#eab308'}; font-weight: bold; text-transform: uppercase;">${urgencia || 'Normal'}</td>
              </tr>
            </table>

            <h2 style="color: #eab308; border-bottom: 1px solid #333; padding-bottom: 10px; margin-top: 20px;">Descripción</h2>
            <div style="background-color: #2d2d2d; padding: 15px; border-radius: 6px; color: #d1d5db;">
              ${descripcion || 'Sin descripción'}
            </div>

            <div style="margin-top: 25px; text-align: center;">
              <a href="tel:${telefono}" style="display: inline-block; background-color: #eab308; color: #000000; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">📞 LLAMAR AL CLIENTE</a>
            </div>
          </div>
          <div style="background-color: #111; padding: 15px; text-align: center; border-top: 1px solid #333;">
            <p style="color: #6b7280; margin: 0; font-size: 12px;">MOHACONS - Sistema de Contacto Web</p>
          </div>
        </div>
      `;
    } else {
      // Simple contact email
      subject = `📩 Nuevo Contacto Web - ${nombre}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #1a1a1a; color: #ffffff; border: 2px solid #eab308; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #eab308; padding: 20px; text-align: center;">
            <h1 style="color: #000000; margin: 0; font-size: 24px;">📩 NUEVO CONTACTO WEB</h1>
          </div>
          <div style="padding: 30px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #9ca3af; width: 140px;">👤 Nombre:</td>
                <td style="padding: 10px 0; color: #ffffff; font-weight: bold; font-size: 18px;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #9ca3af;">📧 Email:</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #eab308;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #9ca3af;">📞 Teléfono:</td>
                <td style="padding: 10px 0;"><a href="tel:${telefono}" style="color: #eab308; font-weight: bold; font-size: 18px;">${telefono}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #9ca3af;">🔧 Servicio:</td>
                <td style="padding: 10px 0; color: #ffffff;">${servicio || 'No especificado'}</td>
              </tr>
            </table>

            <div style="margin-top: 25px; text-align: center;">
              <a href="tel:${telefono}" style="display: inline-block; background-color: #eab308; color: #000000; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">📞 LLAMAR AL CLIENTE</a>
              <a href="https://wa.me/34${telefono.replace(/\s/g, '')}" style="display: inline-block; background-color: #22c55e; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; margin-left: 10px;">💬 WhatsApp</a>
            </div>
          </div>
          <div style="background-color: #111; padding: 15px; text-align: center; border-top: 1px solid #333;">
            <p style="color: #6b7280; margin: 0; font-size: 12px;">MOHACONS - Sistema de Contacto Web</p>
          </div>
        </div>
      `;
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'MOHACONS Web <onboarding@resend.dev>',
      to: [CONTACT_EMAIL],
      subject: subject,
      html: htmlContent,
      reply_to: email
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Error al enviar el email' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Email enviado correctamente',
      id: data.id 
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
