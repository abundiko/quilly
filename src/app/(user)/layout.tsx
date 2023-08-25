"use client"

import {useState, useEffect, useContext} from 'react'
import { LayoutProps } from '../(auth)/signup/layout';
import isLoggedIn from '@/server/auth/isLoggedIn';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/home/Sidebar';
import ModalContextProvider from '@/context/ModalContext';
import { FaBars } from 'react-icons/fa';
import UserContext from '@/context/UserContext';
import getUser from '@/server/auth/getUser';

function UserLayout({children}:LayoutProps) {
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const userContext = useContext(UserContext)
  //close the sidebar when [pathName] changes
  useEffect(()=>{
    if(showSidebar) setShowSidebar(false);
  },[pathName]);

  useEffect(()=>{
    (async ()=>{
      try{
        if(await isLoggedIn()){
          setLoading(false);
          const userDoc = await getUser();
          if(userDoc) userContext.setData({...userDoc});
          else console.error("Unable to get this user");
          
        }else throw new Error("you are not logged in")
      }catch(e){
        router.replace("/login");
      }
    })();
  },[])
  
  return (
    loading ? <></>
    : <ModalContextProvider>
      <aside className={`fixed top-0 h-screen w-full z-40 sm:hidden ${showSidebar ? "left-0" : "-left-[120vw]"}`}>
        <div
          onClick={() => setShowSidebar(!showSidebar)}
           className="w-full h-full app-bg-opacity backdrop-blur-sm app-theme"/>
        <div className="absolute top-0 left-0 h-full w-60 app-theme z-10">
          <Sidebar />
        </div>
      </aside>
      <main className='flex mx-auto md:w-11/12 max-w-[800px] min-h-screen overflow-y-auto'>
      <aside className=" w-0 overflow-hidden sm:w-3/12 md:w-2/12 hidden sm:block border-r app-borders ">
        <Sidebar />
      </aside>
      <section className="w-full  sm:w-9/12 md:w-10/12 relative">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
         className="absolute z-20 app-icon-button left-2 top-1 sm:hidden">
          <FaBars />
        </button>
      {children}
      </section>
    </main>
    </ModalContextProvider>
  )
}

export default UserLayout