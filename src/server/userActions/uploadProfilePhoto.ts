"use server";

export default async function uploadProfilePhoto(formData: FormData) {
  console.log(formData.get("file"));
}
