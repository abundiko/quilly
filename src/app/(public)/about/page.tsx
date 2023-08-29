"use client";

import AnimatedPage from "@/components/AnimatedPage";
import Counter from "@/components/Counter";

const AboutPage = () => {
  return (
    <AnimatedPage>
      <main className=" pt-20">
        <section className="py-10 relative">
          <div className="container flex px-8 flex-wrap items-center justify-between mx-auto relative">
            <div className="w-full md:w-6/12">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                About Quilly
              </h1>
              <p className="my-3 opacity-80 text-lg md:pe-24">
                Quilly is a dynamic social blogging platform that empowers users
                to share thoughts and stories. With a sleek interface, it
                encourages creativity and engagement.
              </p>
              <p className="my-3 opacity-80 text-lg md:pe-12 md:ps-12">
                Through user-friendly features, Quilly simplifies content
                creation. A range of formatting tools enables expressive posts,
                while interactive comment threads facilitate lively discussions.
              </p>
            </div>
            <div className="w-full md:w-6/12 flex flex-wrap p-3">
              {statsData.map((_, i) =>
                <div className="w-1/2 p-3" key={i}>
                  <div className="p-2 border app-borders text-center py-8 rounded-md">
                    <h1 className="lg:font-extrabold font-bold text-4xl md:text-5xl lg:text-6xl">
                      <Counter end={_.value} />
                    </h1>
                    <p className="opacity-80 text-lg">
                      {_.title}
                    </p>
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
    title: "Users",
    value: 1200
  },
  {
    title: "Blogs",
    value: 330
  },
  {
    title: "Communities",
    value: 100
  },
  {
    title: "Connections",
    value: 2000
  }
];
