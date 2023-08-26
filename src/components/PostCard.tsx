import Image from "next/image";
import { FaEllipsisV, FaEye, FaThumbsUp } from "react-icons/fa";
import { BiCircle, BiComment, BiRadioCircle } from "react-icons/bi";
import Link from "next/link";
import { PostDocument } from "@/server/mongoose/schemas/postSchema";
import formatDate from "@/utils/formateDate";

const PostCard = ({
  title,
  intro,
  createdAt,
  user,
  img,
  impressions
}: PostDocument) => {
  return (
    <div className="my-1  py-2 px-3 group cursor-pointer app-borders border-b">
      <div className="flex justify-between mb-1">
        <div className="w-fit flex items-center gap-1">
          <Link href={`/users/${user._id}`} className="flex gap-2 items-center">
            <Image
              src={user.img}
              width={30}
              height={30}
              alt="user name"
              className="rounded-full aspect-square"
            />
            <h6 className="opacity-90 text-sm font-[600]">
              {user._id.toString()}
            </h6>
          </Link>
          <BiRadioCircle className="scale-50" />
          <span className="opacity-60 text-xs">
            {formatDate(createdAt)}
          </span>
        </div>
        <button className="app-icon-button text-sm">
          <FaEllipsisV />
        </button>
      </div>
      <Link
        href={`/user/${user._id}/${title}`}
        className="flex gap-2 items-center"
      >
        <div className="relative min-w-[30%] w-[30%] rounded-md overflow-hidden aspect-square">
          <Image
            src={img}
            layout="fill"
            alt={title}
            className="rounded aspect-square group-hover:scale-110"
          />
        </div>
        <div className="w-[68%] max-w-[68%]">
          <h3 className="text-lg font-bold">
            {title}
          </h3>
          <p className="opacity-70 text-sm  ">
            {intro}
          </p>
          <div className="flex justify-between mt-1 opacity-80">
            <div className="flex gap-1 text-sm items-center">
              <FaEye />
              <span className="opacity-60">
                {impressions.views.length}
              </span>
            </div>
            <div className="flex gap-1 text-sm items-center">
              <FaThumbsUp />
              <span className="opacity-60">
                {impressions.likes.length}
              </span>
            </div>
            <div className="flex gap-1 text-sm items-center">
              <BiComment />
              <span className="opacity-60">
                {impressions.comments.length}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
