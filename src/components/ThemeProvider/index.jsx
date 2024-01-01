import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ThemeSwitch } from "../Switch/ThemeSwitch";

export const ThemeProvider = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="py-2 border-t">
      <ThemeSwitch
        leftText={
          <FontAwesomeIcon icon={faSun} className="text-sky-400 h-4 w-4" />
        }
        rightText={
          <FontAwesomeIcon icon={faMoon} className="text-sky-400 h-4 w-4" />
        }
        handleAction={toggleTheme}
      />
    </div>
  );
};
