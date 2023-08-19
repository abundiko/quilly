"use client";
import AnimatedPage from "@/components/AnimatedPage";
import Link from "next/link";
import React from "react";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  return (
    <AnimatedPage>
      <Helmet>
        <title>Quilly | Sign in</title>
      </Helmet>
      <main className="h-screen relative w-full">
        <div className="w-full h-full flex items-center">
          <div className="w-0 md:w-6/12 overflow-hidden h-full bg-[url(/img/test.jpg)] bg-cover bg-left-bottom opacity-50" />
          <div className="md:w-6/12 w-full flex items-center justify-center">
            <form
              action=""
              className="app-theme app-shadows app-borders border rounded-lg p-4 w-10/12 lg:w-8/12 shadow-2xl bg-inherit"
            >
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-3xl">Login</h1>
                <Link
                  href="/signup"
                  className="rounded-3xl app-btn-bordered py-1"
                >
                  Sign Up
                </Link>
              </div>
              <h2 className="  opacity-80 text-md my-6">
                Sign in to view and create.
              </h2>
              <input
                className="app-text-field"
                type="email"
                placeholder="Enter Email Here"
              />
              <input
                className="app-text-field"
                type="password"
                placeholder="Enter Password Here"
              />
              <input
                className="app-btn w-full mb-5"
                type="submit"
                value="LogIn"
              />
            </form>
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
};

export default LoginPage;
