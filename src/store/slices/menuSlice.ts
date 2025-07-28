import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MenuState, MenuItem, Category } from '../../types';
import { menuData } from '@/constants/menuData';
import { localStorageUtils } from '../../utils/localStorage';

// Load data from localStorage or use defaults
const loadInitialMenuItems = (): MenuItem[] => {
  const storedItems = localStorageUtils.getMenuItems();
  return storedItems.length > 0 ? storedItems : menuData;
};

const loadInitialCategories = (): Category[] => {
  const storedCategories = localStorageUtils.getCategories();
  return storedCategories.length > 0
    ? storedCategories
    : [
        { id: '1', name: 'Appetizers', description: 'Start your meal right' },
        { id: '2', name: 'Main Course', description: 'Hearty main dishes' },
        { id: '3', name: 'Desserts', description: 'Sweet endings' },
        { id: '4', name: 'Beverages', description: 'Refreshing drinks' },
      ];
};

const initialState: MenuState = {
  items: loadInitialMenuItems(),
  categories: loadInitialCategories(),
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
      localStorageUtils.setMenuItems(action.payload);
    },
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
      localStorageUtils.setMenuItems(state.items);
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorageUtils.setMenuItems(state.items);
      }
    },
    deleteMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorageUtils.setMenuItems(state.items);
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      localStorageUtils.setCategories(action.payload);
    },
    clearMenuData: (state) => {
      state.items = [];
      state.categories = [];
      localStorageUtils.clearMenuData();
    },
  },
});

export const {
  setLoading,
  setError,
  setMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  setCategories,
  clearMenuData,
} = menuSlice.actions;

export default menuSlice.reducer;
