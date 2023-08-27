import { supabase } from "@/lib/supabase";

export function formatImage(url: string | null | undefined): string {
  if (url) {
    return url.trim() == "" ? "/img/user.png" : supabaseImage(url);
  }
  return "/img/user.png";
}

export function supabaseImage(filepath: string): string {
  const { data } = supabase.storage.from("images").getPublicUrl(`${filepath}`);
  return data.publicUrl;
}
