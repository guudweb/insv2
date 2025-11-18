#!/usr/bin/env node

/**
 * Script para poblar datos de Fase 2 en Strapi
 * Migra el contenido hardcodeado de index.astro a Strapi
 *
 * Uso: node scripts/populate-fase2.mjs
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

// Función helper para hacer peticiones a Strapi
async function strapiRequest(endpoint, method = 'GET', data = null) {
	const options = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	if (STRAPI_API_TOKEN) {
		options.headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
	}

	if (data && (method === 'POST' || method === 'PUT')) {
		options.body = JSON.stringify({ data });
	}

	const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, options);

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Error ${response.status}: ${errorText}`);
	}

	return response.json();
}

// ==================== 1. CONFIGURACIÓN DE INICIO ====================

async function poblarConfiguracionInicio() {
	console.log('\n📝 Poblando ConfiguracionInicio...');

	const config = {
		tituloHero: 'JUNTOS EN CADA ETAPA DE TU VIDA',
		afiliacionTitulo: 'AFILIACION',
		afiliacionTexto: 'La función principal de la afiliación a la seguridad social es incorporar a una persona al sistema de seguridad social y, por lo tanto, garantizar su acceso a las prestaciones y servicios que este ofrece. La afiliación es obligatoria para las personas que realizan una actividad laboral que las incluye en el sistema.',
		afiliacionEnlace: '/condiciones_adhesion',
		sidebarCardTitulo: '¿QUIEN DEBE AFILIARSE A LA SEGURIDAD SOCIAL?',
		sidebarCardTexto: 'La persona que ejecuta una obra o presta servicios a otra en virtud de un contrato verbal o escrito, y que recibe un salario o remuneración a cambio.',
		videoUrl: '/video/Felicitacion del ILMO. Señor Delegado Nacional a Su Excelencia Obiang Nguema Mbasogo..mp4',
		videoFecha: 'MALABO, 26 DE JUNIO DE 2025 - 15.00 HORAS',
		videoTitulo: 'Felicitación del ILMO. Señor Delegado Nacional',
		videoDescripcion: `En nombre del personal y en el suyo propio, El ILMO. Señor Delegado Nacional del Instituto de Seguridad Social (INSESO), dirige unas palabras a S.E por motivo del aniversario de su natalicio.

Destacando que bajo su sabia dirección, nuestro país ha conocido avances notables en múltiples sectores, incluyendo la seguridad social, pilar fundamental del bienestar de nuestra población.

Desde el INSESO, reafirmamos el compromiso de seguir trabajando con lealtad, responsabilidad y dedicación, en línea con las directrices de Su Excelencia, para consolidar un sistema de protección social sólido, justo y accesible para todos los ciudadanos.`,
	};

	try {
		const result = await strapiRequest('configuracion-inicio', 'PUT', config);
		console.log('✅ ConfiguracionInicio creado/actualizado');
		return result;
	} catch (error) {
		console.error('❌ Error al crear ConfiguracionInicio:', error.message);
		console.log('⚠️  Asegúrate de que el Single Type "ConfiguracionInicio" existe en Strapi');
		console.log('⚠️  Nota: Las imágenes deben subirse manualmente desde el panel de Strapi');
		return null;
	}
}

// ==================== 2. NOTICIAS ====================

async function poblarNoticias() {
	console.log('\n📰 Poblando Noticias...');

	const noticias = [
		// Noticia Principal
		{
			titulo: 'Felicitación del ILMO. Señor Delegado Nacional a S.E Obiang Nguema Mbasogo',
			slug: 'felicitacion-delegado-nacional',
			resumen: 'En nombre del personal y en el suyo propio, El ILMO. Señor Delegado Nacional del Instituto de Seguridad Social (INSESO), dirige unas palabras a S.E por motivo del aniversario de su natalicio.',
			contenido: `En nombre del personal y en el suyo propio, El ILMO. Señor Delegado Nacional del Instituto de Seguridad Social (INSESO), dirige unas palabras a S.E por motivo del aniversario de su natalicio.

Destacando que bajo su sabia dirección, nuestro país ha conocido avances notables en múltiples sectores, incluyendo la seguridad social, pilar fundamental del bienestar de nuestra población.

Desde el INSESO, reafirmamos el compromiso de seguir trabajando con lealtad, responsabilidad y dedicación, en línea con las directrices de Su Excelencia, para consolidar un sistema de protección social sólido, justo y accesible para todos los ciudadanos.`,
			fechaPublicacion: '2025-06-26',
			video: '/video/Felicitacion del ILMO. Señor Delegado Nacional a Su Excelencia Obiang Nguema Mbasogo..mp4',
			tipoMedia: 'video',
			posicion: 'principal',
			orden: 1,
			activo: true,
		},

		// Noticias Laterales
		{
			titulo: 'INSESO apuesta por modernizar sus hospitales y la formación de los sanitarios en 2026',
			slug: 'inseso-modernizacion-hospitales-2026',
			resumen: 'El Instituto de Seguridad Social apuesta por la modernización de infraestructuras hospitalarias y la capacitación del personal sanitario.',
			contenido: 'El Instituto de Seguridad Social (INSESO) ha anunciado un ambicioso plan de modernización de sus infraestructuras hospitalarias y formación de personal sanitario para el año 2026.',
			fechaPublicacion: '2025-08-15',
			tipoMedia: 'imagen',
			posicion: 'lateral',
			orden: 1,
			activo: true,
		},
		{
			titulo: 'INSESO detecta más de 2.000 pensionistas irregulares y se ahorra casi 4.000 millones de FCFA',
			slug: 'inseso-pensionistas-irregulares',
			resumen: 'Una auditoría exhaustiva ha permitido detectar irregularidades en el sistema de pensiones, generando un ahorro significativo.',
			contenido: 'El Instituto de Seguridad Social (INSESO) ha detectado más de 2.000 pensionistas irregulares tras una exhaustiva auditoría del sistema, lo que ha supuesto un ahorro de casi 4.000 millones de FCFA.',
			fechaPublicacion: '2025-08-10',
			tipoMedia: 'imagen',
			posicion: 'lateral',
			orden: 2,
			activo: true,
		},

		// Noticias de Última Hora
		{
			titulo: 'Feliz día de Las Fuerzas Armadas de Guinea Ecuatorial.',
			slug: 'dia-fuerzas-armadas',
			resumen: 'El Instituto de Seguridad Social (INSESO) con su equipo médico conmemora y celebra con solidaridad, compromiso y servicio una fecha importante para nuestro país.',
			contenido: `El Instituto de Seguridad Social (INSESO) con su equipo médico conmemora y celebra con solidaridad, compromiso y servicio una fecha importante para nuestro país.

En esta jornada especial, el INSESO rinde homenaje a las Fuerzas Armadas de Guinea Ecuatorial, reconociendo su labor en la protección y defensa de nuestra nación.`,
			fechaPublicacion: '2025-08-03',
			tipoMedia: 'imagen',
			posicion: 'ultima-hora',
			orden: 1,
			activo: true,
		},
		{
			titulo: 'INSESO refuerza la respuesta humanitaria',
			slug: 'inseso-respuesta-humanitaria',
			resumen: 'En el día de ayer, el equipo del INSESO encabezada por el Delegado Nacional, Moisés Angüe, y su adjunto, donaron en nombre de la institución un lote de materiales.',
			contenido: `En el día de ayer, el equipo del INSESO encabezada por el Delegado Nacional, Moisés Angüe, y su adjunto, donaron en nombre de la institución un lote de materiales de primera necesidad a las comunidades afectadas.

Esta acción reafirma el compromiso social del INSESO con las poblaciones más vulnerables del país.`,
			fechaPublicacion: '2025-08-07',
			tipoMedia: 'imagen',
			posicion: 'ultima-hora',
			orden: 2,
			activo: true,
		},
		{
			titulo: 'Visita del primer ministro a la farmacia.',
			slug: 'visita-primer-ministro-farmacia',
			resumen: 'El Primer Ministro Manuel Osa Nsue, visitó en el día de ayer los almacenes del Policlínico Dr. Loeri Comba, con motivo de la recepción de los primeros 7 contenedores.',
			contenido: `El Primer Ministro Manuel Osa Nsue, visitó en el día de ayer los almacenes del Policlínico Dr. Loeri Comba, con motivo de la recepción de los primeros 7 contenedores de medicamentos y material sanitario.

Esta entrega forma parte del programa de modernización y mejora del sistema de salud del país, impulsado por el Gobierno en colaboración con el INSESO.`,
			fechaPublicacion: '2025-06-18',
			tipoMedia: 'imagen',
			posicion: 'ultima-hora',
			orden: 3,
			activo: true,
		},
	];

	let creadas = 0;
	let errores = 0;

	for (const noticia of noticias) {
		try {
			await strapiRequest('noticias', 'POST', noticia);
			console.log(`✅ Noticia creada: ${noticia.titulo}`);
			creadas++;
		} catch (error) {
			console.error(`❌ Error al crear noticia "${noticia.titulo}":`, error.message);
			errores++;
		}
	}

	console.log(`\n📊 Resumen Noticias: ${creadas} creadas, ${errores} errores`);
	console.log('⚠️  Nota: Las imágenes deben subirse manualmente desde el panel de Strapi:');
	console.log('   - /images/accueil/inseso_noti_01.jpg');
	console.log('   - /images/accueil/inseso_noti_02.jpg');
	console.log('   - /images/info/inseso_info_3_agos_25.jpg');
	console.log('   - /images/info/inseso_info_7_agos_25.jpg');
	console.log('   - /images/info/inseso_info_18_jun_25.jpg');
}

// ==================== 3. MARCAR PRESTACIONES COMO DESTACADAS ====================

async function marcarPrestacionesDestacadas() {
	console.log('\n⭐ Marcando prestaciones como destacadas...');

	const slugsDestacados = [
		'Subsidio_por_maternidad',
		'Prestaciones_por_invalidez',
		'Pensión_por_vejez',
		'Prestaciones_por_muerte_y_supervivencia',
	];

	try {
		// Obtener todas las prestaciones
		const response = await strapiRequest('prestaciones?pagination[pageSize]=100');
		const prestaciones = response.data;

		let marcadas = 0;

		for (const prestacion of prestaciones) {
			if (slugsDestacados.includes(prestacion.slug)) {
				try {
					await strapiRequest(`prestaciones/${prestacion.documentId}`, 'PUT', {
						destacado: true,
					});
					console.log(`✅ Prestación marcada como destacada: ${prestacion.titulo}`);
					marcadas++;
				} catch (error) {
					console.error(`❌ Error al actualizar prestación "${prestacion.titulo}":`, error.message);
				}
			}
		}

		console.log(`\n📊 Resumen: ${marcadas} prestaciones marcadas como destacadas`);
	} catch (error) {
		console.error('❌ Error al obtener prestaciones:', error.message);
	}
}

// ==================== EJECUCIÓN PRINCIPAL ====================

async function main() {
	console.log('🚀 Iniciando población de datos de Fase 2...');
	console.log(`📍 Strapi URL: ${STRAPI_URL}`);

	if (!STRAPI_API_TOKEN) {
		console.log('⚠️  STRAPI_API_TOKEN no configurado. Asegúrate de tener permisos públicos habilitados.');
	}

	try {
		// 1. Configuración de Inicio
		await poblarConfiguracionInicio();

		// 2. Noticias
		await poblarNoticias();

		// 3. Marcar prestaciones destacadas
		await marcarPrestacionesDestacadas();

		console.log('\n✅ ¡Población de datos completada!');
		console.log('\n📝 TAREAS PENDIENTES:');
		console.log('1. Subir las imágenes manualmente a Strapi:');
		console.log('   - ConfiguracionInicio: afiliacionImagen, sidebarImagenBanner');
		console.log('   - Noticias: imágenes correspondientes');
		console.log('2. Asignar las imágenes a cada entrada desde el panel de Strapi');
		console.log('3. Publicar todas las entradas si están en borrador');

	} catch (error) {
		console.error('\n❌ Error general:', error);
		process.exit(1);
	}
}

main();
