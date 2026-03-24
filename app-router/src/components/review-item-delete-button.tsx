"use client"

import { deleteReviewAction } from "@/action/delete-review.action";
import style from "./review-item.module.css";
import { useActionState, useEffect, useRef } from "react";

export default function ReviewItemDeleteButton({ reviewId, bookId }: { reviewId: number; bookId: number }) {
  const boundAction = deleteReviewAction.bind(null, reviewId, bookId);
  const [state, formAction, isPending] = useActionState(boundAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <div
        onClick={() => { if (!isPending) formRef.current?.requestSubmit(); }}
        className={style.delete_btn}
        style={{ opacity: isPending ? 0.5 : 1, cursor: isPending ? "not-allowed" : "pointer" }}
      >
        {isPending ? "..." : "삭제하기"}
      </div>
    </form>
  );
}
