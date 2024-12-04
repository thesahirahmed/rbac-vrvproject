import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Role, User } from '../types/auth';

interface AuthState {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

const defaultAdmin: User = {
  id: '1',
  username: 'admin',
  email: 'admin@example.com',
  role: 'admin',
  createdAt: new Date().toISOString(),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      users: [defaultAdmin],
      isAuthenticated: false,
      login: async (username: string, password: string) => {
        const users = useAuthStore.getState().users;
        const user = users.find(u => u.username === username);
        
        if (username === 'admin' && password === 'secretkey') {
          set({ user: defaultAdmin, isAuthenticated: true });
        } else if (user) {
          // In a real app, you'd hash and compare passwords
          set({ user, isAuthenticated: true });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      register: async (username: string, email: string, password: string) => {
        const users = useAuthStore.getState().users;
        if (users.some(u => u.username === username || u.email === email)) {
          throw new Error('Username or email already exists');
        }

        const newUser: User = {
          id: crypto.randomUUID(),
          username,
          email,
          role: 'user',
          createdAt: new Date().toISOString(),
        };

        set(state => ({ users: [...state.users, newUser] }));
        return;
      },
      addUser: (user: User) => {
        set(state => ({ users: [...state.users, user] }));
      },
      updateUser: (id: string, updates: Partial<User>) => {
        set(state => ({
          users: state.users.map(user => 
            user.id === id ? { ...user, ...updates } : user
          )
        }));
      },
      deleteUser: (id: string) => {
        set(state => ({
          users: state.users.filter(user => user.id !== id)
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);