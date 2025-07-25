import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Menu, Users, TrendingUp, Clock } from 'lucide-react';

const Dashboard = () => {
  const menuItems = useSelector((state: RootState) => state.menu.items);
  const categories = useSelector((state: RootState) => state.menu.categories);

  const stats = [
    {
      name: 'Total Menu Items',
      value: menuItems.length,
      icon: Menu,
      color: 'bg-blue-500',
    },
    {
      name: 'Categories',
      value: categories.length,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      name: 'Available Items',
      value: menuItems.filter((item) => item.available).length,
      icon: TrendingUp,
      color: 'bg-yellow-500',
    },
    {
      name: 'Recent Updates',
      value: menuItems.filter((item) => {
        const updatedAt = new Date(item.updatedAt);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - updatedAt.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      }).length,
      icon: Clock,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your restaurant management dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          {menuItems.length === 0 ? (
            <div className="text-center py-8">
              <Menu className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No menu items
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating your first menu item.
              </p>
              <div className="mt-6">
                <a
                  href="/menu/add"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Menu Item
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {menuItems.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ₹{item.price}
                    </p>
                    <p
                      className={`text-xs ${item.available ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {item.available ? 'Available' : 'Unavailable'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
