'use client'
import { Button, DropdownMenu } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export type AppDropdownProps = {
  items: {
    title: string;
    value: string;
  }[];
  title: string | React.ReactNode;
  onUpdate: (value: string) => void;
};

const AppDropdown = ({ items, title, onUpdate }: AppDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <DropdownMenu.Root  open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger>
        {title}
      </DropdownMenu.Trigger>
      <AnimatePresence>
        {
          isOpen && 
                <DropdownMenu.Content  className="app-theme overflow-hidden app-borders border shadow-md z-40 app-shadows rounded-md app-bg-opacity backdrop-blur-sm">
      <motion.div
      className="relative"
        initial={{ top: -50, opacity: 0 }}
        animate={{ top: 0, opacity: 1 }}
      >
          
          {items.map((item, i) =>
            <DropdownMenu.Item
              onClick={() => onUpdate(item.value)}
              key={i}
              className="py-1 px-3 border-b app-borders  cursor-pointer outline-none
                hover:app-theme
              "
            >
              {item.title}
            </DropdownMenu.Item>
          )}
      </motion.div>
        </DropdownMenu.Content>
}
        </AnimatePresence>
    </DropdownMenu.Root>
  );
};

export default AppDropdown;
