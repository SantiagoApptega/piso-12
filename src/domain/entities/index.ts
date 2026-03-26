export interface Event {
  name: string;
  artist: string;
  presenter: string;
  date: string;
  dateISO: string;
  venue: string;
  /** Compact label for cards / hero (full name stays in `venue`) */
  venueShort: string;
  venueAddress: string;
  ticketUrl: string;
  contacts: string[];
  /** e.g. "Mayores de 18 años" */
  ageRestriction: string;
}

export interface Artist {
  name: string;
  role: 'headliner' | 'guest' | 'dj';
  imageUrl?: string;
}

export interface TicketPricing {
  launch: string;
  preventa: string;
  full: string;
}

export interface TicketTier {
  name: string;
  zone: string;
  pricing: TicketPricing;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
