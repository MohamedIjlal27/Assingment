import axios from 'axios';
import { MenuItem } from '@/lib/store/menuSlice';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CreateMenuDTO {
  name: string;
}

export interface UpdateMenuDTO {
  name: string;
}

export const menuApi = {
  // Fetch all menus
  getAllMenus: async (): Promise<MenuItem[]> => {
    const response = await api.get('/menus');
    return response.data;
  },

  // Create a root menu
  createMenu: async (data: CreateMenuDTO): Promise<MenuItem> => {
    const response = await api.post('/menus', data);
    return response.data;
  },

  // Add a submenu item
  addMenuItem: async (parentId: string, data: CreateMenuDTO): Promise<MenuItem> => {
    const response = await api.post(`/menus/${parentId}/items`, data);
    return response.data;
  },

  // Update a menu item
  updateMenuItem: async (id: string, data: UpdateMenuDTO): Promise<MenuItem> => {
    const response = await api.put(`/menus/items/${id}`, data);
    return response.data;
  },

  // Delete a menu item
  deleteMenuItem: async (id: string): Promise<void> => {
    await api.delete(`/menus/items/${id}`);
  },
}; 