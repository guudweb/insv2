import {createFormsHandler} from '../../../server/forms.mjs';
import {generateFormPdf} from '../../../server/pdf/form-pdf.mjs';
import empresa from '../../../server/pdf/templates/empresa.pdf?url&inline';
import trabajador from '../../../server/pdf/templates/trabajador.pdf?url&inline';
import prestacion from '../../../server/pdf/templates/prestacion.pdf?url&inline';
import reembolso from '../../../server/pdf/templates/reembolso.pdf?url&inline';
const templates={empresa,trabajador,prestacion,reembolso};
export const prerender=false;
export const POST=createFormsHandler({pdf:(data,opts)=>generateFormPdf(data,{...opts,templateBytes:Buffer.from(templates[data.formType].split(',')[1],'base64')})});
