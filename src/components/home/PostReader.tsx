"use client";

import { formatImage } from "@/utils/imageHelpers";
import HTMLText from "./HtmlText";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { InterestButton } from "../InterestButton";
import { useRouter } from "next/navigation";

export type PostReaderProps = {
  title: string;
  subtitle: string;
  body: string;
  img: string;
  tags?: string[];
  localImg?: boolean;
};
export default function PostReader({
  title,
  subtitle,
  body,
  img,
  tags,
  localImg = false
}: PostReaderProps) {
  const router = useRouter();
  const { scrollY } = useScroll();
  const imgScale = useTransform(scrollY, [0, 200], [1, 1.5]);
  return (
    <section>
      <div className="h-52 relative w-full overflow-hidden">
        <motion.div
          style={{
            scale: imgScale
          }}
          className="absolute w-full h-full overflow-hidden"
        >
          <Image
            src={localImg ? img : formatImage(img)}
            layout="fill"
            alt="Post Photo"
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
      {tags &&
        <div className="p-4 pb-0 flex gap-2 overflow-x-auto">
          {tags.map(tag =>
            <InterestButton
              key={tag}
              title={tag}
              onClick={() => router.push(`/search/tag:${tag}`)}
            />
          )}
        </div>}
      <div className="editor p-4 pb-40">
        <HTMLText html={body} />
      </div>
    </section>
  );
}
