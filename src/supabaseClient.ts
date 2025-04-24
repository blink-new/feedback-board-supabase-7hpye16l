
import { createClient } from '@supabase/supabase-js';

// Vite exposes only VITE_ prefixed env vars to the client
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.SUPABASE_URL ||
  "";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  "";

if (!supabaseUrl || !supabaseAnonKey) {
  // Show a beautiful error in the UI and console
  const style = [
    "background: #f472b6",
    "color: white",
    "font-size: 16px",
    "padding: 8px 16px",
    "border-radius: 6px",
    "font-weight: bold",
  ].join(";");
  // eslint-disable-next-line no-console
  console.error(
    "%c[Feedback Board] Missing Supabase environment variables!\n\n" +
      "Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your project secrets.",
    style
  );
  throw new Error(
    "[Feedback Board] Missing Supabase environment variables! Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your project secrets."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);