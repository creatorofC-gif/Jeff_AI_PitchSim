import { create } from 'zustand';

export interface UserProfile {
  name: string;
  email: string;
  college: string;
  cohort: string;
  avatarUrl: string;
  totalPitches: number;
  averageScore: number;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile;
  login: (email?: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true, // Default to true for smooth immediate demo flow
  user: {
    name: 'Aarav Mehta',
    email: 'aarav.m@ecell.iitb.ac.in',
    college: 'E-Cell Incubator Network',
    cohort: 'Fall 2026 Founder Fellowship',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    totalPitches: 14,
    averageScore: 82
  },
  login: async (email?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    set((state) => ({
      isAuthenticated: true,
      user: {
        ...state.user,
        email: email || state.user.email,
        name: email ? email.split('@')[0].replace('.', ' ').toUpperCase() : state.user.name
      }
    }));
    return true;
  },
  logout: () => {
    set({ isAuthenticated: false });
  },
  updateProfile: (updates) => {
    set((state) => ({
      user: { ...state.user, ...updates }
    }));
  }
}));
