"use client";

import Head from "next/head";

export type AppHeadProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

export default function AppHead({
  title = "Quilly | Home of well crafted text contents",
  description = "Home of well crafted text contents",
  image = "https://quilly-blog.vercel.app/img/hero-snapshot.png",
  url = "https://quilly-blog.vercel.app"
}: AppHeadProps) {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>
        {title}
      </title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="Quilly Blog" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
