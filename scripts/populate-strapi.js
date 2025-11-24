#!/usr/bin/env node

/**
 * Script para popular Strapi con datos iniciales
 * Ejecutar con: node scripts/populate-strapi.js
 */

const STRAPI_URL = 'http://localhost:1337';

// Categorías de Noticias
const categoriasNoticias = [
  {
    nombre: 'Institucional',
    slug: 'institucional',
    descripcion: 'Noticias institucionales de INSESO',
    color: '#8c1b12',
    icono: 'fa-building',
    activo: true
  },
  {
    nombre: 'Eventos',
    slug: 'eventos',
    descripcion: 'Eventos y actividades de INSESO',
    color: '#1b5e8c',
    icono: 'fa-calendar',
    activo: true
  },
  {
    nombre: 'Prestaciones',
    slug: 'prestaciones',
    descripcion: 'Información sobre prestaciones sociales',
    color: '#2e8c1b',
    icono: 'fa-hand-holding-heart',
    activo: true
  },
  {
    nombre: 'Comunicados',
    slug: 'comunicados',
    descripcion: 'Comunicados oficiales',
    color: '#8c6d1b',
    icono: 'fa-bullhorn',
    activo: true
  },
  {
    nombre: 'Salud',
    slug: 'salud',
    descripcion: 'Noticias relacionadas con salud',
    color: '#8c1b6d',
    icono: 'fa-heartbeat',
    activo: true
  }
];

// Categorías de Formularios
const categoriasFormularios = [
  {
    titulo: 'Afiliación',
    descripcion: 'Formularios para afiliación y actualización de datos',
    icono: 'fas fa-user-plus',
    color: '#8c1b12',
    orden: 1,
    activa: true
  },
  {
    titulo: 'Prestaciones Sociales',
    descripcion: 'Solicitudes de prestaciones y pensiones',
    icono: 'fas fa-hands-helping',
    color: '#217346',
    orden: 2,
    activa: true
  },
  {
    titulo: 'Declaraciones y Contribuciones',
    descripcion: 'Declaraciones y pagos de cotizaciones',
    icono: 'fas fa-file-invoice-dollar',
    color: '#0066cc',
    orden: 3,
    activa: true
  },
  {
    titulo: 'Certificados y Constancias',
    descripcion: 'Solicitudes de certificados y constancias',
    icono: 'fas fa-certificate',
    color: '#d97706',
    orden: 4,
    activa: true
  },
  {
    titulo: 'Otros Trámites',
    descripcion: 'Formularios adicionales y servicios generales',
    icono: 'fas fa-folder-open',
    color: '#7c3aed',
    orden: 5,
    activa: true
  }
];

// Formularios por categoría
const formulariosPorCategoria = {
  'Afiliación': [
    {
      nombre: 'Solicitud de Afiliación - Trabajador',
      descripcion: 'Formulario para solicitar la afiliación de trabajadores al sistema de seguridad social',
      formato: 'PDF',
      tamano: '250 KB',
      orden: 1,
      activo: true,
      descargas: 0
    },
    {
      nombre: 'Solicitud de Afiliación - Empleador',
      descripcion: 'Formulario para registro de empleadores en el sistema INSESO',
      formato: 'PDF',
      tamano: '320 KB',
      orden: 2,
      activo: true,
      descargas: 0
    },
    {
      nombre: 'Actualización de Datos del Afiliado',
      descripcion: 'Actualice su información personal y de contacto',
      formato: 'PDF',
      tamano: '180 KB',
      orden: 3,
      activo: true,
      descargas: 0
    }
  ],
  'Prestaciones Sociales': [
    {
      nombre: 'Solicitud de Prestación por Enfermedad',
      descripcion: 'Solicite ayuda económica por enfermedad o incapacidad temporal',
      formato: 'PDF',
      tamano: '290 KB',
      orden: 1,
      activo: true,
      descargas: 0
    },
    {
      nombre: 'Solicitud de Prestación por Maternidad',
      descripcion: 'Formulario para solicitar prestación por maternidad',
      formato: 'PDF',
      tamano: '275 KB',
      orden: 2,
      activo: true,
      descargas: 0
    },
    {
      nombre: 'Solicitud de Pensión de Jubilación',
      descripcion: 'Inicie su trámite de pensión por jubilación',
      formato: 'PDF',
      tamano: '340 KB',
      orden: 3,
      activo: true,
      descargas: 0
    },
    {
      nombre: 'Solicitud de Pensión de Invalidez',
      descripcion: 'Solicite pensión por invalidez permanente',
      formato: 'PDF',
      tamano: '310 KB',
      orden: 4,
      activo: true,
      descargas: 0
    },
    {
      nombre: 'Solicitud de Pensión de Supervivencia',
      descripcion: 'Formulario para beneficiarios de pensión de supervivencia',
      formato: 'PDF',
      tamano: '295 KB',
      orden: 5,
      activo: true,
      descargas: 0
    }
  ],
  'Declaraciones y Contribuciones': [
    {
      nombre: 'Declaración Mensual de Cotizaciones',
      descripcion: 'Plantilla Excel para declaración mensual de cotizaciones',
      formato: 'Excel',
      tamano: '450 KB',
      orden: 1,
      activo: true,
      descargas: 0
    },
    {
      nombre: 'Solicitud de Fraccionamiento de Pago',
      descripcion: 'Solicite facilidades de pago para deudas pendientes',
      formato: 'PDF',
      tamano: '220 KB',
      orden: 2,
      activo: true,
      descargas: 0
    },
    {
      nombre: 'Declaración Rectificativa',
      descripcion: 'Corrija errores en declaraciones anteriores',
      formato: 'PDF',
      tamano: '200 KB',
      orden: 3,
      activo: true,
      descargas: 0
    }
  ],
  'Certificados y Constancias': [
    {
      nombre: 'Solicitud de Certificado de Afiliación',
      descripcion: 'Obtenga su certificado de afiliación vigente',
      formato: 'PDF',
      tamano: '150 KB',
      orden: 1,
      activo: true,
      descargas: 0
    },
    {
      nombre: 'Solicitud de Certificado de Vida Laboral',
      descripcion: 'Certificado con su historial de cotizaciones',
      formato: 'PDF',
      tamano: '170 KB',
      orden: 2,
      activo: true,
      descargas: 0
    },
    {
      nombre: 'Constancia de No Deuda',
      descripcion: 'Documento que certifica que no tiene deudas pendientes',
      formato: 'PDF',
      tamano: '160 KB',
      orden: 3,
      activo: true,
      descargas: 0
    }
  ],
  'Otros Trámites': [
    {
      nombre: 'Formulario de Reclamaciones',
      descripcion: 'Presente quejas o reclamaciones sobre servicios',
      formato: 'PDF',
      tamano: '190 KB',
      orden: 1,
      activo: true,
      descargas: 0
    },
    {
      nombre: 'Solicitud de Duplicado de Carnet',
      descripcion: 'Solicite un duplicado de su carnet de afiliado',
      formato: 'PDF',
      tamano: '140 KB',
      orden: 2,
      activo: true,
      descargas: 0
    },
    {
      nombre: 'Autorización de Representante',
      descripcion: 'Autorice a un tercero para realizar trámites en su nombre',
      formato: 'PDF',
      tamano: '130 KB',
      orden: 3,
      activo: true,
      descargas: 0
    }
  ]
};

// Función para hacer peticiones a Strapi
async function request(endpoint, data) {
  try {
    const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error ${response.status}: ${error}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error.message);
    throw error;
  }
}

// Función principal
async function populate() {
  console.log('🚀 Iniciando población de datos en Strapi...\n');

  try {
    // 1. Crear Categorías de Noticias
    console.log('📰 Creando categorías de noticias...');
    for (const categoria of categoriasNoticias) {
      try {
        await request('/categorias', categoria);
        console.log(`  ✅ Categoría creada: ${categoria.nombre}`);
      } catch (error) {
        console.log(`  ⚠️  Error al crear ${categoria.nombre}: ${error.message}`);
      }
    }
    console.log('');

    // 2. Crear Categorías de Formularios y guardar IDs
    console.log('📁 Creando categorías de formularios...');
    const categoriaIds = {};
    for (const categoria of categoriasFormularios) {
      try {
        const result = await request('/categorias-formularios', categoria);
        categoriaIds[categoria.titulo] = result.data.id;
        console.log(`  ✅ Categoría creada: ${categoria.titulo} (ID: ${result.data.id})`);
      } catch (error) {
        console.log(`  ⚠️  Error al crear ${categoria.titulo}: ${error.message}`);
      }
    }
    console.log('');

    // 3. Crear Formularios
    console.log('📄 Creando formularios...');
    for (const [categoriaTitulo, formularios] of Object.entries(formulariosPorCategoria)) {
      console.log(`\n  📂 Categoría: ${categoriaTitulo}`);
      const categoriaId = categoriaIds[categoriaTitulo];

      if (!categoriaId) {
        console.log(`  ⚠️  No se encontró ID para categoría ${categoriaTitulo}, saltando...`);
        continue;
      }

      for (const formulario of formularios) {
        try {
          const formularioData = {
            ...formulario,
            categoria_formulario: categoriaId
          };
          await request('/formularios', formularioData);
          console.log(`    ✅ ${formulario.codigo} - ${formulario.nombre}`);
        } catch (error) {
          console.log(`    ⚠️  Error: ${formulario.codigo} - ${error.message}`);
        }
      }
    }

    console.log('\n✨ ¡Población completada con éxito!\n');
    console.log('📋 Resumen:');
    console.log(`  • ${categoriasNoticias.length} categorías de noticias`);
    console.log(`  • ${categoriasFormularios.length} categorías de formularios`);
    console.log(`  • ${Object.values(formulariosPorCategoria).flat().length} formularios`);
    console.log('\n🌐 Verifica los datos en: http://localhost:1337/admin');

  } catch (error) {
    console.error('\n❌ Error fatal:', error);
    process.exit(1);
  }
}

// Ejecutar
populate();
