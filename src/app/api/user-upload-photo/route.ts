"use server";
import { supabase } from "@/lib/supabase";
import { getUserSessionId } from "@/server/auth/isLoggedIn";
import { connectDB } from "@/server/mongoose/init";
import UserModel, { UserDocument } from "@/server/mongoose/schemas/userSchema";
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

    if (data.get("remove")) {
      let userDoc = await UserModel.findById(_id);
      if (userDoc && userDoc.img && userDoc.img.trim() != "") {
        await supabase.storage.from(BUCKET_NAME).remove([userDoc.img]);
      }
      userDoc = await UserModel.findByIdAndUpdate(
        _id,
        {
          img: ""
        },
        { new: true }
      );
      if (userDoc) {
        return NextResponse.json([
          "success",
          JSON.stringify(
            {
              ...userDoc.toObject(),
              _id: userDoc._id.toString()
            } as UserDocument
          )
        ]);
      }
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
      return NextResponse.json(["error", "supa " + error.message]);
    }
    const filepath = fileData.path;
    //
    await connectDB();
    let userDoc = await UserModel.findById(_id);
    if (userDoc && userDoc.img && userDoc.img.trim() != "") {
      await supabase.storage.from(BUCKET_NAME).remove([userDoc.img]);
    }
    userDoc = await UserModel.findByIdAndUpdate(
      _id,
      { img: fileName },
      { new: true }
    );
    if (userDoc) {
      return NextResponse.json([
        "success",
        JSON.stringify(
          { ...userDoc.toObject(), _id: userDoc._id.toString() } as UserDocument
        )
      ]);
    }
    return NextResponse.json(["error", "connection error"]);
  } catch (e) {
    return NextResponse.json(["error", `an error occurred ${e}`]);
  }
}
