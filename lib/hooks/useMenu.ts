import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  fetchMenus,
  createMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../store/menuSlice';

export const useMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.menu);

  const loadMenus = () => dispatch(fetchMenus());
  const createNewMenu = (name: string) => dispatch(createMenu(name));
  const addNewMenuItem = (parentId: string, name: string) =>
    dispatch(addMenuItem({ parentId, name }));
  const updateItem = (id: string, name: string) =>
    dispatch(updateMenuItem({ id, name }));
  const deleteItem = (id: string) => dispatch(deleteMenuItem(id));

  return {
    items,
    loading,
    error,
    loadMenus,
    createNewMenu,
    addNewMenuItem,
    updateItem,
    deleteItem,
  };
}; 