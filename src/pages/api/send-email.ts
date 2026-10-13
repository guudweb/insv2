// CAMBIO INSESO 2026-10-13: identidad verde y correcciones previas; detalles en docs/CAMBIOS_REVISION_2.md.
import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { getCategoriasContacto } from '../../lib/strapi';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, category, message } = data;

    if ([name,email,phone,category,message].some(v => typeof v !== 'string' || v.length > 5000) || name.length > 150 || email.length > 254 || phone.length > 50) return new Response(JSON.stringify({success:false,message:'Datos inválidos'}),{status:400,headers:{'Content-Type':'application/json'}});
    const escapeHtml = (text: string) => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
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

    // Obtener categorías desde la función centralizada
    const categorias = getCategoriasContacto();
    const categoryData = categorias.find(cat => cat.value === category);

    if (!categoryData) return new Response(JSON.stringify({success:false,message:'Categoría inválida'}),{status:400,headers:{'Content-Type':'application/json'}});
    const categoryText = categoryData.label;
    const recipientEmail = categoryData?.email || 'info@inseso.org';

    // Configurar email con destinatarios y copias
    // TO: catalina.dougan, carlos.endje, david.obama, severo.ngua, antonio.mangue
    // CC: info@inseso.org, nso.moises@inseso.org, carlos.endje@inseso.org
    const mailOptions = {
      from: `"Formulario INSESO" <${import.meta.env.SMTP_FROM}>`,
      to: recipientEmail,
      cc: 'info@inseso.org, nso.moises@inseso.org, carlos.endje@inseso.org',
      subject: `Nuevo mensaje de contacto - ${categoryText}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2d762f; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #2d762f; }
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
                <div class="value">${escapeHtml(name)}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${escapeHtml(email)}</div>
              </div>
              <div class="field">
                <div class="label">Teléfono:</div>
                <div class="value">${escapeHtml(phone)}</div>
              </div>
              <div class="field">
                <div class="label">Categoría:</div>
                <div class="value">${escapeHtml(categoryText)}</div>
              </div>
              <div class="field">
                <div class="label">Mensaje:</div>
                <div class="value">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
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
