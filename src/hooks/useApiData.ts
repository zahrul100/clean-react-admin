
import { useState, useEffect } from 'react';
import { useDataStore } from '@/store/dataStore';
import { ApiResponse, ApiServiceInterface } from '@/services/api/types';

export function useApiData<T extends { id: string }>(
  endpoint: string,
  apiService: ApiServiceInterface<T>
) {
  const { getItems, addItem, updateItem, deleteItem } = useDataStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const data = getItems<T>(endpoint as any);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getAll();
      if (response.success) {
        console.log(`Loaded ${response.data.length} items from API for ${endpoint}`);
      } else {
        setError(response.message || 'Failed to load data');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error(`Error loading ${endpoint}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData: Omit<T, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.create(itemData);
      if (response.success) {
        addItem(endpoint as any, response.data);
        return response.data;
      } else {
        setError(response.message || 'Failed to create item');
        return null;
      }
    } catch (err) {
      setError('Network error occurred');
      console.error(`Error creating ${endpoint}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateItemData = async (id: string, updates: Partial<Omit<T, 'id'>>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.update(id, updates);
      if (response.success && response.data) {
        updateItem(endpoint as any, id, updates);
        return response.data;
      } else {
        setError(response.message || 'Failed to update item');
        return null;
      }
    } catch (err) {
      setError('Network error occurred');
      console.error(`Error updating ${endpoint}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteItemData = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.delete(id);
      if (response.success) {
        deleteItem(endpoint as any, id);
        return true;
      } else {
        setError(response.message || 'Failed to delete item');
        return false;
      }
    } catch (err) {
      setError('Network error occurred');
      console.error(`Error deleting ${endpoint}:`, err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: loadData,
    createItem,
    updateItem: updateItemData,
    deleteItem: deleteItemData
  };
}
