"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import Link from "next/link";

const EditUserPage = () => {
  return (
    <AnimatedPageOpacity>
      <main className="border-r app-borders">
        <h1 className="page-title">Edit Profile</h1>
        <div className="p-4">
          <div className="border app-borders light-bg rounded-lg p-3">
            {editProfileOptions.map(item =>
              <Link
                key={item.path}
                href={`/user/edit/${item.path}`}
                className="text-md font-[600] py-2 w-full flex items-center justify-between"
              >
                {item.title}
              </Link>
            )}
          </div>
        </div>
      </main>
    </AnimatedPageOpacity>
  );
};

export default EditUserPage;

const editProfileOptions = [
  {
    title: "Profile Settings",
    path: "profile"
  },
  {
    title: "Change Photo",
    path: "photo"
  },
  {
    title: "My Interests",
    path: "interests"
  },
  {
    title: "Change Password",
    path: "password"
  }
];
