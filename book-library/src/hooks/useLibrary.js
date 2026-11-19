import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '@/lib/api';
import { useUIStore } from '@/store/uiStore';

// --- Чтение (queries) ---

export function useCatalog(query) {
  return useQuery({
    queryKey: ['catalog', query],
    queryFn: () => api.searchCatalog(query),
    placeholderData: (prev) => prev, // держим предыдущие данные при смене query
  });
}

export function useLibrary() {
  return useQuery({
    queryKey: ['library'],
    queryFn: api.getLibrary,
  });
}

export function useBook(id) {
  return useQuery({
    queryKey: ['books', id],
    queryFn: () => api.getCatalogBook(id),
    enabled: Boolean(id), // не запускаем запрос без id
  });
}

// --- Мутации (запись) ---

export function useAddToLibrary() {
  const queryClient = useQueryClient();
  const pushToast = useUIStore((s) => s.pushToast);

  return useMutation({
    mutationFn: api.addToLibrary,
    onSuccess: (entry) => {
      queryClient.invalidateQueries({ queryKey: ['library'] });
      pushToast(`«${entry.title}» добавлена в библиотеку`, 'success');
    },
    onError: (err) => pushToast(err.message, 'error'),
  });
}

export function useUpdateLibraryBook() {
  const queryClient = useQueryClient();
  const pushToast = useUIStore((s) => s.pushToast);

  return useMutation({
    mutationFn: ({ id, patch }) => api.updateLibraryBook(id, patch),
    onSuccess: (updated) => {
      // Синхронно обновляем кеш — чтобы UI сразу увидел новые данные
      queryClient.setQueryData(['library'], (old) =>
        old?.map((b) => (b.id === updated.id ? updated : b)),
      );
      queryClient.setQueryData(['books', updated.id], updated);
    },
    onError: (err) => pushToast(err.message, 'error'),
  });
}

export function useRemoveFromLibrary() {
  const queryClient = useQueryClient();
  const pushToast = useUIStore((s) => s.pushToast);

  return useMutation({
    mutationFn: api.removeFromLibrary,
    onSuccess: (_data, id) => {
      queryClient.setQueryData(['library'], (old) =>
        old?.filter((b) => b.id !== id),
      );
      pushToast('Книга удалена', 'info');
    },
    onError: (err) => pushToast(err.message, 'error'),
  });
}