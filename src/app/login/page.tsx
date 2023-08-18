import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <main className="h-screen relative bg-slate-900 text-slate-200 w-full">
      <div className="w-full h-full flex items-center">
        <div className="w-0 md:w-6/12 overflow-hidden h-full bg-[url(/img/test.jpg)] bg-cover bg-left-bottom opacity-50" />
        <div className="md:w-6/12 w-full flex items-center justify-center">
          <form
            action=""
            className="border border-[#ffffff11] rounded-lg p-4 w-10/12 lg:w-8/12 shadow-2xl bg-slate-900"
          >
            <div className="flex justify-between items-center">
              <h1 className="font-extrabold text-3xl">Login</h1>
              <Link
                href="/signup"
                className="rounded-3xl app-btn-bordered py-1"
              >
                Sign Up
              </Link>
            </div>
            <h2 className=" font-[600] opacity-80 text-md my-6">
              Lorem ipsum dolor sit amet.
            </h2>
            <input
              className="border rounded-md shadow border-[#ffffff11] px-4 py-2 bg-slate-200 text-black w-full mb-5 outline-[#ffffff55] "
              type="email"
              placeholder="Enter Email Here"
            />
            <input
              className="border rounded-md shadow border-[#ffffff11] px-4 py-2 bg-slate-200 text-black w-full mb-5 outline-[#ffffff55] "
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
  );
};

export default LoginPage;
