"use client"

import {AnimatedPageOpacity} from '@/components/AnimatedPage'
import PostCard from '@/components/PostCard'
import React from 'react'

const HomePage = () => {
  return (
    <>
    <AnimatedPageOpacity>
      <div className="flex">

      <div className="w-9/12 relative">
      <h1 className="page-title">Quilly</h1>
      <PostCard />
      <div className="h-screen"></div>
      <div className="h-screen"></div>
      </div>
      <div className="w-3/12 app-borders border-l">
      </div>
      </div>
    </AnimatedPageOpacity>
    </>
  )
}

export default HomePage