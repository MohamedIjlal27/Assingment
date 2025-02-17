import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { menuApi } from '@/lib/api/menu';

export interface MenuItem {
  id: string;
  name: string;
  depth: number;
  parentId?: string;
  children?: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
  isExpanded?: boolean;
}

export const fetchMenus = createAsyncThunk('menu/fetchMenus', async () => {
  const response = await menuApi.getAllMenus();
  return response.map((item: MenuItem) => ({ ...item, isExpanded: false }));
});

export const createMenu = createAsyncThunk('menu/createMenu', async (name: string) => {
  const response = await menuApi.createMenu({ name });
  return { ...response, isExpanded: false };
});

export const addMenuItem = createAsyncThunk(
  'menu/addMenuItem',
  async ({ parentId, name }: { parentId: string; name: string }) => {
    const response = await menuApi.addMenuItem(parentId, { name });
    return { ...response, isExpanded: false };
  }
);

export const updateMenuItem = createAsyncThunk(
  'menu/updateMenuItem',
  async ({ id, name }: { id: string; name: string }) => {
    const response = await menuApi.updateMenuItem(id, { name });
    return response;
  }
);

export const deleteMenuItem = createAsyncThunk(
  'menu/deleteMenuItem',
  async (id: string) => {
    await menuApi.deleteMenuItem(id);
    return id;
  }
);

interface MenuState {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleNode: (state, action) => {
      const toggleNodeRecursive = (items: MenuItem[], nodeId: string): MenuItem[] => {
        return items.map((item) => ({
          ...item,
          isExpanded: item.id === nodeId ? !item.isExpanded : item.isExpanded,
          children: item.children ? toggleNodeRecursive(item.children, nodeId) : [],
        }));
      };
      state.items = toggleNodeRecursive(state.items, action.payload);
    },
    toggleAllNodes: (state, action) => {
      const toggleAllRecursive = (items: MenuItem[], expand: boolean): MenuItem[] => {
        return items.map((item) => ({
          ...item,
          isExpanded: expand,
          children: item.children ? toggleAllRecursive(item.children, expand) : [],
        }));
      };
      state.items = toggleAllRecursive(state.items, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch menus';
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addMenuItem.fulfilled, (state, action) => {
        const updateMenuTree = (items: MenuItem[]): MenuItem[] => {
          return items.map((item): MenuItem => {
            if (item.id === action.payload.parentId) {
              return {
                ...item,
                isExpanded: true,
                children: [...(item.children || []), action.payload],
              };
            }
            if (item.children && item.children.length > 0) {
              return {
                ...item,
                children: updateMenuTree(item.children),
              };
            }
            return item;
          });
        };
        state.items = updateMenuTree(state.items);
      })
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        const updateMenuTree = (items: MenuItem[]): MenuItem[] => {
          return items.map((item): MenuItem => {
            if (item.id === action.payload.id) {
              return { ...action.payload, isExpanded: item.isExpanded };
            }
            if (item.children) {
              return {
                ...item,
                children: updateMenuTree(item.children),
              };
            }
            return item;
          });
        };
        state.items = updateMenuTree(state.items);
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        const filterMenuTree = (items: MenuItem[]): MenuItem[] => {
          return items
            .filter((item) => item.id !== action.payload)
            .map((item): MenuItem => ({
              ...item,
              children: item.children ? filterMenuTree(item.children) : [],
            }));
        };
        state.items = filterMenuTree(state.items);
      });
  },
});

export const { toggleNode, toggleAllNodes } = menuSlice.actions;
export default menuSlice.reducer; 