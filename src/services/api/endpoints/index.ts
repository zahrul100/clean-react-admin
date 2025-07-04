
import { BaseApiService } from '../base';
import { ApiServiceInterface } from '../types';
import { initialData } from '../data/initialData';
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

// Initialize data on first load
class ApiInitializer extends BaseApiService {
  static initialized = false;
  
  static init() {
    if (!this.initialized) {
      Object.entries(initialData).forEach(([key, value]) => {
        this.setData(key, value);
      });
      this.initialized = true;
    }
  }
}

// Initialize data
ApiInitializer.init();

// Create service factory
function createApiService<T>(endpoint: string): ApiServiceInterface<T> {
  return {
    getAll: () => BaseApiService.getAll<T>(endpoint),
    getById: (id: string) => BaseApiService.getById<T>(endpoint, id),
    create: (data: Omit<T, 'id'>) => BaseApiService.create<T>(endpoint, data),
    update: (id: string, data: Partial<Omit<T, 'id'>>) => BaseApiService.update<T>(endpoint, id, data),
    delete: (id: string) => BaseApiService.delete(endpoint, id)
  };
}

// Export all API services
export const heroBannersApi = createApiService<HeroBanner>('heroBanners');
export const aboutUsApi = createApiService<AboutUs>('aboutUs');
export const corporateEntitiesApi = createApiService<CorporateEntity>('corporateEntities');
export const certificationsApi = createApiService<Certification>('certifications');
export const productCategoriesApi = createApiService<ProductCategory>('productCategories');
export const productsApi = createApiService<Product>('products');
export const articlesApi = createApiService<Article>('articles');
export const careersApi = createApiService<Career>('careers');
export const applicationsApi = createApiService<Application>('applications');
export const contactInfoApi = createApiService<ContactInfo>('contactInfo');
