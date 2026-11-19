import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="empty">
      <h2>404 — страница не найдена</h2>
      <Link to="/">На главную</Link>
    </div>
  );
}