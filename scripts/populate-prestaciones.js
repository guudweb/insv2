/**
 * Script para poblar el Content Type de Prestaciones en Strapi
 *
 * Uso:
 * 1. Asegúrate de que Strapi esté corriendo
 * 2. Configura STRAPI_URL y STRAPI_TOKEN si es necesario
 * 3. Ejecuta: node scripts/populate-prestaciones.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || ''; // Token de API si es necesario

const prestaciones = [
  {
    titulo: 'Prestaciones Médico-Farmacéuticas',
    slug: 'prestaciones-medico-farmaceuticas',
    descripcion: 'El régimen de Seguridad Social otorgará asistencia médico-farmacéutica en las contingencias de enfermedad, maternidad, accidente de trabajo o enfermedad profesional.',
    resumen: 'Asistencia médica y farmacéutica para asegurados',
    requisitos: 'Serán beneficiarios de la asistencia médico-farmacéutica:\n- Por enfermedad, el asegurado, su cónyuge e hijos, los inválidos con subsidio y los pensionistas\n- Por maternidad, la asegurada y cónyuge del asegurado\n- Por accidente de trabajo y enfermedad profesional, los asegurados',
    orden: 1,
    activo: true
  },
  {
    titulo: 'Subsidio de incapacidad temporal',
    slug: 'subsidio-de-incapacidad-temporal',
    descripcion: 'Subsidio otorgado durante el período de incapacidad temporal del trabajador.',
    resumen: 'Prestación económica durante incapacidad temporal',
    requisitos: null,
    orden: 2,
    activo: true
  },
  {
    titulo: 'Subsidio por maternidad',
    slug: 'subsidio-por-maternidad',
    descripcion: 'El derecho a las prestaciones familiares está sujeto a condiciones específicas de cotización y afiliación.',
    resumen: 'Prestación económica por maternidad',
    requisitos: null,
    orden: 3,
    activo: true
  },
  {
    titulo: 'Prestaciones por invalidez',
    slug: 'prestaciones-por-invalidez',
    descripcion: 'La prestación por invalidez se otorgará en los casos de incapacidad parcial o total para el trabajo.',
    resumen: 'Pensión por incapacidad laboral',
    requisitos: null,
    orden: 4,
    activo: true
  },
  {
    titulo: 'Pensión por vejez',
    slug: 'pension-por-vejez',
    descripcion: 'La pensión por vejez se otorga al asegurado que hubiere cumplido la edad de sesenta años, y tuviese acreditados al menos, ciento veinte meses de cotización, de los cuales, sesenta correspondan a los diez años inmediatamente anteriores.',
    resumen: 'Las pensiones de jubilación pueden pagarse a petición del trabajador',
    requisitos: 'Requisitos:\n- Copia del DIP del beneficiario\n- Copia del carnet de INSESO\n- Tres últimas nóminas\n- Cesantía laboral\n- Solicitud',
    orden: 5,
    activo: true
  },
  {
    titulo: 'Prestaciones por muerte y supervivencia',
    slug: 'prestaciones-por-muerte-y-supervivencia',
    descripcion: 'En caso de fallecimiento de un trabajador en activo o jubilado, las pensiones normales de jubilación se transforman en pensiones de reversión para los beneficiarios.',
    resumen: 'Pensión de reversión para beneficiarios',
    requisitos: null,
    orden: 6,
    activo: true
  },
  {
    titulo: 'Protección al empleo',
    slug: 'proteccion-al-empleo',
    descripcion: 'Medidas de protección y fomento del empleo para los trabajadores.',
    resumen: 'Protección y fomento del empleo',
    requisitos: null,
    orden: 7,
    activo: true
  },
  {
    titulo: 'Subsidios familiares',
    slug: 'subsidios-familiares',
    descripcion: 'Prestaciones económicas destinadas a ayudar a las familias con cargas familiares.',
    resumen: 'Ayudas económicas para familias',
    requisitos: null,
    orden: 8,
    activo: true
  },
  {
    titulo: 'Servicios sociales',
    slug: 'servicios-sociales',
    descripcion: 'Conjunto de servicios sociales prestados por el Instituto de Seguridad Social.',
    resumen: 'Servicios de asistencia social',
    requisitos: null,
    orden: 9,
    activo: true
  }
];

async function createPrestacion(data) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  try {
    const response = await fetch(`${STRAPI_URL}/api/prestaciones`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error ${response.status}: ${error}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

async function main() {
  console.log('🚀 Iniciando población de Prestaciones en Strapi...\n');
  console.log(`📍 URL de Strapi: ${STRAPI_URL}\n`);

  let success = 0;
  let errors = 0;

  for (const prestacion of prestaciones) {
    try {
      console.log(`⏳ Creando: ${prestacion.titulo}...`);
      await createPrestacion(prestacion);
      console.log(`✅ Creada exitosamente: ${prestacion.titulo}\n`);
      success++;
    } catch (error) {
      console.error(`❌ Error al crear ${prestacion.titulo}:`, error.message);
      console.error(`   Detalles: ${error}\n`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`📊 Resumen:`);
  console.log(`   ✅ Exitosas: ${success}`);
  console.log(`   ❌ Errores: ${errors}`);
  console.log(`   📝 Total: ${prestaciones.length}`);
  console.log('='.repeat(50));

  if (errors > 0) {
    console.log('\n⚠️  Hubo algunos errores. Verifica:');
    console.log('   1. Que Strapi esté corriendo');
    console.log('   2. Que el Content Type "prestacion" exista');
    console.log('   3. Que los permisos estén configurados correctamente');
    if (STRAPI_TOKEN) {
      console.log('   4. Que el token de API sea válido');
    }
  } else {
    console.log('\n🎉 ¡Todas las prestaciones fueron creadas exitosamente!');
  }
}

// Ejecutar el script
main().catch(error => {
  console.error('💥 Error fatal:', error);
  process.exit(1);
});
