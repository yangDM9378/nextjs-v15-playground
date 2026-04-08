import Link from "next/link";

export default function InterceptingPage() {
  const items = [1, 2, 3];

  return (
    <div>
      <h1>Intercepting Route 예제</h1>
      <ul>
        {items.map((id) => (
          <li key={id}>
            <Link href={`/intercepting/item/${id}`}>item {id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
