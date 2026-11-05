import { BOOKS } from "@/data/stack";

export default function Books() {
  return (
    <ul className="divide-y divide-border">
      {BOOKS.map((book) => (
        <li key={book.title} className="flex items-start justify-between gap-6 py-4">
          <p className="min-w-0 text-[15.2px] text-foreground">{book.title}</p>
          <p className="shrink-0 text-right text-[13.6px] text-muted-foreground">
            {book.author}
          </p>
        </li>
      ))}
    </ul>
  );
}
