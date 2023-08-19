import { motion } from "framer-motion";
import React from "react";

const AnimatedPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.main
      initial={{ scale: 1.05, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      {children}
    </motion.main>
  );
};

export default AnimatedPage;
