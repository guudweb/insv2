import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Lista de páginas a migrar
const pagesToMigrate = [
	'afiliacionee_autonomo.html',
	'afiliacionee_empresas.html',
	'afiliacionee_trabajadores.html',
	'afiliación_fernanda.html',
	'condiciones_adhesion.html',
	'información_1.html',
	'información_2.html',
	'información_3.html',
	'Pensión_por_vejez.html',
	'Prestaciones_Médico_Farmacéuticas.html',
	'Prestaciones_por_invalidez.html',
	'Prestaciones_por_muerte_y_supervivencia.html',
	'Prestaciones_Sociales.html',
	'Protección_al_empleo.html',
	'Servicios_sociales.html',
	'solicitud_de_carne.html',
	'Subsidio_de_incapacidad_temporal.html',
	'Subsidio_por_maternidad.html',
	'Subsidios_familiares.html'
];

function extractContent(html) {
	// Extraer contenido entre </nav> y <footer>
	const navEnd = html.indexOf('</nav>');
	const footerStart = html.indexOf('<footer');

	if (navEnd === -1 || footerStart === -1) {
		console.error('No se pudo encontrar nav o footer');
		return null;
	}

	let content = html.substring(navEnd + 6, footerStart).trim();

	// Limpiar rutas de imágenes y links
	content = content.replace(/src="images\//g, 'src="/images/');
	content = content.replace(/href="inicio\.html"/g, 'href="/"');
	content = content.replace(/href="([^"]+)\.html"/g, 'href="/$1"');
	content = content.replace(/\.html"/g, '"');

	return content;
}

function getPageTitle(filename) {
	const titles = {
		'afiliacionee_autonomo': 'Afiliación - Autónomo',
		'afiliacionee_empresas': 'Afiliación - Empresas',
		'afiliacionee_trabajadores': 'Afiliación - Trabajadores',
		'afiliación_fernanda': 'Afiliación',
		'condiciones_adhesion': 'Condiciones de Adhesión',
		'información_1': 'Información',
		'información_2': 'Información',
		'información_3': 'Información',
		'Pensión_por_vejez': 'Pensión por Vejez',
		'Prestaciones_Médico_Farmacéuticas': 'Prestaciones Médico Farmacéuticas',
		'Prestaciones_por_invalidez': 'Prestaciones por Invalidez',
		'Prestaciones_por_muerte_y_supervivencia': 'Prestaciones por Muerte y Supervivencia',
		'Prestaciones_Sociales': 'Prestaciones Sociales',
		'Protección_al_empleo': 'Protección al Empleo',
		'Servicios_sociales': 'Servicios Sociales',
		'solicitud_de_carne': 'Solicitud de Carné',
		'Subsidio_de_incapacidad_temporal': 'Subsidio de Incapacidad Temporal',
		'Subsidio_por_maternidad': 'Subsidio por Maternidad',
		'Subsidios_familiares': 'Subsidios Familiares'
	};

	const name = filename.replace('.html', '');
	return titles[name] || name;
}

function hasOwlCarousel(content) {
	return content.includes('owl-carousel');
}

function createAstroPage(filename, content, title) {
	const hasCarousel = hasOwlCarousel(content);
	const urlPath = '/' + filename.replace('.html', '');

	let astroContent = `---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="INSESO - ${title}" currentPath="${urlPath}">
${content}
</BaseLayout>
`;

	if (hasCarousel) {
		astroContent += `
<script is:inline src="/js/owl.carousel.min.js"></script>
<script is:inline src="/js/owl.carousel_2.js"></script>
<script is:inline src="/js/script.js"></script>

<script is:inline>
	(function($) {
		$(document).ready(function() {
			if ($("#customers-slider").length) {
				$("#customers-slider").owlCarousel({
					items: 5,
					loop: true,
					margin: 15,
					nav: false,
					dots: false,
					autoplay: true,
					autoplayTimeout: 2500,
					responsive: {
						0: { items: 2 },
						650: { items: 2 },
						768: { items: 3 },
						1000: { items: 4 },
						1200: { items: 5 }
					}
				});
			}
		});
	})(window.jQuery);
</script>
`;
	}

	return astroContent;
}

// Proceso de migración
let successCount = 0;
let errorCount = 0;

for (const htmlFile of pagesToMigrate) {
	try {
		const htmlPath = path.join(__dirname, htmlFile);
		const astroFilename = htmlFile.replace('.html', '.astro');
		const astroPath = path.join(__dirname, 'src', 'pages', astroFilename);

		// Leer archivo HTML
		const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

		// Extraer contenido
		const content = extractContent(htmlContent);
		if (!content) {
			console.error(`❌ Error al procesar ${htmlFile}`);
			errorCount++;
			continue;
		}

		// Obtener título
		const title = getPageTitle(htmlFile);

		// Crear contenido Astro
		const astroContent = createAstroPage(htmlFile, content, title);

		// Escribir archivo Astro
		fs.writeFileSync(astroPath, astroContent, 'utf-8');

		console.log(`✅ Migrado: ${htmlFile} → ${astroFilename}`);
		successCount++;
	} catch (error) {
		console.error(`❌ Error al migrar ${htmlFile}:`, error.message);
		errorCount++;
	}
}

console.log(`\n✅ Migración completada: ${successCount} páginas exitosas, ${errorCount} errores`);
