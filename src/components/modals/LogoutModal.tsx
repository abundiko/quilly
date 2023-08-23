"use client";

import { useContext, useState } from "react";
import AppModal from "../AppModal";
import { ModalContext } from "@/context/ModalContext";
import logout from "@/server/auth/logout";
import { useRouter } from "next/navigation";
import AppLoader from "../AppLoader";

const LogoutModal = () => {
  const modalContext = useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signout() {
    setLoading(true);
    if (await logout()) {
      router.replace("/");
      modalContext.setModal(null);
    }
    setLoading(false);
  }

  return (
    <AppModal title="Confirm Logout">
      <p className="font-[600] my-4">Are you sure you want to logout?</p>
      <div className="flex gap-2">
        <button
          className="app-btn-bordered block w-full rounded-3xl"
          onClick={() => modalContext.setModal(null)}
        >
          Cancel
        </button>
        <button
          disabled={loading}
          className="app-btn block w-full rounded-3xl"
          onClick={signout}
        >
          {loading ? <AppLoader /> : "Logout"}
        </button>
      </div>
    </AppModal>
  );
};

export default LogoutModal;
