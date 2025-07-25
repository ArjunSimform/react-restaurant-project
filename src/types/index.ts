export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'manager';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface MenuState {
  items: MenuItem[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}
