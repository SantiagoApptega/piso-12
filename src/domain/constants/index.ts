import type { Event, Artist, TicketTier } from '../entities/index.js';

export const EVENT: Event = {
  name: 'Ñejo El Broko en Pasto',
  artist: 'Ñejo El Broko',
  presenter: 'Piso 12',
  date: '25 de Abril — 9:00 PM COT',
  dateISO: '2026-04-25T21:00:00-05:00',
  venue: 'Centro de Eventos Andino',
  venueShort: 'C.E. Andino',
  venueAddress: 'Calle 11 # 38-91, frente a Unicentro, Pasto, Nariño',
  ticketUrl: 'https://www.mundoboletos.com/event/show/%C3%91EJOELBROKOANDINO2504',
  contacts: ['305-206-5963', '317-686-7949'],
  ageRestriction: '18 Años +',
};

export const ARTISTS: Artist[] = [
  {
    name: 'Ñejo El Broko',
    role: 'headliner',
    imageUrl: '/assets/artist/nejo.jpg',
  },
  {
    name: 'RESET',
    role: 'guest',
    imageUrl: undefined,
  },
  {
    name: 'EWOOD',
    role: 'dj',
    imageUrl: undefined,
  },
  {
    name: 'ORDD',
    role: 'dj',
    imageUrl: undefined,
  },
  {
    name: 'DJ SPECIAL',
    role: 'dj',
    imageUrl: undefined,
  },
];

export const TICKET_TIERS: TicketTier[] = [
  {
    name: 'MAMISONGA',
    zone: 'General',
    pricing: {
      launch: '$50.000+servicio',
      preventa: '$65.000+servicio',
      full: '$75.000+servicio',
    },
  },
  {
    name: 'UN CALL',
    zone: 'VIP — aforo limitado',
    pricing: {
      launch: '$70.000+servicio',
      preventa: '$85.000+servicio',
      full: '$95.000+servicio',
    },
  },
  {
    name: 'MI ESTILO DE VIDA',
    zone: 'Palco 10 pax + botella',
    pricing: {
      launch: "$1'500.000+servicio",
      preventa: "$1'600.000+servicio",
      full: "$1'800.000+servicio",
    },
  },
];
