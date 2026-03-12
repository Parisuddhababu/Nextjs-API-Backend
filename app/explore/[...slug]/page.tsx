"use client";

import { useParams } from "next/navigation";

export default function ExplorePage() {

  const params = useParams();

  const slug = params.slug as string[];
  console.log("Slug Array:", slug);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Catch-All Route Demo</h1>

      <h3>Slug Array:</h3>
      <pre>{JSON.stringify(slug, null, 2)}</pre>

      <h3>Readable Path:</h3>
      <p>{slug.join(" / ")}</p>

      <h3>Individual Parts</h3>

      <p>Level 1: {slug[0]}</p>
      <p>Level 2: {slug[1]}</p>
      <p>Level 3: {slug[2]}</p>

    </div>
  );
}