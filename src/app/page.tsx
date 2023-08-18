"use client";

import { test } from "@/utils/server-actions";

export default function Home() {
  return (
    <main className="">
      Home Page
      <button onClick={test}>hello</button>
    </main>
  );
}
