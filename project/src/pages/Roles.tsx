import React from 'react';
import { Shield, Check, X } from 'lucide-react';

const permissions = [
  { id: '1', name: 'Read Users', description: 'View user information' },
  { id: '2', name: 'Create Users', description: 'Create new users' },
  { id: '3', name: 'Edit Users', description: 'Modify user information' },
  { id: '4', name: 'Delete Users', description: 'Remove users from the system' },
  { id: '5', name: 'Manage Roles', description: 'Assign and modify user roles' },
  { id: '6', name: 'Moderate Content', description: 'Moderate user-generated content' },
];

const roles = [
  {
    name: 'Admin',
    description: 'Full system access',
    permissions: permissions.map(p => p.id),
  },
  {
    name: 'Moderator',
    description: 'Content moderation and user management',
    permissions: ['1', '2', '3', '6'],
  },
  {
    name: 'User',
    description: 'Limited system access',
    permissions: ['1'],
  },
];

export default function Roles() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Roles & Permissions</h1>
      </div>

      <div className="grid gap-6">
        {roles.map((role) => (
          <div key={role.name} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <h2 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {role.name}
                </h2>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {role.description}
              </p>
            </div>
            <div className="px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Permissions
              </h3>
              <div className="space-y-4">
                {permissions.map((permission) => (
                  <div key={permission.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {permission.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {permission.description}
                      </p>
                    </div>
                    {role.permissions.includes(permission.id) ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}