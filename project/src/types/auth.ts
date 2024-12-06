export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  createdAt: string;
  isActive: boolean;
}

export type Role = 'admin' | 'moderator' | 'user';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  byRole: {
    admin: number;
    moderator: number;
    user: number;
  };
}