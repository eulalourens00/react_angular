import { useParams, Link } from 'react-router-dom';
import { useBook, useLibrary } from '@/hooks/useLibrary';
import { BookCard } from '@/components/BookCard';

export function BookDetailPage() {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useBook(id);
  const { data: library } = useLibrary();
  const inLibrary = !!library?.some((b) => b.id === id);

  if (isLoading) return <p>Загрузка…</p>;
  if (isError) return <p className="error">Книга не найдена.</p>;

  return (
    <section>
      <Link to="/catalog" className="back-link">← Каталог</Link>
      <BookCard book={book} inLibrary={inLibrary} />
    </section>
  );
}