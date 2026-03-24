import { ReviewData } from "@/types";
import style from  "./review-item.module.css";
import ReviewItemDeleteButton from "./review-item-delete-button";

export default function ReviewItem({
  id,
  content,
  author,
  createAt,
  bookId
}: ReviewData) {
  const initial = author ? author[0].toUpperCase() : "?";

  return (
    <div className={style.item}>
      <div className={style.header}>
        <div className={style.avatar}>{initial}</div>
        <span className={style.author}>{author}</span>
      </div>
      <p className={style.content}>{content}</p>
      <div className={style.footer}>
        <span className={style.date}>{new Date(createAt).toLocaleDateString()}</span>
        <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
      </div>
    </div>
  );
}