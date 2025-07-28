import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store, type RootState } from './store';
import { useSelector } from 'react-redux';
import { Suspense, lazy } from 'react';

// Lazy loaded pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const MenuList = lazy(() => import('./pages/MenuList'));
const AddMenuItem = lazy(() => import('./pages/AddMenuItem'));
const EditMenuItem = lazy(() => import('./pages/EditMenuItem'));
const HelloWorld = lazy(() => import('./pages/HelloWorld'));

// Components (keep these as regular imports since they're used frequently)
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

const queryClient = new QueryClient();

function AppRoutes() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
            }
          />
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? '/dashboard' : '/login'} />
            }
          />
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/menu" element={<MenuList />} />
              <Route path="/menu/add" element={<AddMenuItem />} />
              <Route path="/hello" element={<HelloWorld />} />
              <Route path="/menu/edit/:id" element={<EditMenuItem />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
