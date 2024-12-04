export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  createdAt: string;
}

export type Role = 'admin' | 'user';

export interface Permission {
  id: string;
  name: string;
  description: string;
}