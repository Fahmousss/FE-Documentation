import { Mode } from '@/core/models/dark-mode.types';
import { useAppSelector } from '@/core/store/hooks';
import { useEffect } from 'react';

export default function useDarkMode() {
  const theme = useAppSelector((state) => state.darkMode.theme);
  const colorTheme: Mode = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
  }, [theme, colorTheme]);

  return { colorTheme };
}
