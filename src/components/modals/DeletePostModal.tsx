import { PostDocument } from "@/server/mongoose/schemas/postSchema";
import AppModal from "../AppModal";
import PostCard from "../PostCard";

const DeletePostModal = ({ postProps }: { postProps: PostDocument }) => {
  return (
    <AppModal title="Confirm Delete Post">
      <div className="p-2">
        <div className="my-3 rounded-md bg-[#ff000022] ">
          <PostCard {...postProps} />
        </div>
        <h2 className="text-lg opacity-80">
          Are you sure you want to delete this post?
        </h2>
      </div>
    </AppModal>
  );
};

export default DeletePostModal;
