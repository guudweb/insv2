// CAMBIO WEB_INSESO: campos transcritos de las fichas institucionales facilitadas.
const field=(labels)=>labels.map(label=>({label}));
const choice=(label, options)=>({label,type:'choice',options});
const date=(label)=>({label,type:'date'});
export const webForms={
 empresa:{title:'Ficha de registro de empresas',source:'/formularios-referencia/registro-empresas.docx',sourceLabel:'Descargar ficha original de empresas',sections:[
 {title:'Datos generales',fields:[...field(['Nombre de la empresa']),choice('Tipo de solicitud',['Alta inicial','Modificación de nombre']),choice('Tipo de empresa',['Administración pública','Ente del Estado','Privada','Organismo internacional','Autónomo'])]},
 {title:'Datos de identificación',fields:[choice('Sector',['Primario','Secundario','Terciario']),...field(['Número de empleados','N.º de Registro de Comercio','N.º de Identificación Fiscal','Actividad principal']),choice('Forma jurídica',['S.A.','S.L.','ONG','Gobierno','Representación diplomática','Autónomo']),...field(['Capital social'])]},
 {title:'Dirección',fields:[...field(['Ubicación','Ciudad','Provincia']),choice('Delegación del INSESO',['Delegación Nacional','Delegación Regional','Delegación Provincial']),...field(['Delegación provincial, si corresponde'])]},
 {title:'Datos bancarios',fields:field(['Entidad bancaria','Agencia','Cuenta'])},
 {title:'Responsable',fields:[...field(['Nombre','Apellidos']),date('Fecha de nacimiento'),...field(['Lugar de nacimiento','País de nacimiento','Nacionalidad']),choice('Tipo de documento de identificación',['DIP','Pasaporte','Tarjeta de residencia']),...field(['N.º de documento de identificación','Dirección en Guinea Ecuatorial','Ciudad en Guinea Ecuatorial','Teléfono / correo electrónico'])]}]},
 trabajador:{title:'Ficha de afiliación',source:'/formularios-referencia/afiliacion.docx',sourceLabel:'Descargar ficha original de afiliación',note:'Rellene la ficha con letras mayúsculas. Los campos reservados para INSESO deben completarse en la oficina.',sections:[
 {title:'Datos personales',fields:[...field(['Nombre','Apellidos']),date('Fecha de nacimiento'),...field(['Lugar de nacimiento']),choice('Tipo de documento',['DIP','Pasaporte','Residencia']),...field(['N.º de documento personal','Estado civil','País','Teléfono','Nombre del padre','Nombre de la madre'])]},
 {title:'Datos bancarios',fields:field(['Nombre del banco','Agencia','N.º de cuenta corriente'])},
 {title:'Dirección personal',fields:field(['Barrio / calle','Comunidad / pueblo','Ciudad'])},
 {title:'Relación con INSESO y empleo actual',fields:[choice('Relación con INSESO',['Trabajador/a','Pensionista','Discapacitado/a']),...field(['Nombre de empresa actual','Puesto actual','Salario actual']),date('Fecha de contratación')]},
 {title:'Identificación de la actividad de la empresa',fields:field(['Nombre de actividad','Tipo de actividad','Sector de actividad','Barrio / calle','Comunidad / pueblo','Ciudad'])},
 {title:'Historial laboral',fields:[...Array.from({length:5},(_,i)=>[{label:'Nombre de la empresa trabajada',historyRow:i+1},{label:'Año y fecha de alta',type:'date',historyRow:i+1},{label:'Año y fecha de baja',type:'date',historyRow:i+1}]).flat(),...field(['Lugar']),date('Fecha')]},
 {title:'Columna reservada para INSESO',fields:[...field(['N.º de afiliación (reservado a INSESO)','Fecha de recepción (reservado a INSESO)','Fecha de registro (reservado a INSESO)','Funcionario/a responsable (reservado a INSESO)']),{label:'Foto',type:'photo'}]}]},
 prestacion:{title:'Ficha de solicitud de prestaciones sociales',source:'/formularios-referencia/prestaciones.pdf',sourceLabel:'Descargar documento original de prestaciones y reembolso',sections:[
 {title:'Datos del solicitante de la prestación',fields:field(['Nombre y apellidos','Dirección','Teléfono'])},
 {title:'Prestación solicitada',fields:[choice('Seleccione la prestación solicitada',['Vejez','Maternidad','Incapacidad temporal','Orfandad','Invalidez','Gasto de sepelio','Subsidio familiar','Viudedad','Reversión','A parientes','Asistencia sanitaria','Certificado de cotizaciones','Certificado irrevocable de pensión','Otros']),...field(['Otra prestación o solicitud'])]},
 {title:'Datos del causante de la prestación',fields:field(['Nombre y apellidos del causante','Dirección del causante','Teléfono del causante'])},
 {title:'Empresas trabajadas y períodos · obligatorio para vejez',fields:Array.from({length:6},(_,i)=>[{label:`Empresa ${i+1}`},{label:`Desde · empresa ${i+1}`,type:'date'},{label:`Hasta · empresa ${i+1}`,type:'date'}]).flat()},
 {title:'Lugar y fecha',fields:[...field(['Lugar']),date('Fecha de solicitud')]}]},
 reembolso:{title:'Reclamación de reembolso de gastos de asistencia médico-farmacéutica',source:'/formularios-referencia/reembolso.pdf',sourceLabel:'Descargar documento original de prestaciones y reembolso',note:'No adjunte informes médicos en esta página.',sections:[
 {title:'Datos de afiliación',fields:[...field(['Nombre y apellidos']),date('Fecha de nacimiento'),...field(['N.º de seguridad social','Patrono','Residencia','Teléfono'])]},
 {title:'Requerimiento de asistencia médica',fields:[choice('Asistencia recibida',['Consulta especializada','Laboratorio','Diagnóstico por imagen','Medicación','Cirugía urgente','Hospitalización urgente','Politraumatismo','Otras']),...field(['Otras asistencias','Importe total de las facturas presentadas (FCFA)'])]},
 {title:'Documentación requerida / presentada',fields:[choice('Marque la documentación presentada',['Informe médico de consulta o egreso de hospitalización, firmado y sellado y validado por la dirección','Hoja de remisión de los centros sanitarios del INSESO, firmada y validada por la dirección médica','Copia del DIP y del carné de seguro social en vigor o comprobante de renovación','Receta prescrita por un médico de los centros sanitarios del INSESO, con autorización de compra de productos faltantes','Orden médica para exámenes paraclínicos','Certificado de no disponibilidad de la asistencia médica en centros del INSESO','Facturas originales de los servicios o medicamentos, firmadas y selladas'])]},
 {title:'Datos de la asistencia',fields:[...field(['Centro sanitario donde fue asistido, excepto recetas']),date('Fecha de asistencia'),...field(['Hora de asistencia','Lugar']),date('Fecha de solicitud')]}]}
};

// Patrones compartidos por el navegador y el servidor; no presuponen un formato nacional de DIP/NIF.
export const FORM_PATTERNS={
 name:"[\\p{L}\\p{M}][\\p{L}\\p{M} .’'\\-]{1,119}",
 phone:'\\+?[0-9][0-9\\s\\(\\)\\.\\-]{5,24}',
 document:'[\\p{L}\\p{N}][\\p{L}\\p{N} \\.\\/\\-]{2,59}',
 amount:'[0-9]{1,15}(?:[.,][0-9]{1,2})?',
 integer:'[0-9]{1,6}',
 account:'[A-Za-z0-9][A-Za-z0-9 \\-]{5,39}',
 general:'[^<>\\u0000-\\u001f]{1,180}',
 email:'[^\\s@<>]+@[^\\s@<>]+\\.[^\\s@<>]+'
};
const required={empresa:['s0f0','s0f1','s0f2','s1f0','s1f3','s4f0','s4f1'],trabajador:['s0f0','s0f1','s0f2','s0f4','s0f5'],prestacion:['s0f0','s0f1','s0f2','s1f0'],reembolso:['s0f0','s0f2','s1f0','s1f2']};
for(const [formId,form] of Object.entries(webForms))for(const [si,section] of form.sections.entries())for(const [fi,f] of section.fields.entries()){
 f.id=`s${si}f${fi}`;f.readOnly=section.title==='Columna reservada para INSESO';f.required=required[formId].includes(f.id);f.maxLength=f.type==='textarea'?1200:180;
 if(f.type==='choice'){f.multiple=formId==='reembolso'||(formId==='trabajador'&&si===3&&fi===0);continue;}
 if(f.type==='date'){f.inputType='date';continue;}
 const label=f.label.toLowerCase();f.inputType=f.type==='textarea'?'textarea':'text';f.pattern=FORM_PATTERNS.general;f.hint='Máximo 180 caracteres; no utilice los signos < ni >.';
 if(['nombre','apellidos','nombre y apellidos','nombre y apellidos del causante','nombre del padre','nombre de la madre'].includes(label)){f.pattern=FORM_PATTERNS.name;f.maxLength=120;f.hint='Utilice letras, espacios, guiones o apóstrofos (2–120 caracteres).';}
 if(label==='teléfono / correo electrónico'){f.pattern=`(?:${FORM_PATTERNS.phone}|${FORM_PATTERNS.email})`;f.maxLength=254;f.hint='Escriba un teléfono o una dirección de correo válida.';}
 else if(label.includes('teléfono')){f.pattern=FORM_PATTERNS.phone;f.maxLength=26;f.inputType='tel';f.hint='Entre 6 y 26 caracteres: números, prefijo +, espacios, guiones o paréntesis.';}
 else if(/n.º.*(documento|registro|identificación|seguridad)/i.test(f.label)){f.pattern=FORM_PATTERNS.document;f.maxLength=60;f.hint='Entre 3 y 60 caracteres: letras, números, espacios, puntos, barras o guiones.';}
 if(label==='hora de asistencia'){f.inputType='time';f.pattern='(?:[01][0-9]|2[0-3]):[0-5][0-9]';f.maxLength=5;f.hint='Indique la hora en formato de 24 horas.';}
 if(label==='número de empleados'){f.pattern=FORM_PATTERNS.integer;f.inputMode='numeric';f.maxLength=6;f.hint='Introduzca un número entero de hasta 6 cifras.';}
 if(/capital social|salario actual|importe total/i.test(f.label)){f.pattern=FORM_PATTERNS.amount;f.inputMode='decimal';f.maxLength=18;f.hint='Importe no negativo, sin separadores de miles; hasta dos decimales.';}
 if(label==='cuenta'||label==='n.º de cuenta corriente'){f.pattern=FORM_PATTERNS.account;f.maxLength=40;f.hint='Entre 6 y 40 caracteres: letras, números, espacios o guiones.';}
 if(f.type==='textarea'){f.pattern='[^<>\\u0000-\\u0008\\u000b\\u000c\\u000e-\\u001f]{1,1200}';f.hint='Máximo 1.200 caracteres.';}
}
