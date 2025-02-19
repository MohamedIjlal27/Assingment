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
  parentId?: string;
  depth: number;
}

export interface UpdateMenuDTO {
  name?: string;
  parentId?: string;
  depth?: number;
}

export const menuApi = {
  // Fetch all menus
  getAllMenus: async (): Promise<MenuItem[]> => {
    const response = await api.get('/menus');
    return response.data;
  },

  // Create a menu item (root item if no parentId)
  createMenu: async (data: CreateMenuDTO): Promise<MenuItem> => {
    const response = await api.post('/menus', data);
    return response.data;
  },

  // Add a submenu item
  addMenuItem: async (parentId: string, data: CreateMenuDTO): Promise<MenuItem> => {
    // Ensure the parentId is included in the data
    const menuItemData = {
      ...data,
      parentId,
    };
    const response = await api.post('/menus', menuItemData);
    return response.data;
  },

  // Update a menu item
  updateMenuItem: async (id: string, data: UpdateMenuDTO): Promise<MenuItem> => {
    const response = await api.put(`/menus/${id}`, data);
    return response.data;
  },

  // Delete a menu item
  deleteMenuItem: async (id: string): Promise<void> => {
    await api.delete(`/menus/${id}`);
  },

  // Get a specific menu item with its children
  getMenuItem: async (id: string): Promise<MenuItem> => {
    const response = await api.get(`/menus/${id}`);
    return response.data;
  },

  // Save the current state of the menu
  saveMenu: async (): Promise<void> => {
    await api.post('/menus/save');
  },
}; 