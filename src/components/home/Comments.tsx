import { motion } from "framer-motion";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import CommentCard from "./CommentCard";
import { SingleCommentProps } from "@/server/mongoose/schemas/postSchema";
import { useRef, useState } from "react";
import newComment from "@/server/postActions/newComment";

export type CommentsProps = {
  close: () => void;
  onUpdate: (newComments:SingleCommentProps[]) => void;
  comments: SingleCommentProps[];
  postId:string;
};
const Comments = ({ close, comments,postId,onUpdate }: CommentsProps) => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(formData: FormData) {
    if(disabled) return;
    setLoading(true);
    try {
      if (formData.get("comment")) {
        const commentData = formData.get("comment")?.toString()??"";
        const res = await newComment(postId,commentData);
        if(res){
          if(res === "duplicate") {
            if(inputRef && inputRef.current) inputRef.current.value = "";
            setDisabled(true);
            setLoading(false);
            return;
          }
          onUpdate(res);
          if(inputRef && inputRef.current) inputRef.current.value = "";
            setDisabled(true);
        }
      }
    } catch (e) {}
    setLoading(false);
  }
  return (
    <motion.section
      {...animations}
      className="h-[80vh] md:h-[60vh] w-full md:w-[8/12] right-0 md:max-w-[320px] flex flex-col fixed bottom-0 md:right-[5vw] app-theme overflow-hidden rounded-t-lg border app-borders app-shadows shadow-lg"
    >
      <h2 className="page-title text-base flex-shrink-0 font-[500]  ps-3 pe-3 flex items-center justify-between">
        <span>Comments</span>
        <button onClick={close} className="app-icon-button">
          <FaTimes className="scale-75" />
        </button>
      </h2>
      <div className="p-2 overflow-y-auto h-full flex-shrink">
        {comments.map((item, i) => <CommentCard key={i} {...item} postId={postId} onDelete={onUpdate} />)}
      </div>
      <form
      onSubmit={()=>setLoading(true)}
        action={handleSubmit}
        className="border-t app-borders text-base flex-shrink-0 font-[500] gap-1 py-1 ps-3 pe-3 flex items-center justify-between"
      >
        <textarea
        ref={inputRef}
          name="comment"
          id="comment"
          className="w-full light-bg rounded-md p-1 outline-primary-light"
          placeholder="enter comment here..."
          onChange={(e)=>{
            setDisabled(e.target.value.trim().length < 1);
          }}
        />
        <button
          disabled={loading||disabled}
          className="app-icon-button app-btn text-lg disabled:opacity-50 disabled:pointer-events-none"
        >
          <FaPaperPlane className="scale-[3.5]" />
        </button>
      </form>
    </motion.section>
  );
};

export default Comments;

const animations = {
  initial: {
    bottom: "-100%"
  },
  animate: {
    bottom: "0%"
  },
  exit: {
    bottom: "-100%"
  }
};
