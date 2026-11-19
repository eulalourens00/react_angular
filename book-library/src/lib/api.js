import { seedCatalog } from './seed.js';

const LIBRARY_KEY = 'book-library-v1';

// Имитация задержки сети. В реальном проекте тут был бы fetch.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function readLibrary() {
  try {
    return JSON.parse(localStorage.getItem(LIBRARY_KEY)) ?? [];
  } catch {
    return [];
  }
}

function writeLibrary(books) {
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(books));
}

// GET /catalog?q=...
export async function searchCatalog(query) {
  await delay(300);
  const q = query.trim().toLowerCase();
  if (!q) return seedCatalog;
  return seedCatalog.filter(
    (book) =>
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q),
  );
}

// GET /books/:id
export async function getCatalogBook(id) {
  await delay(200);
  const book = seedCatalog.find((b) => b.id === id);
  if (!book) throw new Error('Книга не найдена');
  return book;
}

// GET /library
export async function getLibrary() {
  await delay(200);
  return readLibrary();
}

// POST /library
export async function addToLibrary(bookId) {
  await delay(250);
  const library = readLibrary();
  if (library.some((b) => b.id === bookId)) {
    throw new Error('Книга уже в библиотеке');
  }
  const book = seedCatalog.find((b) => b.id === bookId);
  if (!book) throw new Error('Книга не найдена');
  const entry = { ...book, status: 'want', rating: 0, addedAt: Date.now() };
  writeLibrary([entry, ...library]);
  return entry;
}

// PATCH /library/:id
export async function updateLibraryBook(id, patch) {
  await delay(250);
  const library = readLibrary();
  const idx = library.findIndex((b) => b.id === id);
  if (idx === -1) throw new Error('Книга не в библиотеке');
  const updated = { ...library[idx], ...patch };
  library[idx] = updated;
  writeLibrary(library);
  return updated;
}

// DELETE /library/:id
export async function removeFromLibrary(id) {
  await delay(200);
  writeLibrary(readLibrary().filter((b) => b.id !== id));
  return { id };
}