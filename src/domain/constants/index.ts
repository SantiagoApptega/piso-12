import type { Event, Artist, TicketTier, CostumeCategory } from '../entities/index.js';

export const EVENT: Event = {
  name: 'Halloween en Pasto',
  presenter: 'Piso 12',
  coProducers: ['JFW', 'ARKHES', 'GEN'],
  date: '31 de Octubre — 9:00 PM COT',
  dateISO: '2026-10-31T21:00:00-05:00',
  venue: 'Centro de Eventos Andino',
  venueShort: 'C.E. Andino',
  venueAddress: 'Calle 11 # 38-91, frente a Unicentro, Pasto, Nariño',
  // TODO(user): reemplazar con el link real de venta de boletas cuando esté publicado.
  ticketUrl: 'https://www.mundoboletos.com/event/show/TODO-HALLOWEEN-PISO12-2026',
  contacts: ['305-206-5963', '317-686-7949'],
  ageRestriction: '18 Años +',
};

/** Línea de presentadores/co-productores del evento */
export const PRESENTED_BY_LINE = 'JFW, ARKHES, GEN y Piso 12 presentan';

// TODO(user): line-up de DJs placeholder — reemplazar por el line-up confirmado.
export const ARTISTS: Artist[] = [
  { name: 'DJ HEX', role: 'dj' },
  { name: 'DJ VOID', role: 'dj' },
  { name: 'DJ PHANTOM', role: 'dj' },
  { name: 'DJ NECRO', role: 'dj' },
];

export const TICKET_TIERS: TicketTier[] = [
  {
    name: 'ALMA EN PENA',
    zone: 'General',
    pricing: {
      launch: '$50.000+servicio',
      preventa: '$65.000+servicio',
      full: '$75.000+servicio',
    },
  },
  {
    name: 'PACTO CON EL DIABLO',
    zone: 'VIP — aforo limitado',
    pricing: {
      launch: '$70.000+servicio',
      preventa: '$85.000+servicio',
      full: '$95.000+servicio',
    },
  },
  {
    name: 'CASTILLO EMBRUJADO',
    zone: 'Palco 10 pax + botella',
    pricing: {
      launch: "$1'500.000+servicio",
      preventa: "$1'600.000+servicio",
      full: "$1'800.000+servicio",
    },
  },
];

export const COSTUME_CATEGORIES: CostumeCategory[] = [
  { title: 'Terror Clásico', description: 'Vampiros, momias, zombies y demás clásicos del horror.' },
  { title: 'Fantasía Oscura', description: 'Brujas, demonios y criaturas de otro mundo.' },
  { title: 'Pop & Cultura', description: 'Personajes de películas, series o videojuegos, a tu estilo.' },
  { title: 'Grupal / Dúo', description: 'Disfraces en pareja o grupo — el impacto se multiplica.' },
];

export const COSTUME_CONTEST_PRIZE =
  'El mejor disfraz de la noche se lleva un Palco Castillo Embrujado para 10 personas en el próximo evento Piso 12.';
