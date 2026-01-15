import { NavLink, Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'Aura Collective',
    category: 'Brand Identity',
    year: '2024',
    image: 'https://picsum.photos/seed/aura/1200/800',
    description: 'A deep dive into minimalist aesthetics for a sustainable fashion brand.',
  },
  {
    id: '02',
    title: 'Neon Echo',
    category: 'Digital Experience',
    year: '2023',
    image: 'https://picsum.photos/seed/neon/1200/800',
    description: 'Immersive soundscapes met visual feedback in this experimental web app.',
  },
  {
    id: '03',
    title: 'Vertex Studio',
    category: 'Architectural Visualization',
    year: '2024',
    image: 'https://picsum.photos/seed/vertex/1200/800',
    description: 'Pushing the boundaries of light and shadow in 3D environments.',
  },
  {
    id: '04',
    title: 'Monolith',
    category: 'Product Design',
    year: '2022',
    image: 'https://picsum.photos/seed/monolith/1200/800',
    description: 'Redefining the physical interface between humans and tech hardware.',
  },
  {
    id: '05',
    title: 'Lunar Phase',
    category: 'Editorial Design',
    year: '2023',
    image: 'https://picsum.photos/seed/lunar/1200/800',
    description: 'A print publication focused on the intersection of art and science.',
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: 'Work', href: '#works' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Insights', href: '#insights' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
];
