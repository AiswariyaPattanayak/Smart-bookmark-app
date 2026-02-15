"use client";

import { useEffect, useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/browser";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  created_at: string;
};

export default function Home() {
  const [supabase] = useState(() => createSupabaseBrowser());

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    const { data: userData } = await supabase.auth.getUser();
    setUserEmail(userData.user?.email ?? null);

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setBookmarks(data as Bookmark[]);
  };

  // 🔔 notify other tabs when something changes
  const notifyTabs = () => {
    try {
      const bc = new BroadcastChannel("bookmarks_sync");
      bc.postMessage("update");
      bc.close();
    } catch {
      localStorage.setItem("bookmarks_sync", Date.now().toString());
    }
  };

  useEffect(() => {
    load();

    // 👇 listen for updates from other tabs
    let bc: BroadcastChannel | null = null;

    try {
      bc = new BroadcastChannel("bookmarks_sync");
      bc.onmessage = () => load();
    } catch {
      const onStorage = (e: StorageEvent) => {
        if (e.key === "bookmarks_sync") load();
      };
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    }

    return () => {
      if (bc) bc.close();
    };
  }, []);

  const addBookmark = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;

    if (!title.trim() || !url.trim()) return alert("Title and URL required");

    const { error } = await supabase.from("bookmarks").insert({
      user_id: user.id,
      title,
      url,
    });

    if (error) return alert(error.message);

    setTitle("");
    setUrl("");
    load();
    notifyTabs(); 
  };

  const deleteBookmark = async (id: string) => {
    const { error } = await supabase.from("bookmarks").delete().eq("id", id);
    if (error) return alert(error.message);
    load();
    notifyTabs(); 
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };


  if (!userEmail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-xl">
          <h1 className="text-2xl font-bold">Smart Bookmark App</h1>
          <p className="mt-2 text-sm text-white/70">Not logged in</p>

          <a
            href="/login"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white text-black font-semibold py-3 hover:bg-zinc-200 transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white p-6">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Smart Bookmark App</h1>
            <p className="mt-1 text-sm text-white/70">Logged in as {userEmail}</p>
          </div>

          <button
            onClick={logout}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
          >
            Logout
          </button>
        </div>

        {/* Add Bookmark */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-xl mb-6">
          <h2 className="font-semibold mb-4">Add Bookmark</h2>

          <div className="grid gap-3">
            <input
              placeholder="Title (e.g., YouTube)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20"
            />

            <input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-white/20"
            />

            <button
              onClick={addBookmark}
              className="rounded-xl bg-white text-black font-semibold py-3 hover:bg-zinc-200 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Bookmarks */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Your Bookmarks</h2>
            <span className="text-xs text-white/60">{bookmarks.length} items</span>
          </div>

          {bookmarks.length === 0 ? (
            <p className="text-sm text-white/70">No bookmarks yet</p>
          ) : (
            <div className="grid gap-3">
              {bookmarks.map((b) => (
                <div
                  key={b.id}
                  className="rounded-xl border border-white/10 bg-black/20 p-4 flex items-center justify-between gap-4 hover:bg-black/30 transition"
                >
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{b.title}</p>
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-white/70 hover:text-white underline underline-offset-4 truncate block"
                    >
                      {b.url}
                    </a>
                    <p className="mt-1 text-xs text-white/50">
                      {new Date(b.created_at).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteBookmark(b.id)}
                    className="shrink-0 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm hover:bg-red-500/20 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* (kept) editingId state untouched */}
        <div className="hidden">{editingId}</div>
      </div>
    </div>
  );
}