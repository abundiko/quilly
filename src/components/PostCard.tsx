import Image from "next/image";
import { FaEllipsisV, FaEye, FaThumbsUp } from "react-icons/fa";
import {  BiComment, BiRadioCircle } from "react-icons/bi";
import Link from "next/link";
import { PostDocument } from "@/server/mongoose/schemas/postSchema";
import formatDate from "@/utils/formateDate";
import { useContext, useEffect, useRef, useState } from "react";
import getPostAuthor, { PostAuthor } from "@/server/postActions/getPostAuthor";
import { formatImage } from "@/utils/imageHelpers";
import { formatPostTitleAsUrl } from "@/utils/formatUrl";
import UserContext from "@/context/UserContext";
import AppDropdown from "./AppDropdown";
import { motion } from "framer-motion";
import { ModalContext } from "@/context/ModalContext";
import DeletePostModal from "./modals/DeletePostModal";

const PostCard = ({
  title,
  subtitle,
  createdAt,
  author,
  img,
  impressions,
  onViewportEnter
}: PostDocument&{
  onViewportEnter?:()=>void
}) => {
  const userContext = useContext(UserContext);
  const modalContext = useContext(ModalContext);
  const [user, setUser] = useState<PostAuthor|null>(null);
  const [deleted, setDeleted] = useState(false);
  const hasEntered = useRef(false);

  useEffect(()=>{
    (async()=>{
      
      for(let i = 0; i < 3; i++){
        try {
          const userDoc = await getPostAuthor(author);
          if(userDoc){
            setUser(userDoc);
            break;
          } 
        } catch (e) {
          continue;
        }
      }
    })();
  },[author]);

  const isMyPost = userContext.data?.username == user?.username;
  function getDropDownItems() {
    const items = [
          {title:"Report",
          value:"report"},
        ]
        if(isMyPost) items.push({title:"Delete",
          value:"delete"})
        return items;
  }

  if(!deleted)
  return (
    <motion.div
    onViewportEnter={()=>{
      if(!hasEntered.current && onViewportEnter) {
        onViewportEnter();
      hasEntered.current = true;
      }
    }}
     className="my-1  py-2 px-3 group cursor-pointer app-borders border-b">
      <div className="flex justify-between mb-1">
        <div className="w-fit flex items-center gap-1">
          {
          user ?
          <Link href={isMyPost ? "/user" : `/users/${user.username}`} className="flex gap-2 items-center">
            <Image
              src={formatImage(user.img)}
              width={30}
              height={30}
              alt="user name"
              className="rounded-full aspect-square object-cover"
            />
            <h6 className="opacity-90 text-sm font-[600]">
              {user.username}
            </h6>
          </Link> : 
          <div className="flex gap-2 items-center">
            <div className="h-6 w-6 light-bg rounded-full"></div>
            <span className="light-bg block w-20 h-3 rounded-md" />
          </div>
          }
          <BiRadioCircle className="scale-50" />
          <span className="opacity-60 text-xs">
            {formatDate(createdAt??"")}
          </span>
        </div>
        <AppDropdown
        title={<button className="app-icon-button text-sm">
          <FaEllipsisV />
        </button>
        }
        items={getDropDownItems()}
        onUpdate={(e)=>{
          if(e==="delete"){
            modalContext.setModal(
              <DeletePostModal 
              onDelete={()=>setDeleted(true)}
               postProps={{
                 title,
                 subtitle,
                 createdAt,
                 author,
                 img,
                 impressions,
                 body:"",
                 tags:[]
               }}
               />
            )
          }
        }}
        />
      </div>
      <Link
        href={`/users/${user?.username}/${formatPostTitleAsUrl(title)}`}
        className="flex gap-2 items-center"
      >
        <div className="relative min-w-[30%] w-[30%] rounded-md overflow-hidden aspect-square light-bg">
          <Image
            src={formatImage(img)}
            layout="fill"
            alt={title}
            className="rounded aspect-square group-hover:scale-110  object-cover"
          />
        </div>
        <div className="w-[68%] max-w-[68%]">
          <h3 className="text-lg font-bold">
            {title}
          </h3>
          <p className="opacity-70 text-sm  ">
            {subtitle}
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
    </motion.div>
  );
};

export default PostCard;
