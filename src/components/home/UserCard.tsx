import { PostAuthor } from "@/server/postActions/getPostAuthor";
import { formatImage } from "@/utils/imageHelpers";
import Image from "next/image";
import Link from "next/link";

export default function UserCard({ full_name, username, img }: PostAuthor) {
  return (
    <Link
      href={`/users/${username}`}
      className="flex items-center gap-3 py-1 border-b app-borders"
    >
      <Image
        src={formatImage(img)}
        alt={full_name}
        height={40}
        width={40}
        className="aspect-square rounded-full"
      />
      <div>
        <h4 className="text-base font-[600]">
          {full_name}
        </h4>
        <p className="text-sm opacity-80 ">
          {username}
        </p>
      </div>
    </Link>
  );
}
