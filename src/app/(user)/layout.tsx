"use client"

import {useState, useEffect} from 'react'
import { LayoutProps } from '../(auth)/signup/layout';
import isLoggedIn from '@/server/auth/isLoggedIn';
import { useRouter } from 'next/navigation';

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
    // setLoading(false);
  },[])
  
  return (
    loading ? <></>
    : <main>
      {children}
    </main>
  )
}

export default UserLayout