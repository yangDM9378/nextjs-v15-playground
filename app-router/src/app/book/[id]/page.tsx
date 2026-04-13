import { notFound } from "next/navigation";
import style from "./page.module.css";
import { ReviewData, BookData } from "@/types";
import ReviewItem from "@/components/review-item";
import { ReviewEditor } from "@/components/review-editor";
import type { Metadata } from "next";

// export const dynamicParams = false;
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );
  if (!response.ok) {
    return { title: "도서 정보를 찾을 수 없습니다." };
  }
  const book: BookData = await response.json();
  return {
    title: book.title,
    description: book.description,
    openGraph: {
      title: book.title,
      description: book.description,
      images: [book.coverImgUrl],
    },
  };
}

async function BookDetail({bookId}: {bookId: string}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`)
  if (!response.ok) {
    if(response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>
  }
  const book = await response.json()
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}


async function ReviewList ({bookId} : {bookId: string}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`);
  if (!response.ok){
    throw new Error(`Review fetch failed: ${response.statusText}`)
  }

  const reviews: ReviewData[] = await response.json();

  return <section>
    {reviews.map((review) => (
      <ReviewItem key={`review-itme-${review.id}`} {...review} />
      ))}
  </section>
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className={style.container}>
      <BookDetail bookId={id}/>
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  )
}
