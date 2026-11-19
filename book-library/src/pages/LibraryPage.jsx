import { useMemo, useTransition } from 'react';
import { useLibrary } from '@/hooks/useLibrary';
import { useUIStore } from '@/store/uiStore';
import { BookCard } from '@/components/BookCard';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const FILTERS = [
  { value: 'all', label: 'Все' },
  { value: 'want', label: 'Хочу' },
  { value: 'reading', label: 'Читаю' },
  { value: 'read', label: 'Прочитано' },
];

export function LibraryPage() {
  const { data: books, isLoading, isError } = useLibrary();
  const filter = useUIStore((s) => s.libraryFilter);
  const setFilter = useUIStore((s) => s.setLibraryFilter);
  const [isPending, startTransition] = useTransition();

  const visible = useMemo(() => {
    if (!books) return [];
    return filter === 'all' ? books : books.filter((b) => b.status === filter);
  }, [books, filter]);

  if (isLoading) return <div className="page-loading">Загрузка библиотеки…</div>;
  if (isError) return <p className="error">Не удалось загрузить библиотеку.</p>;

  return (
    <ErrorBoundary>
      <section>
        <div className="filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={filter === f.value ? 'chip active' : 'chip'}
              onClick={() =>
                startTransition(() => setFilter(f.value))
              }
            >
              {f.label}
            </button>
          ))}
          {isPending && <span className="hint">Фильтрация…</span>}
        </div>

        {visible.length === 0 ? (
          <p className="empty">Здесь пока ничего нет.</p>
        ) : (
          <div className="book-grid">
            {visible.map((book) => (
              <BookCard key={book.id} book={book} inLibrary />
            ))}
          </div>
        )}
      </section>
    </ErrorBoundary>
  );
}