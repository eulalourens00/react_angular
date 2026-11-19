import { Link } from 'react-router-dom';
import { StarRating } from './StarRating';
import { useUpdateLibraryBook, useRemoveFromLibrary, useAddToLibrary } from '@/hooks/useLibrary';

const STATUS_LABELS = {
  want: 'Хочу прочитать',
  reading: 'Читаю',
  read: 'Прочитано',
};

export function BookCard({ book, inLibrary = false }) {
  const updateMutation = useUpdateLibraryBook();
  const removeMutation = useRemoveFromLibrary();
  const addMutation = useAddToLibrary();

  async function handleRate(rating) {
    await updateMutation.mutateAsync({ id: book.id, patch: { rating } });
  }

  async function handleStatus(e) {
    await updateMutation.mutateAsync({
      id: book.id,
      patch: { status: e.target.value },
    });
  }

  return (
    <article className="book-card">
      <Link to={`/books/${book.id}`} className="book-cover">{book.cover}</Link>
      <div className="book-info">
        <Link to={`/books/${book.id}`} className="book-title">{book.title}</Link>
        <p className="book-author">{book.author}, {book.year}</p>

        {inLibrary ? (
          <>
            <div className="book-row">
              <select value={book.status} onChange={handleStatus}>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <StarRating value={book.rating} onChange={handleRate} />
            </div>
            <button
              className="danger"
              onClick={() => removeMutation.mutate(book.id)}
              disabled={removeMutation.isPending}
            >
              {removeMutation.isPending ? 'Удаление…' : 'Удалить'}
            </button>
          </>
        ) : (
          <button
            onClick={() => addMutation.mutate(book.id)}
            disabled={addMutation.isPending}
          >
            {addMutation.isPending ? 'Добавление…' : 'В библиотеку'}
          </button>
        )}
      </div>
    </article>
  );
}