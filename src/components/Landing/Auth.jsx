import { Login } from "./Login";
import { Signup } from "./Signup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const Auth = ({ authMode = "" }) => {
  const history = useHistory();

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

  return (
    <div
      className="fixed top-0 left-0 h-full w-full"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        className="fixed top-0 left-0 w-full h-full z-10"
        onClick={() =>
          history.push({
            search: "",
          })
        }
      />
      <div className="absolute right-0 w-3/4 lg:w-1/2 xl:w-1/3 h-full bg-white z-50">
        <div className="h-full">
          {authMode === "login" ? (
            <Login switchMode={changeAuthMode} />
          ) : (
            <Signup switchMode={changeAuthMode} />
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-1/6 bg-white z-50">
        <div className="flex justify-between">
          <h1>Footer 1</h1>
          <h1>Footer 2</h1>
        </div>
      </div>
    </div>
  );
};
