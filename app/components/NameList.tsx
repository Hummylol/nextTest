"use client";

import { useState, useEffect } from "react";

export default function NameList() {
  const [names, setNames] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await fetch("/api/get-names");
        const data = await res.json();

        if (res.ok) {
          setNames(data.data || []);
        } else {
          setError(data.error || "Failed to fetch names.");
        }
      } catch (err) {
        setError("An error occurred while fetching names.");
      }
    };

    fetchNames();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">List of Names</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : names.length > 0 ? (
        <ul className="list-disc list-inside">
          {names.map((name) => (
            <li key={name.id} className="text-lg text-gray-700">
              {name.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No names found.</p>
      )}
    </div>
  );
}
