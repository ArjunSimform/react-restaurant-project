import { Outlet, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import type { RootState } from '../store';
import { Home, Menu, Plus, LogOut, User, MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Menu Items', href: '/menu', icon: Menu },
    { name: 'Add Item', href: '/menu/add', icon: Plus },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white shadow-lg">
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray text-left mr-[20%]">
          Restaurant Admin
        </h1>
      </div>
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigation?.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setOpen(false)} // Mobile: close on navigation
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      {/* <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Restaurant Admin</h1>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div> */}

      {/* Hamburger icon only on mobile  */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <MenuIcon className="h-6 w-6 text-gray-800 " />
      </button>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:left-0 md:z-50 md:w-64 md:block">
        {sidebarContent}
      </div>

      {/* Mobile sidebar (off-canvas) */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
          <div
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform transform md:hidden"
            style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
          >
            <button
              className="absolute top-4 right-4 z-50 p-2 rounded-md bg-white shadow"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <XIcon className="h-6 w-6 text-gray-700" />
            </button>
            {sidebarContent}
          </div>
        </>
      )}

      {/* Main content */}
      <div className="md:pl-64">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between bg-white px-6 shadow-sm">
          <div className="flex items-center">
            {/* <h2 className="text-lg font-semibold text-gray-900">
              {navigation.find((item) => item.href === location.pathname)
                ?.name || 'Dashboard'}
            </h2> */}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">{user?.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
