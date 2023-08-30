"use client";
import AnimatedPage from "@/components/AnimatedPage";

import React from "react";
import LoginForm from "./form";
import AppHead from "@/components/AppHead";

const LoginPage = () => {
  return (
    <AnimatedPage>
      <AppHead
        title="Quilly | Login"
        description="Login to the best blog site"
      />
      <main className="h-screen relative w-full">
        <div className="w-full h-full flex items-center">
          <div className="w-0 md:w-6/12 overflow-hidden h-full bg-[url(/img/test.jpg)] bg-cover bg-left-bottom opacity-50" />
          <div className="md:w-6/12 w-full flex items-center justify-center">
            <LoginForm />
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
};

export default LoginPage;
