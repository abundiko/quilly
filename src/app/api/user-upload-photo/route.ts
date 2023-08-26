"use server";
import { getUserSessionId } from "@/server/auth/isLoggedIn";
import { connectDB } from "@/server/mongoose/init";
import UserModel, { UserDocument } from "@/server/mongoose/schemas/userSchema";
import { randomUUID } from "crypto";
import { readdirSync, statSync } from "fs";
import { unlink, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json(["error", `${getFoldersInPath("../../")} `]);
  // try {
  //   const data = await req.formData();

  //   const _id = await getUserSessionId();
  //   if (!_id) {
  //     return NextResponse.json(["error", "Invalid User"]);
  //   }

  //   if (data.get("remove")) {
  //     let userDoc = await UserModel.findById(_id);
  //     if (userDoc && userDoc.img && userDoc.img.trim() != "") {
  //       await unlink("./public" + userDoc.img);
  //     }
  //     userDoc = await UserModel.findByIdAndUpdate(
  //       _id,
  //       {
  //         img: ""
  //       },
  //       { new: true }
  //     );
  //     if (userDoc) {
  //       return NextResponse.json([
  //         "success",
  //         JSON.stringify(
  //           {
  //             ...userDoc.toObject(),
  //             _id: userDoc._id.toString()
  //           } as UserDocument
  //         )
  //       ]);
  //     }
  //   }

  //   const file: File | null = (data.get("file") as unknown) as File;

  //   if (!file) return NextResponse.json(["error", "No file selected"]);

  //   const bytes = await file.arrayBuffer();
  //   const buffer = Buffer.from(bytes);
  //   const fileNameSplitted = file.name.split(".");
  //   const fileExtension =
  //     "." + fileNameSplitted[fileNameSplitted.length - 1].toLowerCase();

  //   if (![".png", ".jpg", ".jpeg", ".jfif"].includes(fileExtension))
  //     return NextResponse.json(["error", "Select a png, jpg or jpeg Photo"]);

  //   const randomName = randomUUID();
  //   const path = "../../../public/img/users/" + randomName + fileExtension;
  //   await writeFile(path, buffer);
  //   await connectDB();
  //   let userDoc = await UserModel.findById(_id);
  //   if (userDoc && userDoc.img && userDoc.img.trim() != "") {
  //     await unlink("../../../public" + userDoc.img);
  //   }
  //   userDoc = await UserModel.findByIdAndUpdate(
  //     _id,
  //     { img: path.replace("../../../public", "") },
  //     { new: true }
  //   );
  //   if (userDoc) {
  //     return NextResponse.json([
  //       "success",
  //       JSON.stringify(
  //         { ...userDoc.toObject(), _id: userDoc._id.toString() } as UserDocument
  //       )
  //     ]);
  //   }
  //   return NextResponse.json(["error", "connection error"]);
  // } catch (e) {
  //   return NextResponse.json([
  //     "error",
  //     `${getFoldersInPath("../")} an error occurred ${e}`
  //   ]);
  // }
}

function getFoldersInPath(path: string): string {
  const folders = readdirSync(path)
    .filter(name => statSync(`${path}/${name}`).isDirectory())
    .join(", ");

  return folders;
}
