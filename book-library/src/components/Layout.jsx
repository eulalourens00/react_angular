import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '@/providers/ThemeProvider';
import { ToastContainer } from './ToastContainer';

export function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Моя библиотека</h1>
        <nav>
          <NavLink to="/" end>Библиотека</NavLink>
          <NavLink to="/catalog">Каталог</NavLink>
        </nav>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Сменить тему">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
}