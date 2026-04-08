// 하드 네비게이션(새로고침, 직접 URL 입력) 시 렌더링
export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>원본 페이지 - item {id}</div>;
}
