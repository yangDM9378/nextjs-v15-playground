import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈",
  description: "온바이트 북스 - 추천 도서와 전체 도서 목록을 확인하세요.",
};

// export const dynamic = 'auto'

async function Allbooks () {
  await delay(1500);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {cache:"force-cache"})
  if (!response.ok) {
    return <div>오류가 발생했습니다....</div>
  }
  const allBooks : BookData[] = await response.json();

  return <div>
    {allBooks.map((book) => (
      <BookItem key={book.id} {...book} />
    ))}
  </div>
}


async function RecoBooks () {
  await delay(3000);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, {next: {revalidate:10}})
  if (!response.ok) {
    return <div>오류가 발생했습니다....</div>
  }
  const recoBooks : BookData[] = await response.json();

  return <div>
    {recoBooks.map((book) => (
      <BookItem key={book.id} {...book} />
    ))}
  </div>
}

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense
          fallback={<BookListSkeleton count={3}/>}
        >
          <RecoBooks/>
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense 
          fallback={<BookListSkeleton count={3}/>}
        >
          <Allbooks/>
        </Suspense>
      </section>
    </div>
  );
}
