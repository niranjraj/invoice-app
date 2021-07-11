import { useState } from "react";

export const useTheme = (value) => {
  const [theme, setTheme] = useState(() => {
    const localTheme = localStorage.getItem("theme");
    return localTheme ? JSON.parse(localTheme) : value;
  });

  const setLocalTheme = (newTheme) => {
    setTheme((prev) => {
      const checkValue =
        typeof newTheme === "function" ? newTheme(prev) : newTheme;
      localStorage.setItem("theme", JSON.stringify(checkValue));
      return checkValue;
    });
  };

  return [theme, setLocalTheme];
};
