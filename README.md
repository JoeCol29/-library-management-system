# Library Management System

## Schema Decisions

The Book model stores a genreId foreign key pointing at the Genre table rather than embedding genre details inside each book record.

Data integrity - a genre name lives in exactly one row, so renaming or editing it never leaves stale copies scattered across book records.

Storage efficiency - repeating the same genre string on hundreds of books wastes space compared to a single ID reference.

Query flexibility - Prisma can traverse the relation to fetch all books in Science or each genre with its book count without scanning and matching text values.

## Stretch: Review model

An optional Review model (bookId, userId, rating, comment) adds a many-to-many style relation between User and Book, letting patrons attach ratings and comments to titles they have read.

## Prisma vs. document databases

In MongoDB I would embed a small array of tags directly on each book document for fast reads. In Prisma/Postgres that same convenience costs update anomalies, so relations plus joins replace embedding - more explicit wiring but far cleaner consistency when data changes.

