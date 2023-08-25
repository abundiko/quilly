"use client";
import useLocalStorage from "@/hooks/use-locatStorage";
import React, { useContext, useEffect, useState } from "react";
export const themes = [
  { title: "system Default", value: "system" },
  { title: "Dark Theme", value: "dark" },
  { title: "Dim Theme", value: "dim" },
  { title: "Light Theme", value: "" }
];

export type ThemeType = "" | "dark" | "dim" | "system";
export type ThemeContextProps = {
  themeMode: ThemeType;
  setTheme: any;
};

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeMode: "dark",
  setTheme: () => null
});

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  "use client";
  const [themeMode, setTheme] = useState<ThemeType>("system");
  const [realTheme, setRealTheme] = useState("");
  const [savedTheme, setSavedTheme] = useLocalStorage<ThemeType>("THEME", "");
  useEffect(() => {
    setTheme(savedTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(
    () => {
      setSavedTheme(themeMode);
      if (themeMode == "dim" || themeMode == "dark") {
        setRealTheme(themeMode);
      } else if (themeMode == "") {
        setRealTheme("");
      } else {
        const isDarkMode =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        setRealTheme(isDarkMode ? "dark" : "");
      }
    },
    [setSavedTheme, themeMode]
  );

  const preferredStyle =
    realTheme == "dark"
      ? `
        
::-webkit-scrollbar {
  width: 8px;
  background-color: var(--dark);
}
::-webkit-scrollbar-thumb {
  opacity: 0.6;
  background-color: var(--light);
  border-radius: 20px;
}
        `
      : realTheme == "dim"
        ? `
        
::-webkit-scrollbar {
  width: 8px;
  background-color: var(--dim);
}
::-webkit-scrollbar-thumb {
  opacity: 0.6;
  background-color: var(--light);
  border-radius: 20px;
}
        `
        : `
        
::-webkit-scrollbar {
  width: 8px;
  background-color: var(--light);
}
::-webkit-scrollbar-thumb {
  opacity: 0.6;
  background-color: var(--dark);
  border-radius: 20px;
}
        `;

  return (
    <ThemeContext.Provider value={{ themeMode, setTheme }}>
      <body className={`${realTheme} overflow-x-hidden`}>
        {children}
      </body>
      <style jsx global>
        {preferredStyle}
      </style>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
