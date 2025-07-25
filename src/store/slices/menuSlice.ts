import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MenuState, MenuItem, Category } from '../../types';

const initialState: MenuState = {
  items: [],
  categories: [
    { id: '1', name: 'Appetizers', description: 'Start your meal right' },
    { id: '2', name: 'Main Course', description: 'Hearty main dishes' },
    { id: '3', name: 'Desserts', description: 'Sweet endings' },
    { id: '4', name: 'Beverages', description: 'Refreshing drinks' },
  ],
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
    },
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
    },
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
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
} = menuSlice.actions;

export default menuSlice.reducer;
