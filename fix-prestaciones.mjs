import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Páginas de prestaciones a corregir
const prestacionesPages = [
	'Subsidio_por_maternidad.html',
	'Prestaciones_por_invalidez.html',
	'Pensión_por_vejez.html',
	'Prestaciones_por_muerte_y_supervivencia.html',
	'Subsidio_de_incapacidad_temporal.html',
	'Subsidios_familiares.html',
	'Protección_al_empleo.html',
	'Servicios_sociales.html',
	'Prestaciones_Médico_Farmacéuticas.html'
];

function extractFullContent(html) {
	// Buscar desde después del </nav> hasta antes del <footer class="footer">
	const navEndIndex = html.lastIndexOf('</nav>');
	const footerStartIndex = html.indexOf('<footer class="footer">');

	if (navEndIndex === -1 || footerStartIndex === -1) {
		return null;
	}

	let content = html.substring(navEndIndex + 6, footerStartIndex).trim();

	// Limpiar rutas
	content = content.replace(/src="images\//g, 'src="/images/');
	content = content.replace(/href="inicio\.html"/g, 'href="/"');
	content = content.replace(/href="([^"#]+)\.html"/g, (match, p1) => {
		return `href="/${p1}"`;
	});

	return content;
}

function getTitle(filename) {
	const titles = {
		'Subsidio_por_maternidad': 'Subsidio por Maternidad',
		'Prestaciones_por_invalidez': 'Prestaciones por Invalidez',
		'Pensión_por_vejez': 'Pensión por Vejez',
		'Prestaciones_por_muerte_y_supervivencia': 'Prestaciones por Muerte y Supervivencia',
		'Subsidio_de_incapacidad_temporal': 'Subsidio de Incapacidad Temporal',
		'Subsidios_familiares': 'Subsidios Familiares',
		'Protección_al_empleo': 'Protección al Empleo',
		'Servicios_sociales': 'Servicios Sociales',
		'Prestaciones_Médico_Farmacéuticas': 'Prestaciones Médico Farmacéuticas'
	};

	const name = filename.replace('.html', '');
	return titles[name] || name;
}

// Corregir páginas
let fixed = 0;

for (const htmlFile of prestacionesPages) {
	try {
		const htmlPath = path.join(__dirname, htmlFile);
		const astroFilename = htmlFile.replace('.html', '.astro');
		const astroPath = path.join(__dirname, 'src', 'pages', astroFilename);

		// Leer HTML original
		const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
		const content = extractFullContent(htmlContent);

		if (!content) {
			console.error(`❌ No se pudo extraer contenido de ${htmlFile}`);
			continue;
		}

		const title = getTitle(htmlFile);
		const urlPath = '/' + htmlFile.replace('.html', '');

		// Crear archivo Astro completo
		const astroContent = `---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="INSESO - ${title}" currentPath="${urlPath}">
${content}
</BaseLayout>

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

		// Guardar archivo corregido
		fs.writeFileSync(astroPath, astroContent, 'utf-8');
		console.log(`✅ Corregido: ${htmlFile} → ${astroFilename}`);
		fixed++;

	} catch (error) {
		console.error(`❌ Error al corregir ${htmlFile}:`, error.message);
	}
}

console.log(`\n✅ ${fixed} páginas de prestaciones corregidas`);
