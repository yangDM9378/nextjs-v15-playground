"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

export default function ItemModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => router.back()}
    >
      <div
        style={{ background: "white", padding: "2rem", borderRadius: "8px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <p>인터셉팅 모달 - item {id}</p>
        <button onClick={() => router.back()}>닫기</button>
      </div>
    </div>
  );
}
