import { useState, ReactNode } from "react";
import { motion } from "framer-motion";

type OnboardingSectionCardProps = {
  id: number;
  body: string | ReactNode;
};

const OnboardingSectionCard = ({ id, body }: OnboardingSectionCardProps) => {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  return (
    <motion.div
      onViewportEnter={() => !hasEntered && setHasEntered(true)}
      className="w-full "
    >
      <div className="flex h-fit items-center relative">
        <div className="w-12 flex-shrink-0 flex relative items-center h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={hasEntered && { opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-12 text-lg font-bold rounded-full relative app-theme aspect-square shadow app-shadows app-borders border flex justify-center items-center"
          >
            {id}
          </motion.div>
        </div>
        <div className="w-full flex-shrink flex items-center py-3">
          <motion.div
            initial={{ gridTemplateColumns: "repeat(1, minmax(0, 0fr)" }}
            animate={
              hasEntered && { gridTemplateColumns: "repeat(1, minmax(0, 1fr)" }
            }
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid overflow-hidden flex-shrink-0"
          >
            <div className="w-6 sm:w-12 md:w-20 h-[2px] app-theme-opposite app-bg-opacity grid-cols-1" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateX: -20 }}
            animate={hasEntered && { opacity: 1, translateX: 0 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            className="app-theme-opposite p-3 rounded-md app-bg-opacity text-md xd:text-lg lg:text-xl"
          >
            {body}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingSectionCard;
