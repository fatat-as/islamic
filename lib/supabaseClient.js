import { createClient } from "@supabase/supabase-js";

// These come from your Supabase project settings (Project Settings > API)
// Stored as environment variables — never hardcode them here.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
