import { useEffect } from 'react';
import { useUIStore } from '@/store/uiStore';

function Toast({ toast }) {
  const remove = useUIStore((s) => s.removeToast);

  useEffect(() => {
    const t = setTimeout(() => remove(toast.id), 3000);
    return () => clearTimeout(t);
  }, [toast.id, remove]);

  return <div className={`toast toast-${toast.type}`}>{toast.message}</div>;
}

export function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts);
  if (!toasts.length) return null;
  return <div className="toasts">{toasts.map((t) => <Toast key={t.id} toast={t} />)}</div>;
}