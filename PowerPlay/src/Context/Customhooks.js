import { useEffect, useState } from "react";

export const useLocalStorage = (initialState, key) => {
  const [value, setValue] = useState(() => {
    const storedvalue = localStorage.getItem(key);
    if (storedvalue) return storedvalue;
    else return initialState;
  });
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

// read about ref concept here as when the value changing in useEffect is not primitive but objects
