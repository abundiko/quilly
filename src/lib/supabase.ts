import dotenv from "dotenv";
dotenv.config();
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || "";
const key = process.env.SUPABASE_ANON_KEY || "";

export const supabase = createClient(
  "https://qkpmyljleclxdbfzafat.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrcG15bGpsZWNseGRiZnphZmF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxNTM1NTIsImV4cCI6MjAwODcyOTU1Mn0.CVrPQiGh4D831z89FZu-RXM0t2oHH5LF-68B6T6y-nQ",
  {
    auth: { persistSession: false }
  }
);
