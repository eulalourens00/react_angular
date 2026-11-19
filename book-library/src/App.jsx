import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { LibraryPage } from '@/pages/LibraryPage';
import { CatalogPage } from '@/pages/CatalogPage';
import { BookDetailPage } from '@/pages/BookDetailPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<LibraryPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="books/:id" element={<BookDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}