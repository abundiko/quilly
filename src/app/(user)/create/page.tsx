"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";

const CreatePage = () => {
  return (
    <AnimatedPageOpacity>
      <h1 className="page-title">Create Post</h1>
      <div className="editor text-text-dark" />
    </AnimatedPageOpacity>
  );
};

export default CreatePage;
