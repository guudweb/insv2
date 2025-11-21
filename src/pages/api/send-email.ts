import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, category, message } = data;

    // Validación básica
    if (!name || !email || !phone || !category || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Todos los campos son obligatorios'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Email inválido'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Configurar transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST,
      port: parseInt(import.meta.env.SMTP_PORT),
      secure: import.meta.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

    // Mapear categorías a texto legible y emails específicos
    const categoryMap: { [key: string]: { text: string; email: string } } = {
      consulta: {
        text: 'Consulta General',
        email: 'consultas@inseso.org'
      },
      afiliacion: {
        text: 'Afiliación',
        email: 'afiliacion@inseso.org'
      },
      prestaciones: {
        text: 'Prestaciones Sociales',
        email: 'prestaciones@inseso.org'
      },
      reclamo: {
        text: 'Reclamo',
        email: 'reclamos@inseso.org'
      },
      seguimiento: {
        text: 'Seguimiento de Trámite',
        email: 'seguimiento@inseso.org'
      },
      sugerencia: {
        text: 'Sugerencia',
        email: 'sugerencias@inseso.org'
      },
      otro: {
        text: 'Otro',
        email: 'support@omnitechsl.com' //info@inseso.org
      }
    };

    const categoryData = categoryMap[category] || { text: category, email: 'info@inseso.org' };
    const categoryText = categoryData.text;
    const recipientEmail = categoryData.email;

    // Configurar email con destinatario específico por categoría y copia a info@
    const mailOptions = {
      from: `"Formulario INSESO" <${import.meta.env.SMTP_FROM}>`,
      to: recipientEmail,
      cc: 'nguemanisaac@gmail.com', //info@inseso.org
      subject: `Nuevo mensaje de contacto - ${categoryText}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #8c1b12; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #8c1b12; }
            .value { margin-top: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Nuevo mensaje desde el formulario de contacto</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nombre:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Teléfono:</div>
                <div class="value">${phone}</div>
              </div>
              <div class="field">
                <div class="label">Categoría:</div>
                <div class="value">${categoryText}</div>
              </div>
              <div class="field">
                <div class="label">Mensaje:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>Este mensaje fue enviado desde el formulario de contacto de inseso.org</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Nuevo mensaje de contacto - ${categoryText}

Nombre: ${name}
Email: ${email}
Teléfono: ${phone}
Categoría: ${categoryText}

Mensaje:
${message}

---
Este mensaje fue enviado desde el formulario de contacto de inseso.org
      `
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Mensaje enviado correctamente'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error al enviar email:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error al enviar el mensaje. Por favor, intente de nuevo más tarde.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
