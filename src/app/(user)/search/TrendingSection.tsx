import { testInterests } from "@/data/testInterests";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const TrendingSection = () => {
  return (
    <div className="mb-4">
      <h6 className="font-[600] text-sm">Trending Tags</h6>

      <div className="p-2 rounded-md light-bg mt-1">
        {["Gaming", "Technology", "Sports", "Politics", "Health"].map(item =>
          <div
            key={item}
            className="flex w-full bg-transparent py-1 justify-between items-center"
          >
            <Link
              href={`/search/${item}`}
              className="text-sm py-1 hover:underline"
            >
              {item}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingSection;

const dummyHistory = [
  "Hello world",
  "Learn Java in 30 seconds",
  "Become a millionaire with just html",
  "John Doe"
];
