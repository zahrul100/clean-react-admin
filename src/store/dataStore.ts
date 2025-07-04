
import { create } from 'zustand';

export interface HeroBanner {
  id: string;
  image: string;
  tagline: string;
  title: string;
}

export interface AboutUs {
  id: string;
  background: string;
  vision: string;
  mission: string;
}

export interface CorporateEntity {
  id: string;
  name: string;
  logo: string;
  description: string;
  location: string;
  capacity: string;
}

export interface Certification {
  id: string;
  title: string;
  image: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  image: string;
  pdfDatasheet: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  content: string;
  publishStatus: 'draft' | 'published';
  createdAt: string;
}

export interface Career {
  id: string;
  jobTitle: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  description: string;
  status: 'active' | 'closed';
}

export interface Application {
  id: string;
  careerId: string;
  applicantName: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter: string;
  appliedAt: string;
}

export interface ContactInfo {
  id: string;
  address: string;
  email: string;
  phone: string;
}

interface DataState {
  heroBanners: HeroBanner[];
  aboutUs: AboutUs[];
  corporateEntities: CorporateEntity[];
  certifications: Certification[];
  productCategories: ProductCategory[];
  products: Product[];
  articles: Article[];
  careers: Career[];
  applications: Application[];
  contactInfo: ContactInfo[];

  // Generic CRUD operations
  addItem: <T extends { id: string }>(type: keyof DataState, item: T) => void;
  updateItem: <T extends { id: string }>(type: keyof DataState, id: string, item: T) => void;
  deleteItem: (type: keyof DataState, id: string) => void;
  getItems: <T>(type: keyof DataState) => T[];
  getItem: <T extends { id: string }>(type: keyof DataState, id: string) => T | undefined;
}

// Dummy data
const initialHeroBanners: HeroBanner[] = [
  { id: '1', image: '/placeholder.svg', tagline: 'Innovation at its Best', title: 'Welcome to Our Platform' }
];

const initialAboutUs: AboutUs[] = [
  { 
    id: '1', 
    background: '<p>We are a leading company in our industry...</p>',
    vision: '<p>To be the global leader in innovation...</p>',
    mission: '<p>Our mission is to deliver exceptional value...</p>'
  }
];

const initialCorporateEntities: CorporateEntity[] = [
  { id: '1', name: 'Main Office', logo: '/placeholder.svg', description: 'Our headquarters', location: 'New York, NY', capacity: '500 employees' },
  { id: '2', name: 'Research Lab', logo: '/placeholder.svg', description: 'R&D facility', location: 'Silicon Valley, CA', capacity: '100 employees' }
];

const initialCertifications: Certification[] = [
  { id: '1', title: 'ISO 9001', image: '/placeholder.svg' },
  { id: '2', title: 'ISO 14001', image: '/placeholder.svg' }
];

const initialProductCategories: ProductCategory[] = [
  { id: '1', name: 'Software', slug: 'software' },
  { id: '2', name: 'Hardware', slug: 'hardware' }
];

const initialProducts: Product[] = [
  { id: '1', name: 'Product A', categoryId: '1', image: '/placeholder.svg', pdfDatasheet: '/sample.pdf', description: 'High-quality software solution' },
  { id: '2', name: 'Product B', categoryId: '2', image: '/placeholder.svg', pdfDatasheet: '/sample2.pdf', description: 'Advanced hardware device' }
];

const initialArticles: Article[] = [
  { 
    id: '1', 
    title: 'Latest Industry Trends', 
    category: 'Technology', 
    thumbnail: '/placeholder.svg', 
    content: '<p>This is the article content...</p>',
    publishStatus: 'published',
    createdAt: '2024-01-15'
  }
];

const initialCareers: Career[] = [
  { 
    id: '1', 
    jobTitle: 'Software Engineer', 
    location: 'Remote', 
    type: 'full-time', 
    description: '<p>We are looking for a skilled software engineer...</p>',
    status: 'active'
  }
];

const initialApplications: Application[] = [
  {
    id: '1',
    careerId: '1',
    applicantName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    resume: '/resume.pdf',
    coverLetter: 'I am very interested in this position...',
    appliedAt: '2024-01-20'
  }
];

const initialContactInfo: ContactInfo[] = [
  { id: '1', address: '123 Main St, New York, NY 10001', email: 'contact@company.com', phone: '+1 (555) 123-4567' }
];

export const useDataStore = create<DataState>((set, get) => ({
  heroBanners: initialHeroBanners,
  aboutUs: initialAboutUs,
  corporateEntities: initialCorporateEntities,
  certifications: initialCertifications,
  productCategories: initialProductCategories,
  products: initialProducts,
  articles: initialArticles,
  careers: initialCareers,
  applications: initialApplications,
  contactInfo: initialContactInfo,

  addItem: (type, item) => {
    set((state) => ({
      [type]: [...(state[type] as any[]), { ...item, id: Date.now().toString() }]
    }));
  },

  updateItem: (type, id, item) => {
    set((state) => ({
      [type]: (state[type] as any[]).map((existing) => 
        existing.id === id ? { ...existing, ...item } : existing
      )
    }));
  },

  deleteItem: (type, id) => {
    set((state) => ({
      [type]: (state[type] as any[]).filter((item) => item.id !== id)
    }));
  },

  getItems: (type) => {
    return get()[type] as any[];
  },

  getItem: (type, id) => {
    return (get()[type] as any[]).find((item) => item.id === id);
  }
}));
