"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";    
interface User {
  _id: string;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const router = useRouter();

  const fetchUsers = async () => {
    const res = await apiFetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!name || !email) return;

    await apiFetch("/api/users", {
      method: "POST",
       headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    setName("");
    setEmail("");

    fetchUsers();
  };

   /* DELETE USER */
  const deleteUser = async (id: string) => {
    await apiFetch("/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchUsers();
  };

   /* EDIT USER */
  const startEdit = (user: User) => {
    setEditId(user._id);
    setName(user.name);
    setEmail(user.email);
  };

  /* UPDATE USER */
  const updateUser = async () => {
    await apiFetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editId,
        name,
        email,
      }),
    });

    setEditId(null);
    setName("");
    setEmail("");

    fetchUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>  
      <div>
      <label htmlFor="name">Name:</label> {' '}
      <input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-slate-900 rounded-md p-1"
      />
      </div>
      <div>
      <label htmlFor="email" style={{ marginLeft: "10px" }}>Email:</label> {' '}
      <input
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-slate-900 rounded-md p-1"
      />
      </div>
     {editId ? (
        <button className="cursor-pointer bg-green-500 text-white rounded-md p-1" onClick={updateUser}>Update User</button>
      ) : (
        <button className="cursor-pointer bg-blue-500 text-white rounded-md p-1" onClick={addUser}>Add User</button>
      )}
    </div>
      <hr />

      <h2 className="mt-4">User List</h2>

       <table className="userTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="px-2">{index + 1}</td>
              <td className="px-2">{user.name}</td>
              <td className="px-2">{user.email}</td>
              <td>
                <button className="cursor-pointer" onClick={() => startEdit(user)}>Edit</button>

                <button
                  style={{ marginLeft: "10px", background: "red", color: "white" , padding: "5px", borderRadius: "5px",cursor: "pointer" }}
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
               <button className="cursor-pointer" onClick={() => router.push(`/users/${user._id}`)}
                >View
               </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}