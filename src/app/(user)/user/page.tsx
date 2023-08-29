"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import AppLoader from "@/components/AppLoader";
import PostCard from "@/components/PostCard";
import ProfilePhotoModal from "@/components/modals/ProfilePhotoModal";
import { ModalContext } from "@/context/ModalContext";
import UserContext from "@/context/UserContext";
import { PostDocument } from "@/server/mongoose/schemas/postSchema";
import getUserPosts from "@/server/postActions/getPosts";
import { formatDateString } from "@/utils/formateDate";
import { formatImage } from "@/utils/imageHelpers";
import Image from "next/image";
import Link from "next/link";
import { countUsersWithFavourite } from "@/server/userActions/getFavourites"
import React, { useContext, useEffect, useState } from "react";
import { FaBook, FaCalendar, FaHeart, FaInfoCircle, FaPen } from "react-icons/fa";
import formatNumbers from "@/utils/formatNumbers";

const Page = () => {
  const userContext = useContext(UserContext);
  const modalContext = useContext(ModalContext);
  const [posts, setPosts] = useState<PostDocument[]|null>(null);
  const [favourites, setFavourites] = useState<number|null>(null);
  
  useEffect(()=>{
    (async()=>{
      let fetched = false;
      while(!fetched){
        try {
          const postDoc = await getUserPosts(userContext.data?._id as string);
          const res = await countUsersWithFavourite(userContext.data?._id as string);
          if(postDoc){
            fetched = true;
            setFavourites(res);
            setPosts(postDoc);
          } 
        } catch (e) {
          continue;
        }
      }
    })();
  },[userContext.data?._id])
  
  return (
    <AnimatedPageOpacity>
      <section className="">
        <div className="h-52 relative w-full overflow-hidden">
          <Image
                src={formatImage(userContext.data?.img)}
            layout="fill"
            alt="Profile Photo"
            className="w-full h-full absolute top-0 left-0 object-cover blur-md"
          />
          <div className="relative bg-gradient-to-t from-light dim:from-dim dark:from-dark to-transparent h-full w-full flex items-center py-5 px-6 md:px-10 gap-2 md:gap-5">
            <div className="w-3/12 aspect-square rounded-full app-shadows shadow-lg relative overflow-hidden">
              <Image
                onClick={()=>modalContext.setModal(<ProfilePhotoModal full_name="Me" img={userContext.data?.img} />)}
                src={formatImage(userContext.data?.img)}
                layout="fill"
                alt="Profile Photo"
                className="w-full h-full absolute top-0 left-0 object-cover cursor-pointer"
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
          <div className="mb-1 flex gap-3">
            <p className="text-sm font-[600] flex items-center opacity-80 gap-2">
              <FaBook /> <span> {formatNumbers(userContext.data?.monthly_readers)} readers</span>
            </p>
            <p className="text-sm font-[600] flex items-center opacity-80 gap-2">
              <FaHeart /> <span> {formatNumbers(favourites)} Favourites</span>
            </p>
            <br />
          </div>
            <p className="text-sm mb-3 font-[600] flex items-center opacity-80 gap-2">
              <FaCalendar /> <span> Joined {formatDateString(userContext.data?.createdAt!)}</span>
            </p>
          <div className="p-2 rounded-md border app-borders mb-4 light-bg">
            <p className="opacity-80 text-md whitespace-pre-line">
              {userContext.data?.bio}
            </p>
          </div>
          <div className="md:w-10/12">
            <h2 className="font-bold text-xl border-b app-borders w-full py-2 mb-2">
              Posts
              &nbsp;
              <span className="opacity-80 text-sm">({posts && posts.length})</span>
            </h2>
            {posts ? posts.length > 0 ? posts.map((item, i) => <PostCard {...item} key={i} />) : 
        <div className="flex flex-col items-center justify-center py-20 opacity-40 gap-2">
          <FaInfoCircle className="text-7xl" />
          <h1 className="text-2xl">No Posts Yet</h1>
          </div> : <div className="flex flex-col items-center justify-center py-20 opacity-40 gap-2">
          <AppLoader dotsClass="app-theme-opposite" className="w-fit scale-150"/>
          </div>}
          </div>
        </div>
      </section>
    </AnimatedPageOpacity>
  );
};

export default Page;
