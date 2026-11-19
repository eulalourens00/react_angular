import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set) => ({
      // --- Тосты ---
      toasts: [],
      pushToast: (message, type = 'info') =>
        set((s) => ({
          toasts: [
            ...s.toasts,
            { id: crypto.randomUUID(), message, type },
          ],
        })),
      removeToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

      // --- Фильтр статуса библиотеки ---
      libraryFilter: 'all', // all | want | reading | read
      setLibraryFilter: (filter) => set({ libraryFilter: filter }),
    }),
    {
      name: 'ui-store-v1',
      // Persist только нужное (тосты не сохраняем — они эфемерны)
      partialize: (s) => ({ libraryFilter: s.libraryFilter }),
    },
  ),
);