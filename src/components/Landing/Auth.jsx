import { useEffect } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { ForgetPass } from "./ForgetPass";

export const Auth = ({ authMode = "" }) => {
  const history = useHistory();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);

  const changeAuthMode = (changeTo = "") => {
    history.push({
      search: `?auth=${changeTo}`,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (location.pathname && location.pathname === "/") {
        history.push(
          `/people/${authMode === "signup" ? "?intro=" + authMode : ""}`
        );
      } else {
        history.push({
          search: "",
        });
      }
    }
  }, [isAuthenticated]);

  return (
    <div
      className="fixed top-0 left-0 h-full w-full z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="fixed top-0 left-0 w-full h-full"
        onClick={() =>
          history.push({
            search: "",
          })
        }
      />
      <div className="absolute right-0 w-3/4 lg:w-1/2 xl:w-1/3 h-full bg-white z-50 shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out">
        <div className="h-full">
          {authMode === "login" ? (
            <Login switchMode={changeAuthMode} />
          ) : authMode === "forget_password" ? (
            <ForgetPass switchMode={changeAuthMode} />
          ) : (
            <Signup switchMode={changeAuthMode} />
          )}
        </div>
      </div>
    </div>
  );
};
