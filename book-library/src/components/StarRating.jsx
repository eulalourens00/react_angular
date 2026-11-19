import { useOptimistic, useTransition } from 'react';

export function StarRating({ value = 0, onChange, disabled }) {
  const [optimistic, setOptimistic] = useOptimistic(value);
  const [, startTransition] = useTransition();

  function handleClick(next) {
    if (disabled) return;
    startTransition(async () => {
      setOptimistic(next);
      try {
        await onChange(next);
      } catch {
        // Ревёрт произойдёт автоматически, когда transition завершится.
      }
    });
  }

  return (
    <div className="stars" role="radiogroup">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={n <= optimistic ? 'star filled' : 'star'}
          onClick={() => handleClick(n)}
          disabled={disabled}
          aria-label={`Оценка ${n}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}