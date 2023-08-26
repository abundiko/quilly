"use client";

import { useContext } from "react";
import AppModal from "../AppModal";
import { ModalContext } from "@/context/ModalContext";
import { formatImage } from "@/utils/imageHelpers";
import Image from "next/image";

const ProfilePhotoModal = ({
  full_name,
  img
}: {
  full_name: string;
  img: string | null | undefined;
}) => {
  const modalContext = useContext(ModalContext);

  return (
    <AppModal title={full_name}>
      <div className="overflow-hidden gap-2 max-w-[400px] min-w-[300px] w-[70vw] relative aspect-square rounded-lg">
        <Image src={formatImage(img)} alt={full_name} layout="fill" />
      </div>
    </AppModal>
  );
};

export default ProfilePhotoModal;
