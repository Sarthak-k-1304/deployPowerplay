import { createContext, useContext, useState, useEffect } from "react";

import ProfileImage from "../../public/10946073.jpg";
import { FaCircleUser } from "react-icons/fa6";
import { useLocalStorage } from "./Customhooks";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [userName, setUsername] = useLocalStorage("", "userName");
  const [theme, setTheme] = useLocalStorage("", "userName");
  const [image, setImage] = useLocalStorage(ProfileImage);
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const updateUsername = (name) => {
    setUsername(name);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        userName,
        updateUsername,
        image,
        setImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
