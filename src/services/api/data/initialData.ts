
import {
  HeroBanner,
  AboutUs,
  CorporateEntity,
  Certification,
  ProductCategory,
  Product,
  Article,
  Career,
  Application,
  ContactInfo
} from '@/store/dataStore';

export const initialData = {
  heroBanners: [
    { id: '1', image: '/placeholder.svg', tagline: 'Innovation at its Best', title: 'Welcome to Our Platform' }
  ] as HeroBanner[],

  aboutUs: [
    { 
      id: '1', 
      background: '<p>We are a leading company in our industry...</p>',
      vision: '<p>To be the global leader in innovation...</p>',
      mission: '<p>Our mission is to deliver exceptional value...</p>'
    }
  ] as AboutUs[],

  corporateEntities: [
    { id: '1', name: 'Main Office', logo: '/placeholder.svg', description: 'Our headquarters', location: 'New York, NY', capacity: '500 employees' },
    { id: '2', name: 'Research Lab', logo: '/placeholder.svg', description: 'R&D facility', location: 'Silicon Valley, CA', capacity: '100 employees' }
  ] as CorporateEntity[],

  certifications: [
    { id: '1', title: 'ISO 9001', image: '/placeholder.svg' },
    { id: '2', title: 'ISO 14001', image: '/placeholder.svg' }
  ] as Certification[],

  productCategories: [
    { id: '1', name: 'Software', slug: 'software' },
    { id: '2', name: 'Hardware', slug: 'hardware' }
  ] as ProductCategory[],

  products: [
    { id: '1', name: 'Product A', categoryId: '1', image: '/placeholder.svg', pdfDatasheet: '/sample.pdf', description: 'High-quality software solution' },
    { id: '2', name: 'Product B', categoryId: '2', image: '/placeholder.svg', pdfDatasheet: '/sample2.pdf', description: 'Advanced hardware device' }
  ] as Product[],

  articles: [
    { 
      id: '1', 
      title: 'Latest Industry Trends', 
      category: 'Technology', 
      thumbnail: '/placeholder.svg', 
      content: '<p>This is the article content...</p>',
      publishStatus: 'published' as const,
      createdAt: '2024-01-15'
    }
  ] as Article[],

  careers: [
    { 
      id: '1', 
      jobTitle: 'Software Engineer', 
      location: 'Remote', 
      type: 'full-time' as const, 
      description: '<p>We are looking for a skilled software engineer...</p>',
      status: 'active' as const
    }
  ] as Career[],

  applications: [
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
  ] as Application[],

  contactInfo: [
    { id: '1', address: '123 Main St, New York, NY 10001', email: 'contact@company.com', phone: '+1 (555) 123-4567' }
  ] as ContactInfo[]
};
