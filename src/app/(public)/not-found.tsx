import Link from "next/link";

const NotFound = () => {
  return (
    <main className="pt-20">
      <div className="py-10 text-center">
        <h1 className="text-4xl opacity-70 mb-4">You Seem Lost</h1>
        <h3 className="text-primary-light font-bold text-lg">Page Not Found</h3>
        <div className="my-3">
          <Link href="/" className="app-nav-link ">
            Go Back Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
