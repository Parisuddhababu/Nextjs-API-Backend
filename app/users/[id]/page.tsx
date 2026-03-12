"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function UserDetails() {

  const params = useParams();
  const id = params.id as string;

  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const res = await apiFetch(`/api/users/${id}`);
    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Details</h1>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>
  );
}