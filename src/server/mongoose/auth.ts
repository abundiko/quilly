import { LoginData } from "@/app/(auth)/login/form";
import UserModel, { UserDocument } from "./schemas/userSchema";
import { SignupData } from "@/app/(auth)/signup/page";
import { connectDB } from "./init";

export async function login(userData: LoginData): Promise<boolean> {
  await connectDB();
  let tries = 0;
  while (tries < 3) {
    try {
      const userExists: UserDocument | null = await UserModel.findOne({
        email: userData.email,
        password: userData.password
      });
      console.log(userExists);
      return true ? true : false;
    } catch (e) {
      tries += 1;
    }
  }
  return false;
}

export async function signup(formData: SignupData): Promise<boolean | null> {
  let tries = 0;
  while (tries < 3) {
    try {
      await connectDB();
      const userExists: UserDocument | null = await UserModel.findOne({
        email: formData.email
      });
      console.log(userExists);
      return userExists ? false : true;
    } catch (e) {
      console.log("err", e);
      tries += 1;
    }
  }
  return null;
}

export async function registerUser(
  formData: SignupData & { interests: string[] }
): Promise<boolean | null> {
  let tries = 0;
  while (tries < 3) {
    try {
      await connectDB();
      const newUser: UserDocument | null = new UserModel({
        ...formData,
        favourites: []
      });
      if (newUser) return true;
      return false;
    } catch (e) {
      tries += 1;
    }
  }
  return null;
}
