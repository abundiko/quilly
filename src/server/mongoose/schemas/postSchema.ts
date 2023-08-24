import { ObjectId } from "mongoose";

export type PostDocument = {
  _id: ObjectId | string;
  title: string;
  intro: string;
  createdAt: Date;
  user: {
    _id: ObjectId | string;
    img: string;
  };
  content: string;
  tags: string[];
  img: string;
  impressions: {
    likes: string[];
    comments: string[];
    views: string[];
  };
};
