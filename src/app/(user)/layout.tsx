"use client"

import {useState, useEffect} from 'react'
import { LayoutProps } from '../(auth)/signup/layout';
import isLoggedIn from '@/server/auth/isLoggedIn';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/home/Sidebar';
import ModalContextProvider from '@/context/ModalContext';

function UserLayout({children}:LayoutProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(()=>{
    (async ()=>{
      try{
        if(await isLoggedIn()){
          setLoading(false);
        }else throw new Error("you are not logged in")
      }catch(e){
        router.replace("/login");
      }
    })();
  },[router])
  
  return (
    loading ? <></>
    : <ModalContextProvider>
      <main className='flex mx-auto md:w-10/12 max-w-[800px] min-h-screen overflow-y-auto'>
      <aside className=" w-0 overflow-hidden sm:w-2/12 md:w-3/12 hidden sm:block border-r app-borders ">
        <Sidebar />
      </aside>
      <section className="w-full md:w-9/12 sm:w-10/12">
      {children}
      </section>
    </main>
    </ModalContextProvider>
  )
}

export default UserLayout