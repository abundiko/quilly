"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import PostCard from "@/components/PostCard";
import UserContext from "@/context/UserContext";
import { dummyPosts } from "@/data/dummyPosts";
import { formatDateString } from "@/utils/formateDate";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { FaBook, FaCalendar, FaPen } from "react-icons/fa";

const Page = () => {
  const userContext = useContext(UserContext);
  return (
    <AnimatedPageOpacity>
      <section className="">
        <div className="h-52 relative w-full">
          <Image
            src="/img/hero.jpg"
            layout="fill"
            alt=""
            className="w-full h-full absolute top-0 left-0"
          />
          <div className="relative bg-gradient-to-t from-light dim:from-dim dark:from-dark to-transparent h-full w-full flex items-center py-5 px-6 md:px-10 gap-2 md:gap-5">
            <div className="w-3/12 aspect-square rounded-full app-shadows shadow-lg relative overflow-hidden">
              <Image
                src="/img/hero.jpg"
                layout="fill"
                alt=""
                className="w-full h-full absolute top-0 left-0 object-cover"
              />
            </div>
            <div className="w-9/12">
              <h1 className="font-bold text-2xl md:text-3xl mt-6 mb-2">
                {userContext.data?.full_name}
              </h1>
              <h2 className="font-[600] text-md opacity-80">@{userContext.data?.username}</h2>
            </div>
            <Link
              href="/user/edit"
              className="app-btn-bordered flex rounded-3xl absolute bottom-2 right-2 py-2 gap-2 items-center text-sm"
            >
              <FaPen />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-3 flex gap-3">
            <p className="text-sm font-[600] flex items-center opacity-80 gap-2">
              <FaBook /> <span> {userContext.data?.monthly_readers} Monthly readers</span>
            </p>
            <p className="text-sm font-[600] flex items-center opacity-80 gap-2">
              <FaCalendar /> <span> Joined {formatDateString(userContext.data?.createdAt!)}</span>
            </p>
          </div>
          <div className="p-2 rounded-md border app-borders mb-4 light-bg">
            <p className="opacity-80 text-md">
              {userContext.data?.bio}
            </p>
          </div>
          <div className="md:w-10/12">
            <h2 className="font-bold text-xl border-b app-borders w-full py-2 mb-2">
              Posts
            </h2>
            {dummyPosts.map((item, i) => <PostCard {...item} key={i} />)}
          </div>
        </div>
      </section>
    </AnimatedPageOpacity>
  );
};

export default Page;
