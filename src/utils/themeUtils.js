// Utilitaire pour gérer les couleurs du thème (light/dark mode)

export const getCSSVariable = (variable) => {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
};

export const getThemeColors = () => {
  return {
    background: getCSSVariable('--background'),
    foreground: getCSSVariable('--foreground'),
    card: getCSSVariable('--card'),
    cardForeground: getCSSVariable('--card-foreground'),
    primary: getCSSVariable('--primary'),
    primaryForeground: getCSSVariable('--primary-foreground'),
    secondary: getCSSVariable('--secondary'),
    secondaryForeground: getCSSVariable('--secondary-foreground'),
    muted: getCSSVariable('--muted'),
    mutedForeground: getCSSVariable('--muted-foreground'),
    accent: getCSSVariable('--accent'),
    accentForeground: getCSSVariable('--accent-foreground'),
    destructive: getCSSVariable('--destructive'),
    border: getCSSVariable('--border'),
    ring: getCSSVariable('--ring'),
    navBg: getCSSVariable('--nav-bg'),
    navBorder: getCSSVariable('--nav-border')
  };
};

// Classes CSS dynamiques basées sur le thème
export const getThemeClasses = {
  // Background colors
  bgPrimary: 'bg-[var(--background)]',
  bgCard: 'bg-[var(--card)]',
  bgSecondary: 'bg-[var(--secondary)]',
  bgMuted: 'bg-[var(--muted)]',
  bgAccent: 'bg-[var(--accent)]',
  bgNav: 'bg-[var(--nav-bg)]',
  
  // Text colors
  textPrimary: 'text-[var(--foreground)]',
  textCard: 'text-[var(--card-foreground)]',
  textSecondary: 'text-[var(--secondary-foreground)]',
  textMuted: 'text-[var(--muted-foreground)]',
  textAccent: 'text-[var(--accent-foreground)]',
  textPrimaryForeground: 'text-[var(--primary-foreground)]',
  
  // Border colors
  border: 'border-[var(--border)]',
  borderNav: 'border-[var(--nav-border)]',
  
  // Other
  textDestructive: 'text-[var(--destructive)]',
  bgDestructive: 'bg-[var(--destructive)]',
  
  // Combined classes for common patterns
  card: 'bg-[var(--card)] text-[var(--card-foreground)] border-[var(--border)]',
  buttonPrimary: 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90',
  buttonSecondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/80',
  buttonAccent: 'bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent)]/90',
  input: 'bg-[var(--background)] text-[var(--foreground)] border-[var(--border)]',
  navigation: 'bg-[var(--nav-bg)] border-[var(--nav-border)]'
};

// Fonction pour basculer le dark mode
export const toggleDarkMode = () => {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark-mode');
  
  if (isDark) {
    html.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
};

// Fonction pour initialiser le thème
export const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark-mode');
  }
};
