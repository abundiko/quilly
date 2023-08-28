import { motion } from "framer-motion";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

export type CommentsProps = {
  close: () => void;
};
const Comments = ({ close }: CommentsProps) => {
  return (
    <motion.section
      initial={{
        bottom: "-100%"
      }}
      animate={{
        bottom: "0%"
      }}
      exit={{
        bottom: "-100%"
      }}
      className="h-[80vh] md:h-[60vh] w-full md:w-[8/12] right-0 md:max-w-[320px] flex flex-col fixed bottom-0 md:right-[5vw] app-theme overflow-hidden rounded-t-lg border app-borders app-shadows shadow-lg"
    >
      <h2 className="page-title text-base flex-shrink-0 font-[500]  ps-3 pe-3 flex items-center justify-between">
        <span>Comments</span>
        <button onClick={close} className="app-icon-button">
          <FaTimes className="scale-75" />
        </button>
      </h2>
      <div className="p-2 overflow-y-auto h-full flex-shrink">
        1 comment
        <div className="h-screen" />
      </div>
      <div className="border-t app-borders text-base flex-shrink-0 font-[500] gap-1 py-1 ps-3 pe-3 flex items-center justify-between">
        <textarea
          name=""
          id=""
          className="w-full light-bg rounded-md p-1"
          placeholder="enter comment here..."
        />
        <button className="app-icon-button app-btn text-lg">
          <FaPaperPlane className="scale-[3.5]" />
        </button>
      </div>
    </motion.section>
  );
};

export default Comments;
