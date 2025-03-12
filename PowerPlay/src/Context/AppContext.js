import { createContext, useContext, useState, useEffect } from "react";

import ProfileImage from "../../public/10946073.jpg";
import { FaCircleUser } from "react-icons/fa6";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [userName, setUsername] = useState(() => {
    return localStorage.getItem("userName") || "";
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [image, setImage] = useState(() => {
    const storedUserName = localStorage.getItem("userName");
    return storedUserName
      ? localStorage.getItem(`image_${storedUserName}`) || ProfileImage
      : ProfileImage;
  });

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
