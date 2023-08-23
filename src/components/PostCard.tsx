import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa";

const PostCard = () => {
  return (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <div className="w-fit flex items-center gap-2 py-1 px-3">
          <Image
            src="/img/hero.jpg"
            width={30}
            height={30}
            alt="user name"
            className="rounded-full aspect-square"
          />
          <h6 className="opacity-90 text-md">John Doe</h6>
        </div>
        <button className="app-icon-button">
          <FaEllipsisV />
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <div className="relative w-[35%] rounded-md overflow-hidden aspect-square">
          <Image
            src="/img/hero.jpg"
            layout="fill"
            alt="user name"
            className="rounded-full aspect-square"
          />
        </div>
        <div>
          <h3 className="text-lg font-[600]">Lorem ipsum dolor sit.</h3>
          <p className="opacity-70 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quam
            dolorum similique exercitationem. Sunt quae temporibus ab inventore
            consequatur ipsum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
