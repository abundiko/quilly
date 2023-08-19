import React from "react";

const OnboardingSection = () => {
  return (
    <section className=" relative app-theme py-10">
      <div className="app-container">
        <h1 className="font-bold text-3xl md:text-6xl">
          On-Boarding is Pretty Easy
        </h1>
        <p className="opacity-80 text-lg my-4">
          Here are the few easy steps to take on{" "}
          <span className="app-primary-text font-[600]">Quilly </span> to start
          Creating
        </p>
        <div className="w-full ">
          <div className="flex h-fit items-center relative">
            <div className="w-12 flex-shrink-0 flex-grow flex relative items-center h-full">
              <div className="w-[2px] h-full absolute left-1/2 -translate-x-1/2 app-theme-opposite app-bg-opacity" />
              <div className="w-12 text-lg font-bold rounded-full relative app-theme aspect-square shadow app-shadows app-borders border flex justify-center items-center">
                1
              </div>
            </div>
            <div className="w-full flex-shrink flex items-center py-3">
              <div className="w-20 h-[2px] app-theme-opposite app-bg-opacity" />
              <div className="app-theme-opposite p-3 rounded-md app-bg-opacity">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                beatae a ex maxime labore fugiat, veniam minus voluptas corrupti
                esse.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
