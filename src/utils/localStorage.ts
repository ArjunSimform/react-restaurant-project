import type { MenuItem, Category } from '../types';

const MENU_ITEMS_KEY = 'restaurant_menu_items';
const CATEGORIES_KEY = 'restaurant_categories';

export const localStorageUtils = {
  // Menu Items
  getMenuItems: (): MenuItem[] => {
    try {
      const items = localStorage.getItem(MENU_ITEMS_KEY);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error('Error reading menu items from localStorage:', error);
      return [];
    }
  },

  setMenuItems: (items: MenuItem[]): void => {
    try {
      localStorage.setItem(MENU_ITEMS_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving menu items to localStorage:', error);
    }
  },

  // Categories
  getCategories: (): Category[] => {
    try {
      const categories = localStorage.getItem(CATEGORIES_KEY);
      return categories ? JSON.parse(categories) : [];
    } catch (error) {
      console.error('Error reading categories from localStorage:', error);
      return [];
    }
  },

  setCategories: (categories: Category[]): void => {
    try {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving categories to localStorage:', error);
    }
  },

  // Clear all data
  clearMenuData: (): void => {
    try {
      localStorage.removeItem(MENU_ITEMS_KEY);
      localStorage.removeItem(CATEGORIES_KEY);
    } catch (error) {
      console.error('Error clearing menu data from localStorage:', error);
    }
  },

  // Check if data exists
  hasMenuData: (): boolean => {
    return localStorage.getItem(MENU_ITEMS_KEY) !== null;
  },
};
