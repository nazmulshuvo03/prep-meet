import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, setTheme } from "../../redux/theme";
import { Button } from "../Button";

const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const darkTheme = useSelector(selectTheme);

  const toggleTheme = () => {
    dispatch(setTheme());
  };

  return (
    <div className={`theme-${darkTheme}`}>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
      {children}
    </div>
  );
};

export default ThemeProvider;
