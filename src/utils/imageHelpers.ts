import { supabase } from "@/lib/supabase";
import { BUCKET_NAME } from "./constants";

export function formatImage(url: string | null | undefined): string {
  if (url) {
    return url.trim() == "" ? "/img/user.png" : supabaseImage(url);
  }
  return "/img/user.png";
}

export function supabaseImage(filepath: string): string {
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filepath);
  console.log(data.publicUrl);

  return data.publicUrl;
}
