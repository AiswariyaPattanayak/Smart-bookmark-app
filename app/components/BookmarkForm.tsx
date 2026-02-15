

"use client";
import { useState } from "react";

export default function BookmarkForm({
  onAdd,
}: {
  onAdd: (title: string, url: string) => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="flex flex-col gap-2 w-full max-w-md"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!title.trim() || !url.trim()) return;
        setLoading(true);
        await onAdd(title.trim(), url.trim());
        setTitle("");
        setUrl("");
        setLoading(false);
      }}
    >
      <input
        className="border p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 rounded"
        placeholder="URL (https://...)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        disabled={loading}
        className="bg-blue-600 text-white py-2 rounded disabled:opacity-60"
      >
        {loading ? "Adding..." : "Add Bookmark"}
      </button>
    </form>
  );
}