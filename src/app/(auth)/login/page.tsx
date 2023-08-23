"use client";
import AnimatedPage from "@/components/AnimatedPage";

import React from "react";
import { Helmet } from "react-helmet";
import LoginForm from "./form";

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
            <LoginForm />
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
};

export default LoginPage;
