import { ReactNode } from "react";
import Link from "next/link";

export default function ParallelLayout({
  children,
  feed,
  sidebar,
}: {
  children: ReactNode;
  feed: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div>
      {/* 상단 네비게이션 */}
      <nav>
        <Link href="/parallel">홈</Link>
        {" | "}
        <Link href="/parallel/setting">설정</Link>
      </nav>

      {/*
        Parallel Routes 핵심:
        - sidebar(@sidebar), feed(@feed), children 세 슬롯이 동시에 렌더링됨
        - URL이 바뀌면 각 슬롯이 독립적으로 자신의 콘텐츠를 업데이트함
        - 해당 URL에 맞는 파일이 없으면 default.tsx가 렌더링됨
      */}
      <div>
        {/* @sidebar 슬롯 */}
        <aside>{sidebar}</aside>

        {/* children + @feed 슬롯 */}
        <main>
          {children}
          {feed}
        </main>
      </div>
    </div>
  );
}
