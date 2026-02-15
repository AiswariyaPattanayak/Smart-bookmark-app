"use client";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  created_at: string;
};

export default function BookmarkList({
  bookmarks,
  onDelete,
}: {
  bookmarks: Bookmark[];
  onDelete: (id: string) => Promise<void>;
}) {
  return (
    <div className="w-full max-w-md mt-4 space-y-2">
      {bookmarks.map((b) => (
        <div
          key={b.id}
          className="bg-white/5 border border-white/10 rounded p-3 flex justify-between gap-3"
        >
          <div className="min-w-0">
            <div className="font-semibold truncate">{b.title}</div>
            <a className="text-blue-400 underline break-all" href={b.url} target="_blank">
              {b.url}
            </a>
          </div>

          <button
            onClick={() => onDelete(b.id)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}

      {bookmarks.length === 0 && (
        <p className="text-gray-400">No bookmarks yet.</p>
      )}
    </div>
  );
}