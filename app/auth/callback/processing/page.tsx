"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Callback() {
  useEffect(() => {
    supabase.auth.getSession().then(() => {
      window.location.href = "/";
    });
  }, []);

  return <p>Logging you in...</p>;
}