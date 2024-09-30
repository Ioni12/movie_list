import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle theme
    </button>
  );
}