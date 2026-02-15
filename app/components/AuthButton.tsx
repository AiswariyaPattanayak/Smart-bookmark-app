"use client";

import { createSupabaseBrowser } from "@/lib/supabase/browser";

export default function AuthButton({ loggedIn }: { loggedIn: boolean }) {
  const supabase = createSupabaseBrowser();

  const login = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) alert(error.message);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
  };

  return (
    <button
      onClick={loggedIn ? logout : login}
      className="px-4 py-2 rounded bg-white text-black"
    >
      {loggedIn ? "Logout" : "Login with Google"}
    </button>
  );
}