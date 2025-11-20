/**
 * Información de contacto centralizada
 * Edita este archivo para actualizar la información de contacto en todo el sitio
 */

export const contactInfo = {
  national: {
    name: 'Delegación Nacional',
    city: 'Malabo',
    address: 'Avda. de la Independencia, S/N',
    postalCode: '944',
    phone: '(+240) 333 092214',
    email: 'info@inseso.org',
    hours: 'Lunes - Viernes: 8:00 - 16:00'
  },
  regional: {
    name: 'Delegación Regional',
    city: 'Bata',
    address: 'Carretera del Aeropuerto',
    phone: '(+240) 333 082690',
    email: 'bata@inseso-ge.org',
    hours: 'Lunes - Viernes: 8:00 - 16:00'
  },
  social: {
    facebook: 'https://www.facebook.com/INSESO.GE',
    twitter: 'https://twitter.com/INSESO_GE',
    instagram: 'https://www.instagram.com/inseso_ge',
    linkedin: 'https://www.linkedin.com/company/inseso-ge'
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
  return `${info.address}, ${info.postalCode} ${info.city}`;
}
