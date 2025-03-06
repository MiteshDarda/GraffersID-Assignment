export interface User {
  id: string;
  email: string;
  name: string;
  token?: string;
  role?: 'user' | 'admin';
}

export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
