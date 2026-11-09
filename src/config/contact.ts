// CAMBIO INSESO R4: contacto según documento de 15/10/2026.
// CAMBIO INSESO 2026-10-13: identidad verde y correcciones previas; detalles en docs/CAMBIOS_REVISION_2.md.
/**
 * Información de contacto centralizada
 * Edita este archivo para actualizar la información de contacto en todo el sitio
 */

export const contactInfo = {
  national: {
    name: 'Delegación Nacional',
    city: 'Malabo',
    address: 'Avda. de la Independencia, S/N',
    postalCode: '',
    phone: '1066',
    email: 'info@inseso.org',
    hours: 'Lunes - Viernes: 8:00 - 16:00'
  },
  regional: {
    name: 'Delegación Regional',
    city: 'Bata',
    address: 'Unidad Africana',
    phone: '1066',
    email: 'info@inseso.org',
    hours: 'Lunes - Viernes: 8:00 - 16:00'
  },
  social: {
    facebook: 'https://www.facebook.com/share/19mnxTyaUk/',
    twitter: 'https://x.com/inseso_ge',
    instagram: 'https://www.instagram.com/inseso_ge',
    tiktok: 'https://www.tiktok.com/@inseso_ge?_r=1&_t=ZS-9AXhGFjd7yv'
  }
};

/**
 * Helper para formatear teléfono con icono
 */
export function formatPhone(phone: string): string {
  return phone;
}

/**
 * Helper para formatear dirección completa
 */
export function getFullAddress(location: 'national' | 'regional'): string {
  const info = contactInfo[location];
  return `${info.address}, ${'postalCode' in info ? info.postalCode + ' ' : ''}${info.city}`;
}
