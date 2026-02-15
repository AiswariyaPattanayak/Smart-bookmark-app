"use client";

import { createSupabaseBrowser } from "@/lib/supabase/browser";

export default function LoginPage() {
  const supabase = createSupabaseBrowser();

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Smart Bookmark App</h1>
            <p className="mt-1 text-sm text-white/70">
              Save links privately • Realtime sync • Supabase + Next.js
            </p>
          </div>

          <button
            onClick={loginWithGoogle}
            className="w-full rounded-xl bg-white text-black font-semibold py-3 hover:bg-zinc-200 transition"
          >
            Continue with Google
          </button>

          <p className="mt-4 text-xs text-white/60">
            Uses Google OAuth via Supabase. Your bookmarks stay private per user.
          </p>
        </div>
      </div>
    </div>
  );
}