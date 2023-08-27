"use server";
import { supabase } from "@/lib/supabase";
import { getUserSessionId } from "@/server/auth/isLoggedIn";
import { BUCKET_NAME } from "@/utils/constants";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.formData();

    const _id = await getUserSessionId();
    if (!_id) {
      return NextResponse.json(["error", "Invalid User"]);
    }

    const file: File | null = (data.get("file") as unknown) as File;

    if (!file) return NextResponse.json(["error", "No file selected"]);

    const fileNameSplitted = file.name.split(".");
    const fileExtension =
      "." + fileNameSplitted[fileNameSplitted.length - 1].toLowerCase();

    if (![".png", ".jpg", ".jpeg", ".jfif"].includes(fileExtension))
      return NextResponse.json(["error", "Select a png, jpg or jpeg Photo"]);

    const randomName = randomUUID();
    const fileName = randomName + fileExtension;
    //
    const { data: fileData, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false
      });

    if (error) {
      return NextResponse.json(["error", "failed to upload image"]);
    }
    //
    return NextResponse.json(["success", fileName]);
  } catch (e) {
    return NextResponse.json(["error", `an error occurred ${e}`]);
  }
}
