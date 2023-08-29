"use client";

import AnimatedPage from "@/components/AnimatedPage";

const AboutPage = () => {
  return (
    <AnimatedPage>
      <main className=" pt-20">
        <section className="py-10 ">
          <div className="container flex px-8 flex-wrap justify-between mx-auto">
            <div className="w-fill md:w-6/12">
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
            <div className="w-fill md:w-6/12" />
          </div>
        </section>
      </main>
    </AnimatedPage>
  );
};

export default AboutPage;
