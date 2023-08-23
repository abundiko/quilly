import { ModalContext } from "@/context/ModalContext";
import { motion } from "framer-motion";
import { useContext } from "react";

export type AppModalProps = {
  children: React.ReactNode;
  title: string;
};

const AppModal = ({ title, children }: AppModalProps) => {
  const modalContext = useContext(ModalContext);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="h-screen w-full z-50 fixed top-0 left-0"
    >
      <div
        className="backdrop w-full h-full backdrop-blur-md app-bg-opacity app-theme"
        onClick={() => modalContext.setModal(null)}
      />
      <div className="absolute rounded-lg border app-borders shadow-lg app-shadows py-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-xl app-borders border-b mb-2 pb-2 font-bold opacity-80 px-4  md:px-6 lg:px-8">
          {title}
        </h2>
        <div className="px-4  md:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </motion.section>
  );
};

export default AppModal;
