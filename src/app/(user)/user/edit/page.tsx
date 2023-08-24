"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";

const EditUserPage = () => {
  return (
    <AnimatedPageOpacity>
      <main className="border-r app-borders">
        <h1 className="page-title">Edit Profile</h1>
        <div className="p-4">
          <div className="border app-borders light-bg rounded-lg p-3 md:w-8/12">
            <h6 className="text-md font-[600] mb-2">Profile Settings</h6>
          </div>
        </div>
      </main>
    </AnimatedPageOpacity>
  );
};

export default EditUserPage;
