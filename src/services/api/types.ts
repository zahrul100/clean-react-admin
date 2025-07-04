
// API response and service types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiServiceInterface<T> {
  getAll: () => Promise<ApiResponse<T[]>>;
  getById: (id: string) => Promise<ApiResponse<T | null>>;
  create: (data: Omit<T, 'id'>) => Promise<ApiResponse<T>>;
  update: (id: string, data: Partial<Omit<T, 'id'>>) => Promise<ApiResponse<T | null>>;
  delete: (id: string) => Promise<ApiResponse<boolean>>;
}
