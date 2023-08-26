"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import AppLoader from "@/components/AppLoader";
import PostCard from "@/components/PostCard";
import ProfilePhotoModal from "@/components/modals/ProfilePhotoModal";
import { ModalContext } from "@/context/ModalContext";
import UserContext from "@/context/UserContext";
import { dummyPosts } from "@/data/dummyPosts";
import { UserDocument } from "@/server/mongoose/schemas/userSchema";
import getUser, { getUserByUsername } from "@/server/userActions/getUser";
import updateFavourites from "@/server/userActions/updateFavourites";
import { formatDateString } from "@/utils/formateDate";
import { formatImage } from "@/utils/imageHelpers";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState, } from "react";
import { FaBook, FaCalendar,  } from "react-icons/fa";
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';



const Page = () => {
  const [userData, setUserData] = useState<UserDocument|null>(null);
  const [loadingFavourite, setLoadingFavourite] = useState<boolean>(false);
  const modalContext = useContext(ModalContext);
  const userContext = useContext(UserContext);
  const {user} = useParams();
  const router = useRouter();

  useEffect(()=>{
    if(!user) return router.back();
    (async ()=>{
      try {
        const userDoc = await getUserByUsername(user.toString());
        if(userDoc) setUserData(userDoc)
        else router.back();
      } catch (e) {
      console.error(e);
      router.back();
    }
  })();
  },[router, user])

  useEffect(()=>{
    if(user && user == userContext.data?.username) return router.replace('/user');
  },[userContext.data, router, user])

  function updateFavourite(add:boolean) {
    setLoadingFavourite(true);
    (async ()=>{
      try {
        const res = await updateFavourites(userData?._id as string, add);
        if(res){
          let userDoc = await getUser();
        if(userDoc) userContext.setData(userDoc);
          userDoc = await getUserByUsername(user.toString());
        if(userDoc) setUserData(userDoc)
        }
      } catch (e) {
      }
      setLoadingFavourite(false)
    })();
  }
  
  if(!user) router.back();
  else return (
    !userData || !userContext || !userContext.data ? <></>
    :<AnimatedPageOpacity>
      <section className="">
        <div className="h-52 relative w-full">
          <Image
                src={formatImage(userData?.img)}
            layout="fill"
            alt="Profile Photo"
            className="w-full h-full absolute top-0 left-0 object-cover"
          />
          <div className="relative bg-gradient-to-t from-light dim:from-dim dark:from-dark to-transparent h-full w-full flex items-center py-5 px-6 md:px-10 gap-2 md:gap-5">
            <div className="w-3/12 aspect-square rounded-full app-shadows shadow-lg relative overflow-hidden">
              <Image
                onClick={()=>modalContext.setModal(<ProfilePhotoModal full_name="Me" img={userData?.img} />)}
                src={formatImage(userData?.img)}
                layout="fill"
                alt="Profile Photo"
                className="w-full h-full absolute top-0 left-0 object-cover cursor-pointer"
              />
            </div>
            <div className="w-9/12">
              <h1 className="font-bold text-2xl md:text-3xl mt-6 mb-2">
                {userData?.full_name}
              </h1>
              <h2 className="font-[600] text-md opacity-80">@{userData?.username}</h2>
            </div>
            {
              !userContext.data.favourites.includes(userData._id as string) ?
              <button
              onClick={()=>updateFavourite(true)}
              className="app-btn-bordered app-bg-opposite app-bg-opacity app-text-success disabled:opacity-50 disabled:pointer-events-none flex rounded-3xl absolute bottom-2 right-2 py-2 gap-2 items-center text-sm"
              disabled={loadingFavourite}
            >{
              !loadingFavourite ?
              <>
              <TiHeartFullOutline />
              <span>Favourite</span>
              </> : <AppLoader />
            }
            </button>
            :
              <button
              onClick={()=>updateFavourite(false)}
              className="app-btn-bordered disabled:opacity-50 app-bg-opposite app-bg-opacity app-text-error disabled:pointer-events-none flex rounded-3xl absolute bottom-2 right-2 py-2 gap-2 items-center text-sm"
              disabled={loadingFavourite}
            >{
              !loadingFavourite ?
              <>
              <TiHeartOutline />
              <span>UnFavourite</span>
              </> : <AppLoader />
            }
            </button>
            }
          </div>
        </div>

        <div className="p-4">
          <div className="mb-3 flex gap-3">
            <p className="text-sm font-[600] flex items-center opacity-80 gap-2">
              <FaBook /> <span> {userData?.monthly_readers} Monthly readers</span>
            </p>
            <p className="text-sm font-[600] flex items-center opacity-80 gap-2">
              <FaCalendar /> <span> Joined {formatDateString(userData?.createdAt!)}</span>
            </p>
          </div>
          <div className="p-2 rounded-md border app-borders mb-4 light-bg">
            <p className="opacity-80 text-md whitespace-pre-line">
              {userData?.bio}
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
