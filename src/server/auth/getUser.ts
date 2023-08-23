import UserModel, { UserDocument } from "../mongoose/schemas/userSchema";

export default async function getUser(
  _id: string
): Promise<UserDocument | null> {
  const userDoc: UserDocument | null = await UserModel.findById(_id);
  return userDoc;
}
