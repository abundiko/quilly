"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import AppLoader from "@/components/AppLoader";
import UserCard from "@/components/home/UserCard";
import { PostAuthor } from "@/server/postActions/getPostAuthor";
import getUsers from "@/server/userActions/getUsers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const UsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState<PostAuthor[] | null>(null);

  useEffect(
    () => {
      (async () => {
        try {
          const res = await getUsers();
          if (!res) throw new Error("");
          setUsers(res);
        } catch (e) {
          router.back();
        }
      })();
    },
    [router]
  );

  return (
    <AnimatedPageOpacity>
      <h1 className="page-title">Users</h1>
      <div className="p-4">
        {users
          ? users.length > 0
            ? users.map((item, i) => <UserCard {...item} key={i} />)
            : <div className="flex flex-col items-center justify-center py-20 opacity-40 gap-2">
                <FaInfoCircle className="text-7xl" />
                <h1 className="text-2xl">No Users Yet</h1>
              </div>
          : <div className="flex flex-col items-center justify-center py-20 opacity-40 gap-2">
              <AppLoader
                dotsClass="app-theme-opposite"
                className="w-fit scale-150"
              />
            </div>}
      </div>
    </AnimatedPageOpacity>
  );
};

export default UsersPage;
