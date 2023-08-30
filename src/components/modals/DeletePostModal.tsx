import { PostDocument } from "@/server/mongoose/schemas/postSchema";
import AppModal from "../AppModal";
import PostCard from "../PostCard";
import AppLoader from "../AppLoader";
import _deletePost from "@/server/postActions/deletePost";
import { useContext, useState } from "react";
import { ModalContext } from "@/context/ModalContext";

const DeletePostModal = ({
  postProps,
  onDelete
}: {
  postProps: PostDocument;
  onDelete: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const modalContext = useContext(ModalContext);

  async function deletePost() {
    setLoading(true);
    try {
      if (postProps.img) {
        const res = await _deletePost(postProps.img);
        if (res) {
          modalContext.setModal(null);
          onDelete();
        }
      }
    } catch (e) {}
    setLoading(false);
  }

  return (
    <AppModal title="Confirm Delete Post">
      <div className="p-2">
        <div className="my-3 rounded-md bg-[#ff000022] pointer-events-none">
          <PostCard {...postProps} />
        </div>
        <h2 className="text-lg opacity-80 my-2">
          Are you sure you want to delete this post?
        </h2>
        <div className="flex justify-end">
          <button
            onClick={deletePost}
            disabled={loading}
            className="app-btn rounded-3xl app-bg-error disabled:opacity-60 disabled:pointer-events-none"
          >
            {loading ? <AppLoader /> : <span>Yes, Delete</span>}
          </button>
        </div>
      </div>
    </AppModal>
  );
};

export default DeletePostModal;
