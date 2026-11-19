import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,          // 30 сек — данные считаются «свежими», не рефетчим зря
      gcTime: 5 * 60_000,          // 5 мин — удаление из кеша после «забывания»
      retry: 1,                    // 1 повтор при ошибке — не спамим сеть
      refetchOnWindowFocus: false, // в dev-среде раздражает, включайте осознанно
    },
  },
});