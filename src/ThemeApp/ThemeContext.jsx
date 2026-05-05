
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Lecture du thème sauvegardé ou du thème système
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('ecocollect_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    // Optionnel : suivre les préférences système
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Applique la classe sur le body et persiste dans localStorage
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('ecocollect_theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('ecocollect_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};