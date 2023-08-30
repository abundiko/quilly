import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="pt-20">
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h1 className=" text-3xl">
            Developed By{" "}
            <a
              className="text-primary-dark dark:text-primary-light dim:text-primary-light hover:underline"
              href="https://abundiko.netlify.app"
            >
              Abundance Ken-Dickson
            </a>
          </h1>
          <div className="flex py-10 gap-3 justify-center items-center">
            <a
              className="text-3xl flex items-center justify-center rounded-md boder app-borders h-20 aspect-square hover:text-primary-dark dark:hover:text-primary-light dim:hover:text-primary-light hover:underline"
              href="https://github.com/abundiko"
            >
              <FaGithub />
            </a>
            <a
              className="text-3xl flex items-center justify-center rounded-md boder app-borders h-20 aspect-square hover:text-primary-dark dark:hover:text-primary-light dim:hover:text-primary-light hover:underline"
              href="https://twitter.com/abundiko"
            >
              <FaTwitter />
            </a>
            <a
              className="text-3xl flex items-center justify-center rounded-md boder app-borders h-20 aspect-square hover:text-primary-dark dark:hover:text-primary-light dim:hover:text-primary-light hover:underline"
              href="https://www.linkedin.com/in/abundiko"
            >
              <FaLinkedin />
            </a>
            <a
              className="text-3xl flex items-center justify-center rounded-md boder app-borders h-20 aspect-square hover:text-primary-dark dark:hover:text-primary-light dim:hover:text-primary-light hover:underline"
              href="https://www.facebook.com/abundiko"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
