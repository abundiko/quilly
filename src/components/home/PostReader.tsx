"use client";

import { formatImage } from "@/utils/imageHelpers";
import HTMLText from "./HtmlText";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export type PostReaderProps = {
  title: string;
  subtitle: string;
  body: string;
  img: string;
};
export default function PostReader({
  title,
  subtitle,
  body,
  img
}: PostReaderProps) {
  const { scrollY } = useScroll();
  const imgScale = useTransform(scrollY, [0, 200], [1, 1.5]);
  return (
    <section>
      <div className="h-52 relative w-full">
        <motion.div
          style={{
            scale: imgScale
          }}
          className="absolute w-full h-full"
        >
          <Image
            src={formatImage(img)}
            layout="fill"
            alt="Profile Photo"
            className="w-full h-full absolute top-0 left-0 object-cover"
          />
        </motion.div>
        <div className="relative bg-gradient-to-t from-light dim:from-dim dark:from-dark to-transparent h-full w-full flex justify-center items-center py-5 px-6 md:px-10 gap-2 md:gap-5">
          <div className="w-10/12">
            <h1 className="font-bold text-2xl md:text-3xl mt-6 mb-2">
              {title}
            </h1>
            <h2 className="font-[600] text-sm opacity-80">
              {subtitle}
            </h2>
          </div>
        </div>
      </div>

      <div className="editor p-4">
        <HTMLText html={body} />
      </div>
    </section>
  );
}
