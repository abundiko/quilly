import UserContext from "@/context/UserContext";
import { SingleCommentProps } from "@/server/mongoose/schemas/postSchema";
import getPostAuthor, { PostAuthor } from "@/server/postActions/getPostAuthor";
import formatDate from "@/utils/formateDate";
import { formatImage } from "@/utils/imageHelpers";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { BiRadioCircle } from "react-icons/bi";


const CommentCard = ({
  author,body, createdAt
}:SingleCommentProps) => {
  const [user, setUser] = useState<PostAuthor|null>(null);
  const userContext = useContext(UserContext);

  useEffect(()=>{
    (async()=>{
      let fetched = false;
      while(!fetched){
        try {
          const userDoc = await getPostAuthor(author);
          if(userDoc){
            fetched = true;
            setUser(userDoc);
          } 
        } catch (e) {
          continue;
        }
      }
    })();
  },[author])
  
  const profileLink = userContext.data?.username == user?.username ? "/user" : `/users/${user?.username}`;
  return <div className="pb-1 flex gap-1">
      <Link href={profileLink}>
        <div style={{ backgroundImage: user?.img ? formatImage(user.img) : "url(/img/user.png)" }} className={`h-7 w-7 relative overflow-hidden light-bg rounded-full flex-shrink-0`} />
      </Link>
      <div>
        {
          user ?
          <div className="flex mb-1 text-sm gap-2">
      <Link href={profileLink}>
          <span className="font-[600]">{user.username}</span>
      </Link>
          <BiRadioCircle className="scale-50" />
          <span className="opacity-60 text-xs">
            {formatDate(createdAt??"")}
          </span>
        </div> : 
            <span className="light-bg block w-20 h-3 rounded-md" />
        }
        <div className="light-bg block w-fit rounded-md px-2 py-1 opacity-80">
          <span>
            {body}
          </span>
        </div>
      </div>
    </div>;
};

export default CommentCard;
