import { useEffect } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

export const Auth = ({ authMode = "" }) => {
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);

  const changeAuthMode = () => {
    if (authMode && authMode === "login") {
      history.push({
        search: "?auth=signup",
      });
    } else {
      history.push({
        search: "?auth=login",
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push(
        `/people/${authMode === "signup" ? "?intro=" + authMode : ""}`
      );
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
        <div className="h-full" style={{ paddingTop: "20%" }}>
          {authMode === "login" ? (
            <Login switchMode={changeAuthMode} />
          ) : (
            <Signup switchMode={changeAuthMode} />
          )}
        </div>
      </div>
    </div>
  );
};
