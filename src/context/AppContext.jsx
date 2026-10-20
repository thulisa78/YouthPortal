import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [saved, setSaved] = useState([]);
  const [viewedIds, setViewedIds] = useState(new Set());

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('youthrise_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Failed to parse stored user:', e);
      }
    }
  }, []);

  const login = useCallback((email, password) => {
    // Simple validation - in production, this would be an API call
    if (email && password) {
      const userData = {
        name: email.split('@')[0],
        email,
        role: 'Youth Member',
      };
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('youthrise_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  }, []);

  const signup = useCallback((email, password, confirmPassword) => {
    // Simple validation - in production, this would be an API call
    if (!email || !password || !confirmPassword) {
      return { success: false, error: 'All fields are required' };
    }
    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    const userData = {
      name: email.split('@')[0],
      email,
      role: 'Youth Member',
    };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('youthrise_user', JSON.stringify(userData));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    setSaved([]);
    setViewedIds(new Set());
    localStorage.removeItem('youthrise_user');
  }, []);

  const isSaved = useCallback(
    (id, type) => saved.some((s) => s.id === id && s.type === type),
    [saved]
  );

  const toggleSaved = useCallback((id, type) => {
    setSaved((prev) => {
      const exists = prev.some((s) => s.id === id && s.type === type);
      if (exists) return prev.filter((s) => !(s.id === id && s.type === type));
      return [...prev, { id, type }];
    });
  }, []);

  const markViewed = useCallback((id) => {
    setViewedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const savedCountByType = (type) => saved.filter((s) => s.type === type).length;

  const value = {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
    saved,
    isSaved,
    toggleSaved,
    markViewed,
    viewedCount: viewedIds.size,
    savedCountByType,
    totalSaved: saved.length,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
