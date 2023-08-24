"use client"

import {AnimatedPageOpacity} from '@/components/AnimatedPage'
import { InterestButton } from '@/components/InterestButton'
import PostCard from '@/components/PostCard'
import { dummyPosts } from '@/data/dummyPosts'
import { testInterests } from '@/data/testInterests'
import React from 'react'
import { FaPen } from 'react-icons/fa'

const HomePage = () => {
  return (
    <>
    <AnimatedPageOpacity>
      <div className="flex">

      <div className="w-8/12 relative">
      <h1 className="page-title">Quilly</h1>
      {
        dummyPosts.map((item,i)=>
        <PostCard {...item} key={i} />
        )
      }
      </div>
      <div className="w-4/12 app-borders border-l p-3">
        <div className="flex justify-between items-center ">
        <h6 className="font-[600] opacity-80 text-md">My Tags</h6>
        <button className="app-btn-bordered rounded-full px-3 text-md">
          <FaPen />
        </button>
        </div>
        <div className="flex flex-wrap my-4 gap-1">
          {
            testInterests.map(item=>
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