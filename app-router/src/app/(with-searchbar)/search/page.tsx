import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: `"${q}" 검색 결과`,
    description: `"${q}"에 대한 도서 검색 결과입니다.`,
  };
}

async function SearchResult ({q} : {q: string}) {
  await delay(1500)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, {cache: 'force-cache'})
  if (!response.ok){
    return <div>오류가 발생했습니다...</div>
  }
  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <Suspense key={q||""} 
      fallback={<BookListSkeleton count={3}/>}
    >
      <SearchResult q={q || ""}/>
    </Suspense>
  )


}
