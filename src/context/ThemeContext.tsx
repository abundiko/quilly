"use client";
import React, { useContext, useState } from "react";

export type ThemeContextProps = {
  themeMode: "" | "dark" | "dim";
  setTheme: any;
};

export const themeData = ["", "dark", "dim"];

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeMode: "dark",
  setTheme: () => null
});

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeMode, setTheme] = useState<"" | "dark" | "dim">("dim");

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setTheme
      }}
    >
      <body className={`${themeMode} overflow-x-hidden`}>
        {children}
      </body>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
