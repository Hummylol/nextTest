// app/components/NameForm.tsx
"use client";

import { useState } from "react";

export default function NameForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/save-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setName("");
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("An error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}
