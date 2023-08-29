"use client"

import {AnimatedPageOpacity} from '@/components/AnimatedPage'
import { InterestButton } from '@/components/InterestButton'
import PostCard from '@/components/PostCard'
import UserContext from '@/context/UserContext'
import { PostDocument } from '@/server/mongoose/schemas/postSchema'
import {searchPosts} from '@/server/postActions/getPosts'
import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaPen } from 'react-icons/fa'

const HomePage = () => {
  const [posts, setPosts] = useState<PostDocument[]|null>(null);
  const userContext = useContext(UserContext);
  const fetchCount = 4;

  useEffect(()=>{
    fetchPosts();
  },[userContext.data?.interests])
  
  const fetchPosts = async()=>{
      let fetched = false;
      while(!fetched){
        try {
          const postDoc = await searchPosts("",{
            filter:userContext.data?.interests,
            limit:fetchCount,
            skip:posts?.length
          });
          if(postDoc){
            fetched = true;
            setPosts([...posts??[],...postDoc]);
          } 
        } catch (e) {
          continue;
        }
      }
    }
  
  return (
    <>
    <AnimatedPageOpacity>
      <div className="flex">

      <div className="w-full md:w-8/12 relative">
      <h1 className="page-title">Quilly</h1>
      {posts &&
        posts.map((item,i)=>
        <PostCard {...item} key={i}
          onViewportEnter={()=>{
            if((i%fetchCount) == 0){
    fetchPosts();
            }
          }}
         />
        )
      }
      <div className="py-20"></div>
      </div>
      <div className="hidden md:block w-4/12 app-borders border-l p-3">
        <div className="flex justify-between items-center ">
        <h6 className="font-[600] opacity-80 text-md">My Interests</h6>
        <Link href="/user/edit/interests" className="app-btn-bordered rounded-full px-3 text-md">
          <FaPen />
        </Link>
        </div>
        <div className="flex flex-wrap my-4 gap-1">
          {
            userContext.data?.interests.map(item=>
              <InterestButton
                    key={item}
                    title={item}
                    onClick={() => null}
                  />
              )
          }
        </div>
      </div>
      </div>
    </AnimatedPageOpacity>
    </>
  )
}

export default HomePage