import UserContext from "@/context/UserContext";
import { SingleCommentProps } from "@/server/mongoose/schemas/postSchema";
import getPostAuthor, { PostAuthor } from "@/server/postActions/getPostAuthor";
import formatDate from "@/utils/formateDate";
import { formatImage } from "@/utils/imageHelpers";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { BiRadioCircle } from "react-icons/bi";
import AppDropdown from "../AppDropdown";
import { FaEllipsisV } from "react-icons/fa";
import { deleteComment } from "@/server/postActions/newComment";


const CommentCard = ({
  author,body, createdAt,postId
}:SingleCommentProps&{
  postId:string;
}) => {
  const [user, setUser] = useState<PostAuthor|null>(null);
  const [deleted, setDeleted] = useState(false);
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

  async function delComment() {
    try{
      const res = await deleteComment(postId, {author,body,createdAt})
      if(res){
        setDeleted(true)
      }
    }catch(e){}
  }
  
  const profileLink = userContext.data?.username == user?.username ? "/user" : `/users/${user?.username}`;
  if(!deleted)
  return <div className="py-2 flex gap-1">
      <Link href={profileLink}>
        <div className={`h-7 w-7 relative overflow-hidden light-bg rounded-full flex-shrink-0`} >
          {
            user && <Image
          src={formatImage(user.img)}
          alt={user.username ?? ""}
          layout="fill"
           />
          }
        </div>
      </Link>
      <div className="w-full flex-shrink">
        {
          user ?
          <div className="flex justify-between mb-2 w-full">
            <div className="flex text-sm gap-2 items-center">
      <Link href={profileLink}>
          <span className="font-[600]">{user.username}</span>
      </Link>
          <BiRadioCircle className="scale-50" />
          <span className="opacity-60 text-xs">
            {formatDate(createdAt??"")}
          </span>
        </div>
        {(userContext.data?.username == user?.username) && 
        <AppDropdown
        title={<button className="app-icon-button small text-sm">
          <FaEllipsisV />
        </button>
        }
        items={[{title:"Delete",value:"delete"}]}
        onUpdate={(value)=>{
          if(value === 'delete') delComment();
        }}
         />
        }
          </div>
         : 
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
