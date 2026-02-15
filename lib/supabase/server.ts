import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServer() {
  // Next 15/16: cookies() can be async in many setups
  const cookieStore = await cookies();
  const store: any = cookieStore;

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Supabase expects these in SSR mode
        getAll() {
          return store.getAll?.() ?? [];
        },
        setAll(cookiesToSet: any[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              // Some Next versions: set(name, value, options)
              // Others: set({ name, value, ...options })
              try {
                store.set(name, value, options);
              } catch {
                store.set({ name, value, ...options });
              }
            } catch {
              // ignore if running in a server component that can't set
            }
          });
        },
      },
    }
  );
}