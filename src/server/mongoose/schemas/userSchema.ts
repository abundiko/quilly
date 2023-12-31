import mongoose from "mongoose";

export type UserDocument =  {
  _id?:string;
  email: string;
  password: string;
  username: string;
  full_name: string;
  createdAt?: string;
  interests: string[],
  favourites: string[],
  bio:string;
  monthly_readers:number;
  img:string;
  [key: string]: string[] | string |number| undefined;
};

let UserModel = mongoose.Model<UserDocument>;

if (mongoose.models.User) {
  UserModel = mongoose.models.User;
} else {
  const userSchema = new mongoose.Schema({
    full_name: {
      type: String,
      required: true,
      maxlength: 50
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    interests: {
      type: [String],
      default: [],
    },
    favourites: {
      type: [String],
      default: [],
    },
    img:{
      type:String,
      default:""
    },
    bio:{
      type:String,
      default:"",
    },
    monthly_readers:{
      type:Number,
      default:0
    }
  }, { collection: "users" });
  UserModel = mongoose.connection.useDb('quilly').model("User", userSchema, "users");
}

export default UserModel;
