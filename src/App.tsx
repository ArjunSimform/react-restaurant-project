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

// Lazy loaded pages

// Components (keep these as regular imports since they're used frequently)
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import MenuList from './pages/MenuList';
import AddMenuItem from './pages/AddMenuItem';
import HelloWorld from './pages/HelloWorld';
import EditMenuItem from './pages/EditMenuItem';

const queryClient = new QueryClient();

function AppRoutes() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
          }
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />}
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
