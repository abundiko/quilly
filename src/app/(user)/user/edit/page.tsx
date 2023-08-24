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
            <Link href="/user/edit/profile" className="text-md font-[600] py-2">
              Profile Settings
            </Link>
          </div>
        </div>
      </main>
    </AnimatedPageOpacity>
  );
};

export default EditUserPage;
