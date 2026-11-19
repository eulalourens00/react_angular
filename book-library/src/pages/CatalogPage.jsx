import { useDeferredValue, useState } from 'react';
import { useCatalog, useLibrary } from '@/hooks/useLibrary';
import { BookCard } from '@/components/BookCard';

export function CatalogPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query); // «отстающий» ввод

  const { data: catalog, isLoading, isFetching } = useCatalog(deferredQuery);
  const { data: library } = useLibrary();

  const libraryIds = new Set((library ?? []).map((b) => b.id));

  return (
    <section>
      <input
        type="search"
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск по названию или автору…"
      />
      {isFetching && <span className="hint">Поиск…</span>}

      {isLoading ? (
        <p>Загрузка каталога…</p>
      ) : (
        <div className="book-grid">
          {catalog?.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              inLibrary={libraryIds.has(book.id)}
            />
          ))}
          {catalog?.length === 0 && (
            <p className="empty">Ничего не найдено.</p>
          )}
        </div>
      )}
    </section>
  );
}