import React from 'react';
import { useAuthStore } from '../store/auth';
import { Users, UserCheck, UserX, Shield, AlertCircle } from 'lucide-react';

function AdminDashboard() {
  const { getUserStats } = useAuthStore();
  const stats = getUserStats();

  const StatCard = ({ title, value, icon: Icon, color }: {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.total}
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Users"
          value={stats.active}
          icon={UserCheck}
          color="bg-green-500"
        />
        <StatCard
          title="Inactive Users"
          value={stats.inactive}
          icon={UserX}
          color="bg-red-500"
        />
        <StatCard
          title="Moderators"
          value={stats.byRole.moderator}
          icon={Shield}
          color="bg-purple-500"
        />
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">User Distribution</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admins</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{stats.byRole.admin}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Moderators</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{stats.byRole.moderator}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Users</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{stats.byRole.user}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserDashboard() {
  const { user, updateUser } = useAuthStore();
  const [requestSent, setRequestSent] = React.useState(false);
  const [requestType, setRequestType] = React.useState<'activation' | 'elevation' | null>(null);

  const handleRequest = (type: 'activation' | 'elevation') => {
    // In a real app, this would create a request in the database
    setRequestType(type);
    setRequestSent(true);
  };

  if (!user) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account Status</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Current role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </p>
        </div>
        <div className={`px-4 py-2 rounded-full ${
          user.isActive 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {user.isActive ? 'Active' : 'Inactive'}
        </div>
      </div>

      {!user.isActive && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Account Inactive</h3>
              <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                Your account is currently inactive. Request activation from an administrator.
              </p>
              {!requestSent && (
                <button
                  onClick={() => handleRequest('activation')}
                  className="mt-3 text-sm font-medium text-yellow-800 dark:text-yellow-200 hover:text-yellow-600 dark:hover:text-yellow-300"
                >
                  Request Activation →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {user.isActive && user.role === 'user' && (
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-500 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-200">Role Elevation</h3>
              <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
                Want to contribute more? Request to become a moderator.
              </p>
              {!requestSent && (
                <button
                  onClick={() => handleRequest('elevation')}
                  className="mt-3 text-sm font-medium text-indigo-800 dark:text-indigo-200 hover:text-indigo-600 dark:hover:text-indigo-300"
                >
                  Request Moderator Role →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {requestSent && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <div className="flex items-start">
            <UserCheck className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Request Sent</h3>
              <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                {requestType === 'activation'
                  ? 'Your account activation request has been sent to administrators.'
                  : 'Your role elevation request has been sent to administrators.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>
      {user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
}