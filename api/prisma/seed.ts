import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const genres = ['Fiction', 'Science', 'History', 'Fantasy'];
  for (const name of genres) {
    await prisma.genre.upsert({ where: { name }, update: {}, create: { name } });
  }

  const fiction = await prisma.genre.findUnique({ where: { name: 'Fiction' } });
  const science = await prisma.genre.findUnique({ where: { name: 'Science' } });
  const history = await prisma.genre.findUnique({ where: { name: 'History' } });
  const fantasy = await prisma.genre.findUnique({ where: { name: 'Fantasy' } });

  if (!fiction || !science || !history || !fantasy) throw new Error('Genres missing');

  const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genreId: fiction.id },
    { title: '1984', author: 'George Orwell', genreId: fiction.id },
    { title: 'Pride and Prejudice', author: 'Jane Austen', genreId: fiction.id },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', genreId: fiction.id },
    { title: 'A Brief History of Time', author: 'Stephen Hawking', genreId: science.id },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', genreId: science.id },
    { title: 'Cosmos', author: 'Carl Sagan', genreId: science.id },
    { title: 'Silent Spring', author: 'Rachel Carson', genreId: science.id },
    { title: 'Sapiens', author: 'Yuval Noah Harari', genreId: history.id },
    { title: 'The Art of War', author: 'Sun Tzu', genreId: history.id },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', genreId: history.id },
    { title: 'The Diary of a Young Girl', author: 'Anne Frank', genreId: history.id },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', genreId: fantasy.id },
    { title: "Harry Potter and the Sorcerer's Stone", author: 'J.K. Rowling', genreId: fantasy.id },
    { title: 'American Gods', author: 'Neil Gaiman', genreId: fantasy.id },
    { title: 'The Name of the Wind', author: 'Patrick Rothfuss', genreId: fantasy.id },
  ];

  await prisma.book.createMany({ data: books });
  console.log(`Seeded ${books.length} books across ${genres.length} genres.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
