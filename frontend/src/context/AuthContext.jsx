import { createContext, useContext, useState } from 'react';
import { USER_PROFILE } from '../constants/mockData';

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(USER_PROFILE);

  const signIn = async (_email, _password) => {
    await new Promise((r) => setTimeout(r, 800));
    setUser(USER_PROFILE);
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
