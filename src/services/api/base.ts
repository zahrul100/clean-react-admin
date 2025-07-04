
import { ApiResponse } from './types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Base API service class with common functionality
export class BaseApiService {
  private static data: { [key: string]: any[] } = {};

  protected static getData(endpoint: string): any[] {
    return this.data[endpoint] || [];
  }

  protected static setData(endpoint: string, data: any[]): void {
    this.data[endpoint] = data;
  }

  static async getAll<T>(endpoint: string): Promise<ApiResponse<T[]>> {
    await delay(300);
    console.log(`API: Fetching all ${endpoint}`);
    
    const data = this.getData(endpoint);
    return {
      data: data as T[],
      success: true,
      message: `Successfully fetched ${endpoint}`
    };
  }

  static async getById<T>(endpoint: string, id: string): Promise<ApiResponse<T | null>> {
    await delay(200);
    console.log(`API: Fetching ${endpoint} with id ${id}`);
    
    const items = this.getData(endpoint);
    const item = items.find((item: any) => item.id === id);
    
    return {
      data: item as T || null,
      success: !!item,
      message: item ? `Successfully fetched ${endpoint}` : `${endpoint} not found`
    };
  }

  static async create<T extends { id?: string }>(endpoint: string, item: Omit<T, 'id'>): Promise<ApiResponse<T>> {
    await delay(400);
    console.log(`API: Creating ${endpoint}`, item);
    
    const newItem = {
      ...item,
      id: Date.now().toString()
    } as T;

    const currentData = this.getData(endpoint);
    this.setData(endpoint, [...currentData, newItem]);
    
    return {
      data: newItem,
      success: true,
      message: `Successfully created ${endpoint}`
    };
  }

  static async update<T extends { id: string }>(
    endpoint: string, 
    id: string, 
    updates: Partial<Omit<T, 'id'>>
  ): Promise<ApiResponse<T | null>> {
    await delay(350);
    console.log(`API: Updating ${endpoint} with id ${id}`, updates);
    
    const items = this.getData(endpoint);
    const itemIndex = items.findIndex((item: any) => item.id === id);
    
    if (itemIndex === -1) {
      return {
        data: null,
        success: false,
        message: `${endpoint} not found`
      };
    }
    
    const updatedItem = { ...items[itemIndex], ...updates };
    const updatedItems = [...items];
    updatedItems[itemIndex] = updatedItem;
    this.setData(endpoint, updatedItems);
    
    return {
      data: updatedItem as T,
      success: true,
      message: `Successfully updated ${endpoint}`
    };
  }

  static async delete(endpoint: string, id: string): Promise<ApiResponse<boolean>> {
    await delay(300);
    console.log(`API: Deleting ${endpoint} with id ${id}`);
    
    const items = this.getData(endpoint);
    const itemIndex = items.findIndex((item: any) => item.id === id);
    
    if (itemIndex === -1) {
      return {
        data: false,
        success: false,
        message: `${endpoint} not found`
      };
    }
    
    const updatedItems = items.filter((item: any) => item.id !== id);
    this.setData(endpoint, updatedItems);
    
    return {
      data: true,
      success: true,
      message: `Successfully deleted ${endpoint}`
    };
  }
}
