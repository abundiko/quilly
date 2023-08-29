"use client";

import AnimatedPage from "@/components/AnimatedPage";
import Counter from "@/components/Counter";

const AboutPage = () => {
  return (
    <AnimatedPage>
      <main className=" pt-20">
        <section className="py-10 relative">
          <div className="container flex px-8 flex-wrap-reverse justify-between mx-auto relative">
            <div className="w-full md:w-6/12">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                About Quilly
              </h1>
              <p className="my-3 opacity-80 text-lg md:pe-24">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                qui dolore, odit libero harum ab veniam tempora facilis nesciunt
                aliquam repudiandae? Expedita, accusamus iure quis blanditiis
                unde a ad voluptates!
              </p>
              <p className="my-3 opacity-80 text-lg md:pe-12 md:ps-12">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                qui dolore, odit libero harum ab veniam tempora facilis nesciunt
                aliquam repudiandae? Expedita, accusamus iure quis blanditiis
                unde a ad voluptates!
              </p>
              <p className="my-3 opacity-80 text-lg md:ps-24">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                qui dolore, odit libero harum ab veniam tempora facilis nesciunt
                aliquam repudiandae? Expedita, accusamus iure quis blanditiis
                unde a ad voluptates!
              </p>
            </div>
            <div className="w-full md:w-6/12 flex flex-wrap p-3">
              {Array.from({
                length: 4
              }).map((_, i) =>
                <div className="w-1/2 p-3" key={i}>
                  <div className="p-2 border app-borders text-center py-8 rounded-md">
                    <h1 className="font-extrabold text-6xl">
                      <Counter end={200} />
                    </h1>
                    <p className="opacity-80 text-lg">Users</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </AnimatedPage>
  );
};

export default AboutPage;


const statsData = [
  {
    title:"Users",
    value:200,
  },
  {
    title:"Users",
    value:200,
  },
  {
    title:"Users",
    value:200,
  },
  {
    title:"Users",
    value:200,
  },
]