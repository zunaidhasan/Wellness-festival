export type PageId = 'home' | 'schedule' | 'tickets' | 'about' | 'faq-contact';

export interface Facilitator {
  id: string;
  name: string;
  role: string;
  tagline: string;
  discipline: 'Yoga' | 'Meditation' | 'Sound Healing' | 'Workshops' | 'Talks' | 'Movement';
  bio: string;
  sessions: string[];
}

export interface Session {
  id: string;
  day: 1 | 2 | 3;
  time: string;
  title: string;
  facilitator: string;
  category: 'Yoga' | 'Meditation' | 'Workshops' | 'Talks' | 'Movement';
  location: string;
  duration: string;
  capacity: string;
  level: string;
  description: string;
}

export interface TicketTier {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  isPopular?: boolean;
  description: string;
  features: string[];
  buttonText: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Pillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  yearsAttended: string;
}

export interface ExpectationCard {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
}
