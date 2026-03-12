import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome</h1>

      <Link href="/users">Go to Users</Link>
      <ul>
        <li><Link href="/users">Users CRUD</Link></li>

        <li><Link href="/explore/a">Explore A</Link></li>

        <li><Link href="/explore/a/b">Explore A B</Link></li>

        <li><Link href="/explore/a/b/c">Explore A B C</Link></li>
      </ul>
    </div>
  );
}